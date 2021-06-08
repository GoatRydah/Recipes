/*
 * This is the recipe wizard models.js file. It is the middle man between components and controllers.
 * When a component needs to do something in the back-end, it will call a method below, which will
 * trigger the controller to do some back-end work. This file acts as a library of what communication
 * exists between components and controllers.
 */
class RecipeWizard {

    constructor(endpoints) {

        this.endpoints = endpoints || {};

        //collections
        this.recipes = []
    }

    addIngredient(id) {
        let self = this;
        return new Promise(function (resolve, reject) {
            $.post(`${self.endpoints.recipes}/add-ingredient`, { id }, function (result) {
                if (result.success) {   

                    let item = {
                        Id: result.data,
                        IngredientName: 'Title',
                        Quantity: 0,
                        MeasurementType: 1
                    }

                    return resolve(item);
                }
                return resolve('Unable to add ingredient!');
            }).fail(function () {
                return reject('Unable to add ingredient!');
            });
        });
    }

    deleteIngredient(id) {
        let self = this;
        return new Promise(function (resolve, reject) {
            $.post(`${self.endpoints.recipes}/delete-ingredient`, { id }, function (result) {
                if (result) {
                    return resolve(result);
                }
                return resolve('Unable to delete ingredient!');
            }).fail(function () {
                return reject('Unable to delete ingredient!');
            });
        });
    }

    deleteRecipe(id) {
        let self = this;
        return new Promise(function (resolve, reject) {
            $.get(`${self.endpoints.recipes}/delete-recipe`, { id }, function (result) {
                if (result) {
                    return resolve(result);
                }
                return resolve();
            }).fail(function () {
                return reject('Unable to delete the recipe!');
            });
        });
    }

    getMeasurements() {
        let self = this;
        return new Promise(function (resolve, reject) {
            $.get(`${self.endpoints.recipes}/get-measurements`, function (result) {
                return resolve(result);
            }).fail(function () {
                return reject('Unable to get Measurements.');
            });
        });
    }

    getRecipe(id) {
        let self = this;
        return new Promise(function (resolve, reject) {
            $.get(`${self.endpoints.recipes}/get-recipe`, { id }, function (result) {
                if (result) {
                    return resolve(result);
                }
                return resolve();
            }).fail(function () {
                return reject('Unable to load this recipe!');
            });
        });
    }

    getRecipes() {
        let self = this;
        return new Promise(function (resolve, reject) {
            $.get(`${self.endpoints.recipes}/recipesList`, function (result) {
                if (result) {
                    return resolve(result);
                }
                return resolve([]);
            }).fail(function () {
                return reject('Unable to load recipes!');
            });
        });
    }

    createRecipe(title, description, notes, createdBy) {
        let self = this;
        return new Promise(function (resolve, reject) {
            $.post(`${self.endpoints.recipes}/add-recipe`, {
                Title: title,
                Description: description,
                Notes: notes,
                CreatedBy: createdBy,
                Ingredients: ingredients                
            }, function (result) {
                    if (result.success) {
                        return resolve(result);
                    }
                    return reject("Unable to create recipe! Make sure you didn't submit any required fields with just whitespace.");
            }).fail(function () {
                return reject("Unable to create recipe! Make sure you didn't submit any required fields with just whitespace.");
            });
        });
    }

    editRecipe(id, title, description, notes, createdBy) {
        let self = this;

        return new Promise(function (resolve, reject) {
            $.post(`${self.endpoints.recipes}/edit-recipe`, {
                id,
                title,
                description,
                notes,
                createdBy
            }, function (result) {
                if (result.success) {
                    return resolve(result);
                }
                return reject("Unable to properly edit field in recipe.")
            }).fail(function () {
                return reject("Unable to properly edit field in recipe.");
            });
        });
    }

    editIngredient(ingredients) {
        let self = this;

        return new Promise(function (resolve, reject) {
            $.post(`${self.endpoints.recipes}/edit-ingredient`, {
                ingredients,
            }, function (result) {
                if (result.success) {
                    return resolve(result);
                }
                return reject("Unable to properly edit field in recipe.")
            }).fail(function () {
                return reject("Unable to properly edit field in recipe.");
            });
        });
    }
}