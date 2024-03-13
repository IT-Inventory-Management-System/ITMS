using ITMS.Server.DTO;
using ITMS.Server.Models;
using LibNoise.Modifier;
using Microsoft.EntityFrameworkCore;
using MiNET.Utils;

namespace ITMS.Server.Services
{
        public interface IAddAssetService
        {
        Task<IEnumerable<GetEmployeeDTO>> getAllEmployeeBasicDetails();
        Task<IEnumerable<GetAccessories>> getAccessories();
        Task<IEnumerable<GetBrandDTO>> getMouseBrand();
        Task<IEnumerable<getCGIDTO>> getCGIID();
        Task<IEnumerable<getLaptopIds>> getlaptopIds();
        Task<IEnumerable<categoryInputDTO>> getBrandDetails(String CategoryName);
        Task<IEnumerable<monitorInputDTO>> getMonitorBrands();
        Task<IEnumerable<getCGIDTO>> getCGIIDKeyboard();
        Task<IEnumerable<getCGIDTO>> getCGIIDCommon(string categoryName);
        Task<IEnumerable<getBrand>> getBrandFromName(string categoryName);
        Task postMonitorDetails(MonitorDTO monitorDTO);
        Task AddCommonModel(CommonDTO commonDTO);

    }
    public class AddAssetService : IAddAssetService
    {
        private readonly ItinventorySystemContext _context;

        public AddAssetService(ItinventorySystemContext context)
        {
            _context = context;
        }

     public async Task<IEnumerable<GetEmployeeDTO>> getAllEmployeeBasicDetails()
        {
            var result = await (from e in _context.Employees
                                select new GetEmployeeDTO
                                {
                                    Id = e.Id,
                                    Cgiid = e.Cgiid,
                                    Name = e.FirstName + " " + e.LastName,
                                    Email=e.Email
                                }).ToListAsync();
            return result;
        }
        public async Task<IEnumerable<GetAccessories>> getAccessories()
        {
            var result = await (from c in _context.Categories
                                select new GetAccessories
                                { 
                                Id= c.Id,
                                Name = c.Name
                                }).ToListAsync();
            return result;
        }
        public async Task<IEnumerable<GetBrandDTO>> getMouseBrand()
        {
            var result=await (from c in _context.DeviceModel
                              join cat in _context.Categories
                              on c.CategoryId equals cat.Id
                              where cat.Name== "Mouse"
                              select new GetBrandDTO
                             
                              {
                                  Id= c.Id,
                                  brand= c.Brand,
                                  iswired = c.IsWired
                              }).ToListAsync();
            return result;
        }
        public async Task<IEnumerable<getCGIDTO>> getCGIID()
        {
            //    var result = await (from c in _context.Devices
            //                        where c.Cygid.StartsWith("CGI-MOU")
            //                        select new getCGIDTO
            //                        {
            //                            CGIID = int.Parse(c.Cygid.Substring(8))  // Convert to integer
            //                        })
            //              .OrderByDescending(c => c.CGIID)
            //              .Take(1)
            //              .ToListAsync();


            //    if (result.Count == 0)
            //    {
            //        return new List<getCGIDTO> { new getCGIDTO { CGIID = 0 } };
            //    }
            //    else
            //    return result;

            var result = await (from c in _context.Devices
                                where c.Cygid.StartsWith("CGI-MOU")
                                select new getCGIDTO
                                {
                                    CGIID = c.Cygid.Substring(8) // Leave it as string for now
                                })
                    .ToListAsync();
            if (result.Count == 0)
            {
                return new List<getCGIDTO> { new getCGIDTO { CGIID = "0" } };
            }
            // Convert CGIID to integers and order the result
            else
            {
                result = result.OrderByDescending(c => int.Parse(c.CGIID)).ToList();
                return result.Take(1);
            }

        }

        public async Task <IEnumerable<getLaptopIds>> getlaptopIds()
        {
            var result = await (
        from device in _context.Devices
        join deviceModel in _context.DeviceModel on device.DeviceModelId equals deviceModel.Id
        join category in _context.Categories on deviceModel.CategoryId equals category.Id
        where category.Name == "Laptop" // Replace "Laptop" with the actual category name you're looking for
        select new getLaptopIds
        {
            CYGID = device.Cygid,
            SerialNumber = device.SerialNumber
        }
        ).ToListAsync();
            return result;

        }

        public async Task<IEnumerable<categoryInputDTO>> getBrandDetails(String CategoryName)
        {
            var result = await (from d in _context.DeviceModel
                                join c in _context.Categories
                                on d.CategoryId equals c.Id
                                where c.Name.ToLower() == CategoryName.ToLower()
                                select new categoryInputDTO
                                {   
                                    Id = d.Id,
                                    categoryId = d.CategoryId,
                                    Brand = d.Brand,
                                    IsHDMI = d.IsHDMI,
                                    IsVGA = d.IsVGA,
                                    IsDVI = d.IsDVI

                                }).ToListAsync();
            return result;
        }

