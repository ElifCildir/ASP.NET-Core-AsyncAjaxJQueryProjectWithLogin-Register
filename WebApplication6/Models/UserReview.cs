using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication6.Models
{
    public class UserReview
    {
        [Key]
        public int ReviewID { get; set; }
        public string ReviewText { get; set;}

        [Range(1,10)]
        public int Rating { get; set;}

        public DateTime DatePosted { get; set;}
        public string UserrName { get; set;}

        [ForeignKey("Destination")]
        public int DestinationID { get; set;}

        public Destination Destination { get; set;}

    }
}
