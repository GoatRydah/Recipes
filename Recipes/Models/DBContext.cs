using Recipes.Areas.Recipes.ViewModels;
using Recipes.Areas.Recipes.Models;
using System.Data.Entity;

namespace Recipes.Models
{
    public class DBContext: DbContext
    {
        public DBContext() { }

        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
    }
}