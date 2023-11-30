using Microsoft.EntityFrameworkCore;
using WebApplication6.Models;
using WebApplication6.Models.Account;

namespace WebApplication6.Data
{
    public class ApplicationDbContext: DbContext

    {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            
        }

        public DbSet<Destination> destinations { get; set; }
        public DbSet<Hotel> hotels { get; set; }
        public DbSet<UserReview > userReviews { get; set; }
        public DbSet<Userr> userrs { get; set; }
    }
}
