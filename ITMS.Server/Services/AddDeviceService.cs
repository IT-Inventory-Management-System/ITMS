using ITMS.Server.DTO;
using ITMS.Server.Models;
using ITMS.Server.ViewModel;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using System;
using static MiNET.Net.McpeInteract;

namespace ITMS.Server.Services;
    public interface IDeviceService
{
    void AddDevice(PutLaptop device);
    void AddSoftwareAllocation(PutSofwareAllocation sofwareAllocation);
    void AddSoftware(PutSoftware software);
    void AddDeviceModel (PutDeviceModel model);
    void AddMouseModel(PostMouseModelDTO mouseModel);
    void AddMouse(PostMouseDTO mouseModel);
    void AddMonitor(PostMonitorDTO monitorDTO);
    void AddCommon(CommonDeviceDTO commonDeviceDTO);
    Task<List<LaptopModelDTO>> GetLaptopModelsAsync();
    Task<List<SoftwareModelDTO>> GetSoftwareModelsAsync();
}

public class AddDeviceService : IDeviceService
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
                inventoriesItem.SerialNumber = device.SerialNumberList[i];
                inventoriesItem.Cygid = device.CYGIdsList[i];
                inventoriesItem.DeviceModelId = device.DeviceModelId; 
                //inventoriesItem.os = inventariesItem.os;
                inventoriesItem.PurchasedDate = device.PurchasedOn;
                inventoriesItem.Status = device.Status;
                inventoriesItem.CreatedBy = device.CreatedBy;
                inventoriesItem.CreatedAtUtc = DateTime.UtcNow;
                inventoriesItem.UpdatedBy = device.UpdatedBy;
                inventoriesItem.UpdatedAtUtc = DateTime.UtcNow;
                inventoriesItem.WarrantyDate = device.WarrantyDate;
                inventoriesItem.IsArchived = device.IsArchived;
                inventoriesItem.LocationId = device.LocationId;
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
                CreatedAtUtc = DateTime.UtcNow,
                UpdatedBy = model.UpdatedBy,
                UpdatedAtUtc = DateTime.UtcNow,
                IsArchived = model.IsArchived,
            };
            _context.DeviceModel.Add(deviceModel);
            _context.SaveChanges();
        }

        public async Task<List<LaptopModelDTO>> GetLaptopModelsAsync()
        {
            var uniqueLaptopModels = await _context.DeviceModel
                .Join(
                    _context.Ostypes,
                    deviceModel => deviceModel.Os,
                    osType => osType.Id,
                    (deviceModel, osType) => new { DeviceModel = deviceModel, OsType = osType }
                )
                .GroupBy(joinResult => new { joinResult.DeviceModel.DeviceName, joinResult.OsType.Osname })
                .Select(g => new LaptopModelDTO

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
        var softwareModels = await _context.Software
            .Join(
                _context.SoftwareTypes,
                software => software.SoftwareTypeId,
                softwareType => softwareType.Id,
                (software, softwareType) => new SoftwareModelDTO
                {
                    Id = software.Id,
                    SoftwareName = software.SoftwareName,
                    SoftwareTypeId = software.SoftwareTypeId,
                    TypeName = softwareType.TypeName // Include TypeName from SoftwareType
                }
            )
            .Distinct()
            .ToListAsync();

        return softwareModels;
    }
    public void AddSoftware(PutSoftware software)
        {
        Software softwareForDb = new Software
        {

                SoftwareName = software.SoftwareName,
                SoftwareTypeId = software.SoftwareTypeId,
                CategoryId = software.CategoryId,
                SoftwareThumbnail = software.SoftwareThumbnail,
                CreatedBy = software.CreatedBy,
                CreatedAtUtc = DateTime.UtcNow,
                UpdatedBy = software.UpdatedBy,
                UpdatedAtUtc = DateTime.UtcNow
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
                softwareAllocationForDb.PurchasedDate = sofwareAllocation.PurchasedDate;
                softwareAllocationForDb.ExpiryDate = sofwareAllocation.ExpiryDate;
                softwareAllocationForDb.AssignedTo = sofwareAllocation.AssignedTo;
                softwareAllocationForDb.AssignedBy = sofwareAllocation.AssignedBy;
                softwareAllocationForDb.Version= sofwareAllocation.Version;
                softwareAllocationForDb.AssignedDate = sofwareAllocation.AssignedDate;
                softwareAllocationForDb.LocationId = sofwareAllocation.LocationId;
                softwareAllocationForDb.IsArchived = false;
                _context.SoftwareAllocations.Add(softwareAllocationForDb);
            }
            _context.SaveChanges();
        }
    public void AddMouseModel(PostMouseModelDTO mouseModel)
    {
        DeviceModel deviceModel = new DeviceModel
        {
            Brand = mouseModel.brand,

            IsWired = mouseModel.iswired,
            CategoryId = mouseModel.categoryId,
            CreatedBy = mouseModel.createdBy,
            CreatedAtUtc = DateTime.UtcNow,
            UpdatedBy = mouseModel.updatedBy,
            UpdatedAtUtc = DateTime.UtcNow,
            IsArchived = mouseModel.isArchived,
        };
        _context.DeviceModel.Add(deviceModel);
        _context.SaveChanges();
    }

    public void AddMouse(PostMouseDTO mouseModel)
    {
        //List<Inventory> inventories = new List<Inventory>();

        for (int i = 0; i <mouseModel.qty; i++)
        {
            Device inventoriesItem = new Device();
            inventoriesItem.Cygid = mouseModel.deviceId[i].ToString();
            inventoriesItem.DeviceModelId = mouseModel.deviceModelId;
            inventoriesItem.Status = mouseModel.status;
            inventoriesItem.CreatedBy = mouseModel.createdBy;
            inventoriesItem.CreatedAtUtc = DateTime.UtcNow;
            inventoriesItem.UpdatedBy = mouseModel.updatedBy;
            inventoriesItem.UpdatedAtUtc = DateTime.UtcNow;
            inventoriesItem.IsArchived = mouseModel.isArchived;
            inventoriesItem.LocationId = mouseModel.locationId;
            inventoriesItem.PurchasedDate = mouseModel.purchaseddate;
            inventoriesItem.WarrantyDate = mouseModel.warrantydate;
            _context.Devices.Add(inventoriesItem);

        }
        //_context.Devices.Add(device);
        _context.SaveChanges();
    }

    public void AddMonitor(PostMonitorDTO postMonitorDTO)
    {
        for (int i = 0; i < postMonitorDTO.qty; i++)
        {
            Device inventoriesItem = new Device();

            inventoriesItem.Cygid = postMonitorDTO.deviceId[i].ToString();
            inventoriesItem.DeviceModelId = postMonitorDTO.deviceModelId;
            inventoriesItem.Status = postMonitorDTO.status;
            inventoriesItem.CreatedBy = postMonitorDTO.createdBy;
            inventoriesItem.CreatedAtUtc = DateTime.UtcNow;
            inventoriesItem.UpdatedBy = postMonitorDTO.updatedBy;
            inventoriesItem.UpdatedAtUtc = DateTime.UtcNow;
            inventoriesItem.IsArchived = postMonitorDTO.isArchived;
            inventoriesItem.LocationId = postMonitorDTO.locationId;
            inventoriesItem.PurchasedDate = postMonitorDTO.purchaseddate;
            inventoriesItem.WarrantyDate = postMonitorDTO.warrantydate;
            inventoriesItem.ScreenSize = postMonitorDTO.ScreenSize;

            _context.Devices.Add(inventoriesItem);

        }
        //_context.Devices.Add(device);
        _context.SaveChanges();
    }
    public void AddCommon(CommonDeviceDTO commonDeviceDTO)
    {
        for (int i = 0; i < commonDeviceDTO.qty; i++)
        {
            Device inventoriesItem = new Device();

            inventoriesItem.Cygid = commonDeviceDTO.deviceId[i].ToString();
            inventoriesItem.DeviceModelId = commonDeviceDTO.deviceModelId;
            inventoriesItem.Status = commonDeviceDTO.status;
            inventoriesItem.CreatedBy = commonDeviceDTO.createdBy;
            inventoriesItem.CreatedAtUtc = DateTime.UtcNow;
            inventoriesItem.UpdatedBy = commonDeviceDTO.updatedBy;
            inventoriesItem.UpdatedAtUtc = DateTime.UtcNow;
            inventoriesItem.IsArchived = commonDeviceDTO.isArchived;
            inventoriesItem.LocationId = commonDeviceDTO.locationId;
            inventoriesItem.PurchasedDate = commonDeviceDTO.purchaseddate;
            inventoriesItem.WarrantyDate = commonDeviceDTO.warrantydate;

            _context.Devices.Add(inventoriesItem);

        }
        _context.SaveChanges();
    }
}


