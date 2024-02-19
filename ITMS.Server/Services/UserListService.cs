using ITMS.Server.DTO;
using ITMS.Server.Models;
using ITMS.Server.ViewModel;
using Microsoft.EntityFrameworkCore;

namespace ITMS.Server.Services;

public interface IUserListService
{
    Task<IEnumerable<UserListDTO>> GetUserDevicesAsync(Guid locationId);

    Task<UserListDTO> GetFirstUserAsync();
    Task<IEnumerable<AdminListDTO>> GetAdminList();
}
public class UserListService : IUserListService
{


    private readonly ItinventorySystemContext _context;

    public UserListService(ItinventorySystemContext context)
    {
        _context = context;
    }
    public async Task<IEnumerable<UserListDTO>> GetUserDevicesAsync(Guid locationId)
    {
        var result = await (from e in _context.Employees
                            .Include(e => e.Location)
                            .Where(e => e.Location.Id == locationId) 
                            select new UserListDTO
                            {
                                Id = e.Id,
                                Cgiid = e.Cgiid,
                                FirstName = e.FirstName,
                                LastName = e.LastName,
                                LocationId = e.LocationId,
                            }).ToListAsync();
        
        return result;
    }

    public async Task<UserListDTO> GetFirstUserAsync()
    {
        var roleName = "Superadmin";

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
                LastName = u.LastName,
                LocationId = u.LocationId
            })
            .FirstOrDefaultAsync();

        return user;
    }

    public async Task<IEnumerable<AdminListDTO>> GetAdminList()
    {
        var adminList = await _context.Employees
            .Join(_context.Roles, e => e.RoleId, r => r.Id, (e, r) => new AdminListDTO
            {
                Id = e.Id,
                Cgiid = e.Cgiid,
                FirstName = e.FirstName,
                LastName = e.LastName,
                Role = r.Name,
                LocationId = e.LocationId
            })
            .Where(dto => dto.Role == "Admin" || dto.Role == "Superadmin")
            .ToListAsync();

        return adminList;
    }

}