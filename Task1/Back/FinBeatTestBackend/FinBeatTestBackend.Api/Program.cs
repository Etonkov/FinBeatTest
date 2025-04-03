using Asp.Versioning;
using FinBeatTestBackend.Data;
using FinBeatTestBackend.Service.DataItem;
using Microsoft.EntityFrameworkCore;

namespace FinBeatTestBackend.Api;

// ReSharper disable once ClassNeverInstantiated.Global
public class Program
{
    public static void Main(string[] args)
    {
        WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
        builder.Services.AddDbContext<AppDbContext>(options =>
            options
                .UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
                .UseSnakeCaseNamingConvention());
        builder.Services.AddScoped<IDataItemService, DataItemService>();
        builder.Services.AddControllers();
        builder.Services.AddApiVersioning(options =>
        {
            options.ReportApiVersions = true;
            options.AssumeDefaultVersionWhenUnspecified = true;
            options.DefaultApiVersion = new ApiVersion(1, 0);
        }).AddApiExplorer(options =>
        {
            options.SubstituteApiVersionInUrl = true;
            options.GroupNameFormat = "'v'VVV";
        });
        builder.Services.AddSwaggerGen();
        WebApplication app = builder.Build();
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
            using IServiceScope lifetimeScope = app.Services.CreateScope();
            using AppDbContext dbContext = lifetimeScope.ServiceProvider.GetRequiredService<AppDbContext>();
            dbContext.Database.EnsureCreated();
        }
        app.UseHttpsRedirection();
        app.MapControllers();
        app.Run();
    }
}
