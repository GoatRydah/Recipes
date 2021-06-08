//the recipe list component's js code.
const RecipeList = {
    template: '#recipe_list_template',
    props: [
        'appOpts'
    ],
    data: function () {
        return {
            recipeWizard,
            recipes: null
        };
    },
    created: function () {
        let self = this;
        this.recipeWizard.getRecipes(

        ).then(function (data) {
            self.recipes = data.data || [];
        }, function (message) {
            alert('Unable to load recipes.');
            self.recipes = [];
        });
    },
    methods: {
        confirmDelete: function (id) {
            let self = this;
            let choice = confirm("Are you sure you want to delete this recipe?");
            if (choice) {
                this.recipeWizard.deleteRecipe(id).then(function (data) {
                    self.recipes.splice(self.recipes.indexOf(id), 1);
                }, function (message) {
                    alert(message);
                });
            }
        },
        getMeasurementType: function (data) {
            switch (data) {
                case 1:
                    return 'Cup(s)';
                case 2:
                    return 'Tbsp';
                case 3:
                    return 'tsp';
                case 4:
                    return 'lb(s)';
                case 5:
                    return 'oz';
                default:
                    return 'Units';
            }
        },
    },
    computed: {

    }
};

//register route
routes.push({ path: '/recipesList', component: RecipeList, meta: { title: `Recipes` } });