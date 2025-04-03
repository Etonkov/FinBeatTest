using FinBeatTestBackend.Data.Model;
using Microsoft.EntityFrameworkCore;

namespace FinBeatTestBackend.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<DataItemModel> DataItems { get; set; }
}
