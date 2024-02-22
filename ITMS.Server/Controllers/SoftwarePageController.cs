//using ITMS.Server.DTO;
//using ITMS.Server.Models;
//using ITMS.Server.Services;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;

//namespace ITMS.Server.Controllers
//{
//    [Route("api/SoftwarePage")]
//    [ApiController]
//    public class SoftwarePageController : ControllerBase
//    {
//        private readonly SoftwarePageService _softwarepageService;

//        public SoftwarePageController(SoftwarePageService softwarepageService)
//        {
//            _softwarepageService = softwarepageService;
//        }

//        [HttpGet("software")]
//        public ActionResult<IEnumerable<SoftwarePage>> GetSoftware()
//        {
//            var software = _softwarepageService.GetSoftware();
//            return Ok(software);
//        }

//        [HttpGet("selected")]
//        public IActionResult GetSelected([FromQuery] SingleSoftwareSelectedParams parameters)
//        {
//            SingleSoftwareSelected? selected = _softwarepageService.GetSingleSelected(parameters);
//                //.GetSingleSelected(parameters);
//            return Ok(selected);

//        }

//        [HttpGet("History")]
//        public ActionResult<IEnumerable<SingleSoftwareHistory>> GetHistory([FromQuery] SingleSoftwareSelectedParams parameters)
//        {
//            return _softwarepageService.GetSingleHistory(parameters);
//        }
//    }
//}

using ITMS.Server.DTO;
using ITMS.Server.Models;
using ITMS.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ITMS.Server.Controllers
{
    [Route("api/SoftwarePage")]
    [ApiController]
    public class SoftwarePageController : ControllerBase
    {
        private readonly SoftwarePageService _softwarepageService;

        public SoftwarePageController(SoftwarePageService softwarepageService)
        {
            _softwarepageService = softwarepageService;
        }

        [HttpGet("software")]
        public List<IEnumerable<SoftwarePage>> GetSoftware([FromQuery] bool arch)
        {
            List<IEnumerable<SoftwarePage>> list = new List<IEnumerable<SoftwarePage>>();

            var softwareIndia = new List<SoftwarePage>();
            var softwareUSA = new List<SoftwarePage>(); 
            if (arch==false) {
                softwareIndia = _softwarepageService.GetSoftware("India", false);

                softwareUSA = _softwarepageService.GetSoftware("USA", false);
            }

            softwareIndia.AddRange(_softwarepageService.GetSoftware("India", true));
            softwareUSA.AddRange(_softwarepageService.GetSoftware("USA", true));


            list.Add(softwareIndia);
            list.Add(softwareUSA);
            return list;
        }

        [HttpPost("filter")]
        public List<IEnumerable<SoftwarePage>> Filter([FromBody] filterDto attri)
        {
            List<IEnumerable<SoftwarePage>> allData = GetSoftware(attri.IsArchived);

            return _softwarepageService.CardFilter(allData, attri);

//            List<IEnumerable<SoftwarePage>> filteredData = new List<IEnumerable<SoftwarePage>>();

//            if (attri.location == "India")
//            {
//                var India = allData[0].Where(s =>
//                     //(string.IsNullOrEmpty(attri.inStock) || (attri.inStock == "Low In Stock" && s.inStock <= 1) || (attri.inStock == "In Stock" && s.inStock > 1) || (attri.inStock == "Out Of Stock" && s.inStock == 0)) &&
//                     (attri.selectedType.Count == 0 || attri.selectedType.Contains(s.type)) &&
//                   (attri.From == null ||s.purchaseDates.Any(pd => DateOnly.FromDateTime((DateTime)pd) >= attri.From)) &&
//(attri.To == null || s.purchaseDates.Any(pd => DateOnly.FromDateTime((DateTime)pd) <= attri.To))
//                ).ToList();

//                filteredData.Add(India);
//                filteredData.Add(allData[1]);
//            }
//            else
//            {
//                var USA = allData[1].Where(s =>
//    // (string.IsNullOrEmpty(attri.inStock) || (attri.inStock == "Low In Stock" && s.inStock <= 1) || (attri.inStock == "In Stock" && s.inStock > 1) || (attri.inStock == "Out Of Stock" && s.inStock == 0)) &&
//     (attri.selectedType.Count == 0 || attri.selectedType.Contains(s.type)) && 
//     (attri.From == null || s.purchaseDates.Any(pd => DateOnly.FromDateTime((DateTime)pd) >= attri.From)) &&
//(attri.To == null || s.purchaseDates.Any(pd => DateOnly.FromDateTime((DateTime)pd) <= attri.To))

// ).ToList();



//                filteredData.Add(allData[0]);
//                filteredData.Add(USA);
//            }

//            return filteredData;



        }

        [HttpGet("selected")]
        public IActionResult GetSelected([FromQuery] SingleSoftwareSelectedParams parameters)
        {
            SingleSoftwareSelected? selected = _softwarepageService.GetSingleSelected(parameters);
            //.GetSingleSelected(parameters);
            return Ok(selected);

        }

        [HttpGet("History")]
        public ActionResult<IEnumerable<SingleSoftwareHistory>> GetHistory([FromQuery] SingleSoftwareSelectedParams parameters)
        {
            return _softwarepageService.GetSingleHistory(parameters);
        }

        [HttpGet("softwarestable")]
        public ActionResult<IEnumerable<Softwares>> GetSoftwares([FromQuery] String country)
        {
            try
            {
                var software = _softwarepageService.GettableSoftwares(country);
                return Ok(software);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

     [HttpPost("archive")]
public IActionResult Archive([FromBody] SoftwareUpdateDto dto)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }

    bool updateResult = _softwarepageService.UpdateSoftwareArchiveStatus(dto);
    if (!updateResult)
    {
        return NotFound("Software not found.");
    }

    return Ok("Software archive status updated successfully.");
}




    }
}