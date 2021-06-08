using Newtonsoft.Json;
using Recipes.Areas.Recipes.Models;
using Recipes.Areas.Recipes.ViewModels;
using Recipes.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;

namespace Recipes.Areas.Recipes.Controllers
{
    [RoutePrefix("recipe-wizard/recipes")]
    public class RecipeController : Controller
    {
        private DBContext db = new DBContext();

        [Route("recipesList")]
        public ActionResult Recipes()
        {
            var data = db.Recipes.Include("Ingredients").ToList();
            foreach (var recipe in data)
            {
                foreach (var ingredient in recipe.Ingredients)
                {
                    ingredient.Recipe = null;
                }
            }

            var jsonData = JsonConvert.SerializeObject(data);

            return Json(new { data = data }, JsonRequestBehavior.AllowGet);

            //THE BELOW WAS USED BEFORE USING AN INTERNAL DATABASE TO SIMULATE A DATABASE
            //List<Recipe> items = new List<Recipe>();
            //var data = db.Recipes.Include("Ingredients").ToList();
            //var otherData = db.Ingredients.ToList();

            //using (StreamReader r = new StreamReader(Server.MapPath("~/Areas/Recipes/Data/mockRecipes.json")))
            //{
            //    string json = r.ReadToEnd();
            //    items = JsonConvert.DeserializeObject<List<Recipe>>(json);
            //}
            //return Json(new { data = items }, JsonRequestBehavior.AllowGet);
        }

        [Route("add-recipe")]
        public ActionResult AddRecipe(Recipe recipe)
        {
            try
            {
                AddRecipeHelper(recipe);
            }
            catch (Exception e)
            {
                return Json(new { success = false, message = "Unable to add recipe properly. " + e });
            }

            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }

        [Route("get-recipe")]
        public ActionResult GetRecipe(int id)
        {
            var recipe = db.Recipes.Include("Ingredients").Where(x => x.Id == id).FirstOrDefault();

            //we have to do this to remove circular references or the ajax call will break.
            foreach(var ingredient in recipe.Ingredients)
            {
                ingredient.Recipe = null;
            }

            return Json(new { data = recipe }, JsonRequestBehavior.AllowGet);
        }

        [Route("get-measurements")]
        public ActionResult GetMeasurements()
        {
            var names = typeof(MeasurementType).GetEnumNames();

            var measurements = new List<MeasurementType>()
            {
                MeasurementType.Cups,
                MeasurementType.Ounces,
                MeasurementType.Pounds,
                MeasurementType.Tablespoons,
                MeasurementType.Teaspoons
            };

            return Json(new { measurementNums = measurements, measurementNames = names }, JsonRequestBehavior.AllowGet);
        }

        [Route("edit-recipe")]
        public ActionResult EditRecipe(int id, string title, string description, string notes, string createdBy)
        {
            var existingRecipe = db.Recipes.Where(x => x.Id == id).FirstOrDefault();

            if (existingRecipe.CreatedBy != createdBy)
                existingRecipe.CreatedBy = createdBy;

            if (existingRecipe.Description != description)
                existingRecipe.Description = description;

            if (existingRecipe.Notes != notes)
                existingRecipe.Notes = notes;

            if (existingRecipe.Title != title)
                existingRecipe.Title = title;

            db.SaveChanges();

            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }

        [Route("add-ingredient")]
        public ActionResult AddIngredient(int id)
        {
            Ingredient newIngredient = new Ingredient()
            {
                IngredientName = "Title",
                Recipe_Id = id,
                MeasurementType = MeasurementType.Cups,
                Quantity = "0"
            };

            db.Ingredients.Add(newIngredient);
            db.SaveChanges();

            var ingredientId = db.Ingredients.OrderByDescending(x => x.Id).Select(x => x.Id).FirstOrDefault();

            return Json(new { success = true, data = ingredientId }, JsonRequestBehavior.AllowGet);
        }

        [Route("edit-ingredient")]
        public ActionResult EditIngredient(List<Ingredient> ingredients)
        {
            foreach (var ingredient in ingredients)
            {
                var theIngredient = db.Ingredients.Where(x => x.Id == ingredient.Id).FirstOrDefault();

                if (theIngredient.IngredientName != ingredient.IngredientName)
                    theIngredient.IngredientName = ingredient.IngredientName;

                if (theIngredient.MeasurementType != ingredient.MeasurementType)
                    theIngredient.MeasurementType = ingredient.MeasurementType;

                if (theIngredient.Quantity != ingredient.Quantity)
                    theIngredient.Quantity = ingredient.Quantity;
            }

            db.SaveChanges();

            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }

        [Route("delete-ingredient")]
        public ActionResult DeleteIngredient(int id)
        {
            var existingIngredient = db.Ingredients.Where(x => x.Id == id).FirstOrDefault();
            db.Ingredients.Remove(existingIngredient);
            db.SaveChanges();

            return Json(new {success = true }, JsonRequestBehavior.AllowGet);
        }

        [Route("delete-recipe")]
        public ActionResult DeleteRecipe(int id)
        {
            var recipe = db.Recipes.Include("Ingredients").Where(x => x.Id == id).FirstOrDefault();

            if (recipe.Ingredients.Count() > 0)
                db.Ingredients.RemoveRange(recipe.Ingredients);

            db.Recipes.Remove(recipe);
            db.SaveChanges();

            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }

        private void AddRecipeHelper(Recipe recipe)
        {
            if (recipe.Notes != null)
            {
                var matches = Regex.Matches(recipe.Notes, @"\s*");

                if (matches.Count > 0)
                    recipe.Notes = "No additional notes.";
            } 
            else
                recipe.Notes = "No additional notes.";

            db.Recipes.Add(recipe);

            foreach(var ingredient in recipe.Ingredients)
            {
                db.Ingredients.Add(ingredient);
            }

            db.SaveChanges();
        }
    }
}