using ITMS.Server.DTO;
using ITMS.Server.Models;
using Microsoft.EntityFrameworkCore;
using MiNET.Blocks;
using System.Runtime.InteropServices;

namespace ITMS.Server.Services
{
        public interface IGetSoftwareService
        {

            Task<IEnumerable<GetSoftwareDTO>> listSoftware();
            Task<IEnumerable<GetSoftwareDTO>> getSoftwareId(string softwareName, string softwareVersion);
            Task<IEnumerable<CheckSoftwareAllocationDTO>>getSoftwareAllocationId(string softwareID);
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
                                    ExpiryDate = sa.ExpiryDate,
                                    Version = s.Version,
                                    LocationId = sa.LocationId,
                                    AssignedTo = sa.AssignedTo,
                                }
                             ).ToListAsync();
            return result;
        }
        public async Task<IEnumerable<GetSoftwareDTO>> getSoftwareId(string softwareName, string softwareVersion)
        {
            var result = await (from s in _context.Software
                                where s.SoftwareName == softwareName && s.Version == softwareVersion

                                select new GetSoftwareDTO
                                {
                                    Id = s.Id
                                }
                             ).ToListAsync();
            return result;

        }
        public async Task<IEnumerable<CheckSoftwareAllocationDTO>>getSoftwareAllocationId(string softwareID)
        {
            var result = await (from sa in _context.SoftwareAllocations
                                where sa.SoftwareId.ToString() == softwareID
                                select new CheckSoftwareAllocationDTO
                                {
                                    Id = sa.Id
                                }
                             ).ToListAsync();
            return result;
        }
    }

    }
