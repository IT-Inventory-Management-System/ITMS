﻿using ITMS.Server.DTO;
using ITMS.Server.Models;
using ITMS.Server.ViewModel;
using System;

namespace ITMS.Server.Services
{
    Task<List<LaptopModelDTO>> GetLaptopModelsAsync();
    Task<List<SoftwareModelDTO>> GetSoftwareModelsAsync();
}
    public class AddDeviceService
    {
        private readonly ItinventorySystemContext _context;

        public AddDeviceService(ItinventorySystemContext context)
        {
            _context = context;
        }

        public void AddDevice(PutLaptop device)
        {
            //List<Inventory> inventories = new List<Inventory>();
            for (int i = 0; i < device.Qty; i++)
            {
                Device inventoriesItem = new Device();
                inventoriesItem.SerialNumber = device.SerialNumberList[i].ToString();
                inventoriesItem.Cygid = device.CYGIdsList[i];
                //inventoriesItem.os = inventariesItem.os;
                inventoriesItem.PurchasedDate = device.PurchasedOn;
                inventoriesItem.Status = device.Status;
                inventoriesItem.CreatedBy = device.CreatedBy;
                inventoriesItem.CreatedAtUtc = device.CreatedAtUtc;
                inventoriesItem.IsArchived = device.IsArchived;
                _context.Devices.Add(inventoriesItem);
            }
            //_context.Devices.Add(device);
            _context.SaveChanges();
        }

        public void AddDeviceModel(PutDeviceModel model)
        {
            DeviceModel deviceModel = new DeviceModel
            {
                DeviceName = model.DeviceName,
                Brand = model.Brand,
                ModelNo = model.ModelNo,
                Processor = model.Processor,
                Os = model.Os,
                Ram = model.Ram,
                Storage = model.Storage,
                IsWired = model.IsWired,
                CategoryId = model.CategoryId,
                CreatedBy = model.CreatedBy,
                CreatedAtUtc = model.CreatedAtUtc,
                UpdatedBy = model.UpdatedBy,
                UpdatedAtUtc = model.UpdatedAtUtc,
                IsArchived = model.IsArchived,
            };
            _context.DeviceModel.Add(deviceModel);
            _context.SaveChanges();
        }

    public async Task<List<LaptopModelDTO>> GetLaptopModelsAsync()
    {
        var uniqueLaptopModels = await _dbContext.DeviceModels
            .Join(
                _dbContext.Ostypes,
                deviceModel => deviceModel.Os,
                osType => osType.Id,
                (deviceModel, osType) => new { DeviceModel = deviceModel, OsType = osType }
            )
            .GroupBy(joinResult => new { joinResult.DeviceModel.DeviceName, joinResult.OsType.Osname })
            .Select(g => new LaptopModelDTO
        public void AddSoftware(PutSoftware software)
        {
            Software softwareForDb = new Software
            {
                Id = g.First().DeviceModel.Id,
                DeviceName = g.Key.DeviceName,
                OSName = g.Key.Osname,
            })
            .ToListAsync();
        return uniqueLaptopModels;
    }
    public async Task<List<SoftwareModelDTO>> GetSoftwareModelsAsync()
    {
        var uniqueSoftwareModels = await _dbContext.Softwares
            .Select(s => new SoftwareModelDTO
            {
                Id = s.Id,
                SoftwareName = s.SoftwareName,
                SoftwareTypeId = s.SoftwareTypeId
            })
            .Distinct()
            .ToListAsync();
        return uniqueSoftwareModels;
                SoftwareName = software.SoftwareName,
                SoftwareTypeId = software.SoftwareTypeId,
                CategoryId = software.CategoryId,
                SoftwareThumbnail = software.SoftwareThumbnail,
                CreatedBy = software.CreatedBy,
                CreatedAtUtc = software.CreatedAtUtc,
                UpdatedBy = software.UpdatedBy,
                UpdatedAtUtc = software.UpdatedAtUtc
            };

            _context.Software.Add(softwareForDb);
            _context.SaveChanges();
        }

        public void AddSoftwareAllocation(PutSofwareAllocation sofwareAllocation)
        {
            for (int i = 0; i < sofwareAllocation.Qty; i++)
            {
                SoftwareAllocation softwareAllocationForDb = new SoftwareAllocation();
                softwareAllocationForDb.SoftwareId = sofwareAllocation.SoftwareId;
                softwareAllocationForDb.ActivationKey = sofwareAllocation.ActivationKey;
                softwareAllocationForDb.SoftwareVersion = sofwareAllocation.SoftwareVersion;
                softwareAllocationForDb.PurchasedDate = sofwareAllocation.PurchasedDate;
                softwareAllocationForDb.ExpiryDate = sofwareAllocation.ExpiryDate;
                softwareAllocationForDb.AssignedTo = sofwareAllocation.AssignedTo;
                softwareAllocationForDb.AssignedBy = sofwareAllocation.AssignedBy;
                softwareAllocationForDb.AssignedDate = sofwareAllocation.AssignedDate;
                softwareAllocationForDb.LocationId = sofwareAllocation.LocationId;
                _context.SoftwareAllocations.Add(softwareAllocationForDb);
            }
            _context.SaveChanges();
        }
    }
}
