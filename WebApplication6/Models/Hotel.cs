using Microsoft.AspNetCore.Routing;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.SqlTypes;

namespace WebApplication6.Models
{
    public class Hotel
    {
        [Key]
        public int HotelId { get; set; }
        public string HotelName { get; set;}
        public string Address { get; set;}
        public  decimal Pricepernight { get; set;}
        
        [ForeignKey("Destination")]
        public int DestinationID { get; set;  }

        public Destination Destination { get; set; }
    }
}
