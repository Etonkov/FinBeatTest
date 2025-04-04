using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace FinBeatTestBackend.Data.Helpers;

public static class EfCleanHelper
{
    public static async Task<string> TruncateAsync<T>(this DbSet<T> dbSet) where T : class
    {
        string cmd = $"TRUNCATE TABLE {AnnotationHelper.TableName(dbSet)}";
        DbContext context = dbSet.GetService<ICurrentDbContext>().Context;
        await context.Database.ExecuteSqlRawAsync(cmd);
        return cmd;
    }
}
