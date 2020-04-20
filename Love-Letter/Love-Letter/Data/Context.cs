using Microsoft.EntityFrameworkCore;
using Love_Letter.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Love_Letter.Data
{
    public class Context:IdentityDbContext
    {
        public Context(DbContextOptions<Context> options) : base(options)
        {

        }
        public DbSet<User> users { get; set; }
    }
}
