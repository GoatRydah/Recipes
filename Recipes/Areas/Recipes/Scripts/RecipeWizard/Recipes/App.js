/*
 * This file represents the main vue.js app. It houes each component that is used in this project.
 * With vue routing, coupled with mvc, all components will be display through this app. What your 
 * route shows in the url will determine what component is showing in the app.
 */

//global services

//global filters

//global components
Vue.component('RecipeList', RecipeList);
Vue.component('CreateRecipe', CreateRecipe);
Vue.component('EditRecipe', EditRecipe);

$(document).ready(function () {

    var vue = new Vue({
        router,
        data: {
            appOpts,
            recipeWizard 
        },
        created: function () {
            let self = this;
        },
        methods: {

        }
    }).$mount('#recipeApp');
});