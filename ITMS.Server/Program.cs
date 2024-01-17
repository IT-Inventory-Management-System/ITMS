using ITMS.Server.Models;
using ITMS.Server.Services;
using Microsoft.EntityFrameworkCore;
using MiNET.Blocks;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped<AddDeviceService>();
builder.Services.AddControllers();
builder.Services.AddControllersWithViews()
    .AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ItinventorySystemContext>(options =>
{
    //the change occurs here.
    //builder.cofiguration and not just configuration
    // options.UseSqlServer(builder.Configuration.GetConnectionString("Server=.\\SQLExpress;Database=ITInventoryManagement;Trusted_Connection=True;"));
});
builder.Services.AddScoped<IDeviceService, AddDeviceService>();
builder.Services.AddScoped<IUserListService, UserListService>();
builder.Services.AddScoped<DeviceService>();
builder.Services.AddScoped<DeviceLogService>();
builder.Services.AddScoped<UserDeviceService>();
builder.Services.AddScoped<SoftwareService>();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowOrigin", builder =>
    {
        builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowOrigin");

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();