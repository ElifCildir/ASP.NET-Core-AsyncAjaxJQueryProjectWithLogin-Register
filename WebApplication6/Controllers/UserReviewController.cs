using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Policy;
using WebApplication6.Data;
using WebApplication6.Models;

namespace WebApplication6.Controllers
{
    public class UserReviewController : Controller
    {
        private readonly ApplicationDbContext context;

        public UserReviewController(ApplicationDbContext context)
        {
            this.context = context;
            
        }


        public IActionResult Index()
        {
            return View();
        }


        public JsonResult ReviewList()
        {

            var data = context.userReviews.ToList();
            return new JsonResult (data);

        }


        [HttpPost]
        public JsonResult Create(UserReview userReview)
        {
            var rev = new UserReview() { 
            
            ReviewText = userReview.ReviewText,
            Rating = userReview.Rating,
            DatePosted = userReview.DatePosted,
            UserrName = userReview.UserrName,
            DestinationID= userReview.DestinationID,

            };

           context.userReviews.Add(rev);
            context.SaveChanges();
            return new JsonResult("Data is Saved");


        }


        public JsonResult Delete(int id) { 
        
        
        var data = context.userReviews.Where(r=>r.ReviewID==id).SingleOrDefault();
            context.userReviews.Remove(data);
            context.SaveChanges();
            return new JsonResult("Data Deleted");
        
        }


        public JsonResult  Edit(int id)
        {

            var data = context.userReviews.Where(r => r.ReviewID == id).SingleOrDefault();
            return new JsonResult(data);

        }

        [HttpPost]
        public JsonResult Update(UserReview userreview)
        {
            context.Update(userreview);
            context.SaveChanges();
            return new JsonResult("Record Updated");



        }


    }
}
