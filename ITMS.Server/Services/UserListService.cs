using ITMS.Server.DTO;
using ITMS.Server.Models;
using ITMS.Server.ViewModel;
using Microsoft.EntityFrameworkCore;

namespace ITMS.Server.Services;

public interface IUserListService
{
    Task<IEnumerable<UserListDTO>> GetUserDevicesAsync(Guid locationId);

    Task<UserListDTO> GetFirstUserAsync();
    Task<IEnumerable<AdminListDTO>> GetAdminList(Guid locationId);
    Task ChangeUserRoleAsync(Guid userId, string newRole);
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
                                Email=e.Email,
                                ExitProcessInitiated = e.ExitProcessInitiated,
                                isArchived = e.IsArchived,
                                UpdatedAtUtc = e.UpdatedAtUtc,
                                isOnHold = (e.ExitProcessInitiated == true  && _context.Devices.Where(e => e.LocationId == locationId).Any(d => d.StatusNavigation.Type== "Assigned" ))?true:false,
                            }).ToListAsync();
/* if(total devices assigned to user === total devices with 'not submitted' status)*/
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

    public async Task<IEnumerable<AdminListDTO>> GetAdminList(Guid locationId)
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
        .Where(dto => (dto.Role == "Admin" || dto.Role == "Superadmin") && dto.LocationId == locationId)
        .ToListAsync();

        return adminList;
    }

    public async Task ChangeUserRoleAsync(Guid userId, string newRoleName)
    {
        try
        {
           
            var user = await _context.Employees.FindAsync(userId);

            //if (user == null)
            //{
            //    // Handle the case where the user with the specified userId is not found
            //    throw new NotFoundException($"User with ID {userId} not found.");
            //}

            var newRole = await _context.Roles.FirstOrDefaultAsync(r => r.Name == newRoleName);

            //if (newRole == null)
            //{
            //    // Handle the case where the role with the specified newRoleName is not found
            //    throw new NotFoundException($"Role with Name {newRoleName} not found.");
            //}

            user.Role = newRole;

            await _context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            throw new ApplicationException($"Error changing user role: {ex.Message}", ex);
        }
    }

}