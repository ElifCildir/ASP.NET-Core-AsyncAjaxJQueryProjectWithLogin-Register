using System.ComponentModel.DataAnnotations;

namespace WebApplication6.Models.Account
{
    public class Userr
    {


        [Key]
        public int Id { get; set; }
        public string UserrName { get; set; }
        public string Email { get; set;}
        public string Mobile{ get; set;}
        public string Password { get; set;}
        public bool IsActive { get; set;}
        public bool IsRemember { get; set;}

    }
}
