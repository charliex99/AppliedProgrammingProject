using CourseAdminSystem.Model;
using CourseAdminSystem.Model.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<UserRepository, UserRepository>();
builder.Services.AddScoped<RecipeRepository, RecipeRepository>();
builder.Services.AddScoped<ProductRepository, ProductRepository>();
builder.Services.AddScoped<ProductListRepository, ProductListRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();