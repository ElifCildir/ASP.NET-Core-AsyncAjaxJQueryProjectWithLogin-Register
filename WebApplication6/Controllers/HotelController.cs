using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.FlowAnalysis;
using System.Linq;
using System.Linq.Expressions;
using WebApplication6.Data;
using WebApplication6.Models;

namespace WebApplication6.Controllers
{
    public class HotelController : Controller
    {
        private readonly ApplicationDbContext context;

        public HotelController(ApplicationDbContext context)
        {
            this.context = context;
        }


        public IActionResult Index()
        {
            return View();
        }

        public JsonResult HotelList()
        {

            var data = context.hotels.ToList();
            return new JsonResult(data);


        }


        [HttpPost]
        public JsonResult Create(Hotel hotel)
        {
            var htl = new Hotel()
            {
                HotelName = hotel.HotelName,
                Address = hotel.Address,
                Pricepernight = hotel.Pricepernight,
                DestinationID = hotel.DestinationID,

            };

            context.hotels.Add(htl);
            context.SaveChanges();
            return new JsonResult("Data is Saved");

        }

        public JsonResult Delete(int id)
        {
            var data = context.hotels.Where(h => h.HotelId == id).SingleOrDefault();
            context.hotels.Remove(data);
            context.SaveChanges();
            return new JsonResult(" Data deleted");


        }


        public JsonResult Edit(int id)
        {
            var data = context.hotels.Where(h => h.HotelId == id).SingleOrDefault();
            return new JsonResult(data);


        }

        [HttpPost]
        public JsonResult Update(Hotel hotel)
        {
            context.hotels.Update(hotel);
            context.SaveChanges();
            return new JsonResult("Record Updated");



        }



    }
}
