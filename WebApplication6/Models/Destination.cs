using System.ComponentModel.DataAnnotations;

namespace WebApplication6.Models
{
    public class Destination
    {
        [Key ]
        public int DestinationId { get; set; }
        [Required(ErrorMessage = " Name can't be blank")]
        public string DestinationName { get; set; }
        [Required(ErrorMessage = "Country  can't be blank")]
        public string Country { get; set; }

        [Range(1,10)]
        public decimal AverageRating { get; set; }

    }
}
