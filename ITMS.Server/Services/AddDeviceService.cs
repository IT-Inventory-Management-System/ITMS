using ITMS.Server.DTO;
using ITMS.Server.Models;
using System;

namespace ITMS.Server.Services
{
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
                //_context.Devices.Add(inventoriesItem);
            }
            //_context.Devices.Add(device);
            _context.SaveChanges();
        }

        public void AddDeviceModel(DeviceModel model)
        {
            _context.DeviceModels.Add(model);
            _context.SaveChanges();
        }
    }
}
