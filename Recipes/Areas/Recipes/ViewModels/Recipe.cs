using Recipes.Areas.Recipes.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Recipes.Areas.Recipes.ViewModels
{
    public class Recipe
    {
        [Key][Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Notes { get; set; }
        [Required]
        public string CreatedBy { get; set; }
        public List<Ingredient> Ingredients { get; set; }
    }
}