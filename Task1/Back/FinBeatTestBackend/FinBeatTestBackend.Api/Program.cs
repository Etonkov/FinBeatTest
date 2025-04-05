using Asp.Versioning;
using FinBeatTestBackend.Data;
using FinBeatTestBackend.Service.DataItem;
using FinBeatTestBackend.Service.DataItem.Dto;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;

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
        builder.Services.AddSwaggerGen(options => options.MapType<SetDataItemRequestDto>(() => new OpenApiSchema
        {
            Type = "object",
            AdditionalProperties = new OpenApiSchema
            {
                Type = "string"
            },
            Example = new OpenApiObject
            {
                ["1"] = new OpenApiString("value1")
            }
        }));
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
