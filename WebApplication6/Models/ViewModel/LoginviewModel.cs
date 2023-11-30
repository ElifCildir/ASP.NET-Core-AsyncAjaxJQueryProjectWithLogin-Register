namespace WebApplication6.Models.ViewModel
{
    public class LoginviewModel
    {

        public int Id { get; set; }
        public string UserrName { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public bool IsActive { get; set; }
        public bool IsRemember { get; set; }


    }
}
