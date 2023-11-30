using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Linq;
using WebApplication6.Data;
using WebApplication6.Models;

namespace WebApplication6.Controllers
{
    public class DestinationController : Controller
    {

        private readonly ApplicationDbContext context;

        public DestinationController(ApplicationDbContext context)
        {
            this.context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult DestinationList()
        {
            var data = context.destinations.ToList();
            return new JsonResult(data);


        }

        [HttpPost]
        public JsonResult AddDestination(Destination destination)
        {
            var dest = new Destination()
            { 
               DestinationName = destination.DestinationName,
               Country = destination.Country,
               AverageRating = destination.AverageRating,
            
            };

            context.destinations.Add(dest);
            context.SaveChanges();
            return new JsonResult("Data is saved");
        }



        public JsonResult Delete(int id)
        {
            var data = context.destinations.Where(d => d.DestinationId == id).SingleOrDefault();
            context.destinations.Remove(data);
            context.SaveChanges();
            return new JsonResult("Data deleted");


        }

        public JsonResult Edit(int id)
        {
            var data = context.destinations.Where(d => d.DestinationId == id).SingleOrDefault();
            return new JsonResult(data);


        }

        [HttpPost]
        public JsonResult Update(Destination destination)
        {
            context.destinations.Update(destination);
            context.SaveChanges();
            return new JsonResult("Record Updated");


        }


    }
}
