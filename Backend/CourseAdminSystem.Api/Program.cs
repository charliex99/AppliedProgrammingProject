using Amazon.S3;
using Amazon.Runtime;
using CourseAdminSystem.API.Middleware;
using CourseAdminSystem.Model;
using CourseAdminSystem.Model.Repositories;

var builder = WebApplication.CreateBuilder(args);

//builder.Services.AddAWSService<IAmazonS3>();



// Retrieve AWS configuration from appsettings.json
var awsOptions = builder.Configuration.GetSection("AWS");

// Create AWS credentials using the Access Key and Secret Key from the configuration
var credentials = new BasicAWSCredentials(awsOptions["AccessKey"], awsOptions["SecretKey"]);

// Get the AWS Region from the configuration
var region = Amazon.RegionEndpoint.GetBySystemName(awsOptions["Region"]);

// Add the AmazonS3 service with the provided credentials and region
builder.Services.AddSingleton<IAmazonS3>(new AmazonS3Client(credentials, region));



// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<UserRepository, UserRepository>();
builder.Services.AddScoped<RecipeRepository, RecipeRepository>();
builder.Services.AddScoped<ProductRepository, ProductRepository>();
builder.Services.AddScoped<ProductListRepository, ProductListRepository>();
builder.Services.AddScoped<CreatedListRepository, CreatedListRepository>();
builder.Services.AddScoped<FavoriteListRepository, FavoriteListRepository>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost4200", builder =>
    {
        builder.WithOrigins("http://localhost:4200")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowLocalhost4200");

app.UseHttpsRedirection();
app.UseBasicAuthenticationMiddleware();
app.UseAuthorization();
app.MapControllers();

app.Run();
