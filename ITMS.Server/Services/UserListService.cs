using ITMS.Server.DTO;
using ITMS.Server.Models;
using ITMS.Server.ViewModel;
using Microsoft.EntityFrameworkCore;

namespace ITMS.Server.Services;

public interface IUserListService
{
    Task<IEnumerable<UserListDTO>> GetUserDevicesAsync();
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

}