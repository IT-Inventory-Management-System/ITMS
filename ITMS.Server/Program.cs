
using ITMS.Server.Models;
using ITMS.Server.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MiNET.Blocks;
using System.Text;
using static Azure.Core.HttpHeader;
using static ITMS.Server.Services.GetSoftwareService;

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
builder.Services.AddControllersWithViews()
    .AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);
builder.Services.AddScoped<IDeviceService, AddDeviceService>();
builder.Services.AddScoped<IUserListService, UserListService>();
builder.Services.AddScoped<IAddAssetService, AddAssetService>();
builder.Services.AddScoped<IGetSoftwareService, GetSoftwareService>();
builder.Services.AddScoped<IGetSoftwareVersionService, GetSoftwareVersionService>();
builder.Services.AddScoped<DeviceService>();
builder.Services.AddScoped<DashboardService>();
builder.Services.AddScoped<DeviceLogService>();
builder.Services.AddScoped<UserDeviceService>();
builder.Services.AddScoped<IGetDeviceService, GetDeviceService>();
builder.Services.AddScoped<SoftwareService>();
builder.Services.AddScoped<AccessoriesService>();
builder.Services.AddScoped<ICommentService, AddCommentService>();
builder.Services.AddScoped<IUserRecievedBy,  UserRecievedBy>();
builder.Services.AddScoped<ActionService, ActionService>();
builder.Services.AddScoped<LoginService>();

builder.Services.AddScoped<SoftwarePageService>();
builder.Services.AddScoped<EmployeeService>();


builder.Services.AddScoped<IPostAssignAsset, PostAssignAsset>();
builder.Services.AddScoped<IGetAccessoryService, GetAccessoriesService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowOrigin", builder =>
    {
        builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});


builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("veryverysceret.....")),
        ValidateAudience = false,
        ValidateIssuer = false,
        ClockSkew = TimeSpan.Zero
    };
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

app.UseAuthentication();


app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();