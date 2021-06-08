using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Recipes.Areas.Recipes.Controllers
{
    [RouteArea("Recipes", AreaPrefix = "")]
    [RoutePrefix("recipe-wizard")]
    public class RecipeWizardController : Controller
    {
        [Route("")]
        public ActionResult App()
        {
            if (!Request.Path.EndsWith("/"))
                return Redirect(Request.Path + "/");

            return View();
        }
    }
}