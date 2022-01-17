using Microsoft.EntityFrameworkCore;
using CourseApplication.Models;

namespace CourseApplication.Models
{
    public class ApplicationDbContext : DbContext
    {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Application> Applications { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Application>().Property(a => a._Participants).HasColumnName("Participants");
        }
    }
}
