﻿using ITMS.Server.DTO;
using ITMS.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace ITMS.Server.Services
{
    public interface IGetSoftwareVersionService
    {

        Task<IEnumerable<GetSoftwareVersionDTO>> listSoftwareVersions(String SoftwareName);

    }
    public class GetSoftwareVersionService : IGetSoftwareVersionService
    {
        private readonly ItinventorySystemContext _context;

        public GetSoftwareVersionService(ItinventorySystemContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<GetSoftwareVersionDTO>> listSoftwareVersions(String SoftwareName)
        {
            var result = await (from sa in _context.SoftwareAllocations
                                    join s in _context.Software on sa.SoftwareId equals s.Id
                                    where s.SoftwareName == SoftwareName
                                    select new GetSoftwareVersionDTO
                                    {
                                        Id = sa.Id,
                                        SoftwareName = s.SoftwareName,
                                        SoftwareVersion = sa.SoftwareVersion
                                    }
                                 ).ToListAsync();

                return result;
        }
    }
}
