using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Linq;
using System.Security.Claims;
using WebApplication6.Data;
using WebApplication6.Models.Account;
using WebApplication6.Models.ViewModel;

namespace WebApplication6.Controllers
{
    public class AccountController : Controller
    {
        public readonly ApplicationDbContext context;

        public AccountController(ApplicationDbContext context)
        {
            this.context = context;
        }


        public IActionResult Index()
        {
            return View();
        }



        public IActionResult Login()
        {


            return View();
        }






        [HttpPost]
        public IActionResult Login(LoginviewModel model)

        {           
            if(ModelState.IsValid)
            {

            
            var data = context.userrs.Where(e => e.UserrName == model.UserrName).SingleOrDefault();
            if(data!=null)
                {

                    bool isValid = (data.UserrName == model.UserrName && data.Password == model.Password);
                    if (isValid)
                    {
                        var identity = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, model.UserrName) },CookieAuthenticationDefaults.AuthenticationScheme);

                        var prinp=new ClaimsPrincipal(identity);
                        HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, prinp);
                        HttpContext.Session.SetString("UserrName", model.UserrName);
                        return RedirectToAction("Index", "Home");

                    }

                    else
                    {
                        TempData["errorPassword"] = "Invalid password";
                        return View(model);
                    }


                }

                else
                {
                    TempData["errorUsername"] = "Username not found";
                    return View(model);
                }





            }
            else 
            {
                return View(model);

            }
        
   


        }


        public IActionResult Logout()
        {

            HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            var storedCookies = Request.Cookies.Keys;
            foreach(var key in storedCookies)
            {
                Response.Cookies.Delete(key);
            }

            return RedirectToAction("Login", "Account");

            }




        public IActionResult SignUp()
        {
            return View();

        }

        [HttpPost]
        public IActionResult SignUp(LoginviewModel model)
        {
            
            if (ModelState.IsValid)
            {
                var data = new Userr()
                {
                    UserrName = model.UserrName,
                    Email = model.Email,
                    Password = model.Password,
                    Mobile = model.Mobile,
                    IsActive = model.IsActive,


                };

                context.userrs.Add(data);
                context.SaveChanges();
                TempData["successMessage"] = "You have successfully registered";
                return RedirectToAction("Login");

            }

            else
            {
                TempData["successMessage"] = "Registration Failed";
                return View(model);


            }

        }













    }
}

