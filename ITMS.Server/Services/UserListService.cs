using ITMS.Server.DTO;
using ITMS.Server.Models;
using ITMS.Server.ViewModel;
using Microsoft.EntityFrameworkCore;

namespace ITMS.Server.Services;

public interface IUserListService
{
    Task<IEnumerable<UserListDTO>> GetUserDevicesAsync();

    Task<UserListDTO> GetFirstUserAsync();
}
public class UserListService : IUserListService
{


    private readonly ItinventorySystemContext _context;

    public UserListService(ItinventorySystemContext context)
    {
        _context = context;
    }
    public async Task<IEnumerable<UserListDTO>> GetUserDevicesAsync()
    {
        var result = await (from e in _context.Employees
                            select new UserListDTO
                            {
                                Id = e.Id,
                                Cgiid = e.Cgiid,
                                FirstName = e.FirstName,
                                LastName = e.LastName
                            }).ToListAsync();
        
        return result;
    }

    public async Task<UserListDTO> GetFirstUserAsync()
    {
        var roleName = "Admin";

        var adminRoleId = await _context.Roles
            .Where(r => r.Name == roleName)
            .Select(r => r.Id)
            .FirstOrDefaultAsync();

        if (adminRoleId == null)
        {
            // Handle the case where the Admin role is not found
            return null;
        }

        var user = await _context.Employees
            .Where(u => u.RoleId == adminRoleId)
            .Select(u => new UserListDTO
            {
                Id = u.Id,
                Cgiid = u.Cgiid,
                FirstName = u.FirstName,
                LastName = u.LastName
            })
            .FirstOrDefaultAsync();

        return user;
    }

}