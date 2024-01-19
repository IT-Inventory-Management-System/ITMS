using ITMS.Server.DTO;
using ITMS.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace ITMS.Server.Services
{
        public interface IGetSoftwareService
        {

            Task<IEnumerable<GetSoftwareDTO>> listSoftware();

        }
        public class GetSoftwareService : IGetSoftwareService
        {
            private readonly ItinventorySystemContext _context;

            public GetSoftwareService(ItinventorySystemContext context)
            {
                _context = context;
            }
        public async Task<IEnumerable<GetSoftwareDTO>> listSoftware()
        {
            var result = await (from s in _context.Software
                                join st in _context.SoftwareTypes
                                on s.SoftwareTypeId equals st.Id
                                join sa in _context.SoftwareAllocations
                                on s.Id equals sa.SoftwareId

                                select new GetSoftwareDTO
                                {
                                    Id = s.Id,
                                    SoftwareName = s.SoftwareName,
                                    SoftwareType = st.TypeName,
                                    ExpiryDate = sa.ExpiryDate
                                }
                             ).ToListAsync();
            return result;
        }
    }

    }
