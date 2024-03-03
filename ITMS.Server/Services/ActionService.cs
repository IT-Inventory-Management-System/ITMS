using ITMS.Server.DTO;
using ITMS.Server.Models;

namespace ITMS.Server.Services { 

    public class ActionService
    {
        private readonly ItinventorySystemContext _context;

        public ActionService(ItinventorySystemContext context)
        {
            _context = context;
        }

        public List<ActionDTO> GetActions()
        {
            try
            {
                // Query the database to retrieve the actions
                var actions = _context.ActionTables.ToList();

                // Map the ActionTable entities to ActionDTO
                var actionDTOs = actions.Select(a => new ActionDTO
                {
                    Id = a.Id,
                    ActionName = a.ActionName
                }).ToList();

                return actionDTOs;
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as per your requirement
                throw new Exception("Error occurred while getting actions.", ex);
            }
        }
    }

}

