using Amazon.S3;
using Amazon.Runtime;
using CourseAdminSystem.API.Middleware;
using CourseAdminSystem.Model;
using CourseAdminSystem.Model.Repositories;

var builder = WebApplication.CreateBuilder(args);


// Retrieve AWS configuration from appsettings.json
var awsOptions = builder.Configuration.GetSection("AWS");
var credentials = new BasicAWSCredentials(awsOptions["AccessKey"], awsOptions["SecretKey"]);
var region = Amazon.RegionEndpoint.GetBySystemName(awsOptions["Region"]);
builder.Services.AddSingleton<IAmazonS3>(new AmazonS3Client(credentials, region));



// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<UserRepository, UserRepository>();
builder.Services.AddScoped<RecipeRepository, RecipeRepository>();
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
