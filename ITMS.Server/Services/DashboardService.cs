using System;

namespace ITMS.Server.Services
{
    public class DashboardService
    {
        private readonly AppDbContext _context;

        public DashboardService(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Inventory> GetInventory()
        {
            return _context.Inventory.ToList();
        }


        
    }
}
