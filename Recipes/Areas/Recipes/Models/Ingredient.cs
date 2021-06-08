using Recipes.Areas.Recipes.ViewModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Recipes.Areas.Recipes.Models
{
    public class Ingredient
    {
        [Key][Required]
        public int Id { get; set; }
        [Required]
        public string IngredientName { get; set; }
        [Required]
        public string Quantity { get; set; }
        [Required]
        public MeasurementType MeasurementType { get; set; }
        [ForeignKey("Recipe_Id")]
        public Recipe Recipe { get; set; }
        public int Recipe_Id { get; set; }
    }

    public enum MeasurementType
    {
        [Display(Name = "Cup(s)")]
        Cups = 1,
        [Display(Name = "Tbsp")]
        Tablespoons = 2,
        [Display(Name = "tsp")]
        Teaspoons = 3,
        [Display(Name = "lb(s)")]
        Pounds = 4,
        [Display(Name = "oz")]
        Ounces = 5
    }
}