        public async Task<IEnumerable<getCGIDTO>> getCGIIDKeyboard()
        {

            var result = await (from c in _context.Devices
                                where c.Cygid.StartsWith("CGI-MON")
                                select new getCGIDTO
                                {
                                    CGIID = c.Cygid.Substring(8) // Leave it as string for now
                                })
                    .ToListAsync();
            if (result.Count == 0)
            {
                return new List<getCGIDTO> { new getCGIDTO { CGIID = "0" } };
            }
            // Convert CGIID to integers and order the result
            else
            {
                result = result.OrderByDescending(c => int.Parse(c.CGIID)).ToList();
                return result.Take(1);
            }

        }
        public async Task<IEnumerable<monitorInputDTO>> getMonitorBrands()
        {
            var result = await (from d in _context.DeviceModel
                                join c in _context.Categories
                                on d.CategoryId equals c.Id
                                where c.Name.ToLower() == "monitor" 
                                select new monitorInputDTO
                                {
                                    Brand = d.Brand


                                }).ToListAsync();
            return result;

        }
        public async Task<IEnumerable<getBrand>> getBrandFromName(string categoryName)
        {
            var result = await (from d in _context.DeviceModel
                                join c in _context.Categories
                                on d.CategoryId equals c.Id
                                where c.Name.ToLower() == categoryName.ToLower()
                                select new getBrand
                                {
                                    Brand = d.Brand


                                }).ToListAsync();
            return result;

        }
        public async Task postMonitorDetails(MonitorDTO monitorDTO)
        {
            DeviceModel deviceModel = new DeviceModel();

            deviceModel.IsHDMI = monitorDTO.IsHDMI;
            deviceModel.IsDVI = monitorDTO.IsDVI;
            deviceModel.IsVGA = monitorDTO.IsVGA;
            deviceModel.CreatedBy = monitorDTO.CreatedBy;
            deviceModel.CreatedAtUtc = DateTime.UtcNow;
            deviceModel.UpdatedBy = monitorDTO.UpdatedBy;
            deviceModel.UpdatedAtUtc = DateTime.UtcNow;
            deviceModel.Brand = monitorDTO.Brand;
            deviceModel.CategoryId = monitorDTO.CategoryId;
            deviceModel.IsArchived = false;

            _context.DeviceModel.Update(deviceModel);
            await _context.SaveChangesAsync();
            
        }
        public async Task AddCommonModel(CommonDTO commonDTO)
        {
            DeviceModel deviceModel = new DeviceModel();

            deviceModel.CreatedBy = commonDTO.CreatedBy;
            deviceModel.CreatedAtUtc = DateTime.UtcNow;
            deviceModel.UpdatedBy = commonDTO.UpdatedBy;
            deviceModel.UpdatedAtUtc = DateTime.UtcNow;
            deviceModel.Brand = commonDTO.Brand;
            deviceModel.CategoryId = commonDTO.CategoryId;
            deviceModel.IsArchived = false;

            _context.DeviceModel.Update(deviceModel);
            await _context.SaveChangesAsync();

        }
        public async Task<IEnumerable<getCGIDTO>> getCGIIDCommon()
        {

            var result = await (from c in _context.Devices
                                where c.Cygid.StartsWith("CGI-MON")
                                select new getCGIDTO
                                {
                                    CGIID = c.Cygid.Substring(8) // Leave it as string for now
                                })
                    .ToListAsync();
            if (result.Count == 0)
            {
                return new List<getCGIDTO> { new getCGIDTO { CGIID = "0" } };
            }
            // Convert CGIID to integers and order the result
            else
            {
                result = result.OrderByDescending(c => int.Parse(c.CGIID)).ToList();
                return result.Take(1);
            }

        }

        public async Task<IEnumerable<getCGIDTO>> getCGIIDCommon(string categoryName)
        {
            Dictionary<string, string> _categoryPrefixMap = new Dictionary<string, string>
        {
            { "Connector(Texas Instruments)", "CGI-MIS" },
            { "Apple Thunderbolt(LAN)", "CGI-CLAN" },
            { "Android Cables", "CGI-AC" },
            { "Apple VGA Connector", "CGI-CVGA" },
            { "External Hard Drive Connectors", "CGI-EHD" },
            { "HDMI Cables", "CGI-HDMI" },
            { "iPhone USB-A to Lightning", "CGI-iPHC" },
            { "Mini-Display HDMI Connector", "CGI-CHD" },
            { "Bag", "CGI-BAG" },
            { "RAM of Different Models(Laptop)", "CGI-RAML" },
            { "Server", "CGI-RAMS" },
            { "Keyboard", "CGI-KO"},
            { "Combo", "CGI-WYC"},
            { "Mouse", "CGI-MOU"},
        };
            //var categoryName = await GetCategoryNameById(categoryId);


            if (categoryName == null || !_categoryPrefixMap.TryGetValue(categoryName, out string prefix))
            {
                return new List<getCGIDTO> { new getCGIDTO { CGIID = "0" } };
            }

            var result = await (from c in _context.Devices
                                where c.Cygid.StartsWith(prefix)
                                select new getCGIDTO
                                {
                                    CGIID = GetNumberAfterLastDash(c.Cygid)
                                })
                    .ToListAsync();

            if (result.Count == 0)
            {
                return new List<getCGIDTO> { new getCGIDTO { CGIID = "0" } };
            }
            else
            {
                result = result.OrderByDescending(c => int.Parse(c.CGIID)).ToList();
                return result.Take(1);
            }
        }

        // Helper method to extract the number after the last dash in the string
        private static string GetNumberAfterLastDash(string input)
        {
            int lastDashIndex = input.LastIndexOf(' ');
            if (lastDashIndex != -1 && lastDashIndex < input.Length - 1)
            {
                return input.Substring(lastDashIndex + 1);
            }
            return "0"; // Default value if no dash is found or it's the last character
        }
        // Example of a method to retrieve category name by ID (replace with your actual implementation)
        private async Task<string> GetCategoryNameById(Guid categoryId)
        {
            
            var result = await (from c in _context.Categories
                                where c.Id == categoryId
                                select c.Name)
                            .FirstOrDefaultAsync();

            return result;
        }


    }
}
