﻿using ITMS.Server.DTO;
using ITMS.Server.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using Xamarin.Forms;


namespace ITMS.Server.Services
{
    public class SoftwarePageService
    {
        private readonly ItinventorySystemContext _context;

        public SoftwarePageService(ItinventorySystemContext context)
        {
            _context = context;
        }


        public List<SoftwarePage> GetSoftware()
        {
            var software = _context.SoftwareTypes
                .Include(s => s.Softwares)
                .ThenInclude(s => s.SoftwareAllocations)
                .SelectMany(s => s.Softwares.Select(software => new SoftwarePage
                {
                    name = software.SoftwareName,
                    version = software.SoftwareAllocations.Select(sa => sa.Version).FirstOrDefault(),
                    type =s.TypeName
                }));

            return software.ToList();
        }




    }
}
