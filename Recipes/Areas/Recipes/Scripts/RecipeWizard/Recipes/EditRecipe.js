// The edit recipe component's js code.
const EditRecipe = {
    template: '#edit_recipe_template',
    props: [
        'appOpts'
    ],
    data: function () {
        return {
            recipeWizard,
            id: 0,
            recipe: {}
        };
    },
    created: function () {
        let id = this.$route.params.id;
        this.id = id;
        let self = this;

        this.recipeWizard.getRecipe(id).then(function (data) {
            self.recipe = data.data || null;

        }, function (message) {
            alert(message);
        });

    },
    methods: {
        addIngredient: async function () {
            let item = await this.recipeWizard.addIngredient(this.recipe.Id);

            this.recipe.Ingredients.push(item);
        },
        getMeasurementType: function (data) {
            switch (data) {
                case 'Cups':
                    return 1;
                case 'Tablespoons':
                    return 2;
                case 'Teaspoons':
                    return 3;
                case 'Pounds':
                    return 4;
                case 'Ounces':
                    return 5;
                default:
                    return 1;
            }
        },
        doneEditing: function () {
            window.location.href = '/recipe-wizard/#/recipesList';
        },
        editRecipe: debounce(function () {
            this.recipeWizard.editRecipe(this.recipe.Id, this.recipe.Title, this.recipe.Description, this.recipe.Notes, this.recipe.CreatedBy);
        }, 1000),
        editIngredient: debounce(function (id, title, quantity, type) {
            this.recipeWizard.editIngredient(id, title, quantity, type);
        }),
        deleteIngredient: function (ingredientId) {
            if (confirm('Are you sure you want to delete this ingredient?')) {
                this.recipeWizard.deleteIngredient(ingredientId);

                this.recipe.Ingredients = this.recipe.Ingredients.filter(function (p) {
                    return p.Id !== ingredientId;
                });
            }
        }
    },
    computed: {
        recipeData: function () {

        }
    },
    watch: {
        "recipe.Title": function (after, before) {
            if (after === before || !after || !before)
                return;

            this.editRecipe();
        },
        "recipe.Description": function (after, before) {
            if (after === before || !after || !before)
                return;

            this.editRecipe();
        },
        "recipe.Notes": function (after, before) {
            if (after === before || !after || !before)
                return;

            this.editRecipe();
        },
        "recipe.CreatedBy": function (after, before) {
            if (after === before || !after || !before)
                return;

            this.editRecipe();
        },
        "recipe.Ingredients": {
            handler: function (after, before) {
                console.log(after);
                console.log(before);

                this.editIngredient(this.recipe.Ingredients);
            }, deep: true
        },
    }
};

//register route
routes.push({ path: '/editRecipe/:id', component: EditRecipe, meta: { title: `Edit Recipe` } });