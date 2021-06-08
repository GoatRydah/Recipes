//The create recipe component's js code
const CreateRecipe = {
    template: '#create_recipe_template',
    props: [
        'appOpts',
    ],
    data: function () {

        return {
            recipeWizard,
            recipe: null,
            count: 0,
            measurements: {},
            measurementString: ``,
            invalidCreateForm: true,
            createdBy: '',
            recipeTitle: '',
            ingredients: [],
            instructions: '',
            extraNotes: ''
        };
    },
    watch: {
        'createdBy': function (after, before) {
            if (!after) {
                $('#nameAsterisk').show();
                this.invalidCreateForm = true;
                return;
            }

            $('#nameAsterisk').hide();
            this.checkInvalid();
        },
        'recipeTitle': function (after, before) {
            if (!after) {
                $('#recipeTitleAsterisk').show();
                this.invalidCreateForm = true;
                return;
            }

            $('#recipeTitleAsterisk').hide();
            this.checkInvalid();;
        },
        'instructions': function (after, before) {
            if (!after) {
                $('#instructionsAsterisk').show();
                this.invalidCreateForm = true;
                return;
            }

            $('#instructionsAsterisk').hide();
            this.checkInvalid();
        }
    },
    created: function () {

    },
    methods: {
        addIngredientClick: function () {

            $('#ingredientAsterisk').hide();

            if (this.count > 99) {
                alert("Can't have more than 100 ingredients. Sorry.");
                return;
            }

            this.count += 1;

            document.getElementById(`ingredient${this.count}`).style.display = 'block';
            this.ingredients.push({ id: this.count, IngredientName: '', Quantity: 0, MeasurementType: '' });
            this.checkInvalid();
        },
        updateIngredientName: function (e) {
            let id = e.target.id.replace('ingredientName', '');
            this.ingredients.find(el => el.id == id).IngredientName = e.target.value;
            this.checkInvalid();
        },
        updateIngredientQuantity: function (e) {
            let id = e.target.id.replace('ingredientQuantity', '');
            this.ingredients.find(el => el.id == id).Quantity = e.target.value;
            this.checkInvalid();
        },
        updateIngredientUnit: function (e) {
            let id = e.target.id.replace('ingredientUnit', '');
            this.ingredients.find(el => el.id == id).MeasurementType = e.target.value;
            this.checkInvalid();
        },
        removeIngredient: function (id) {

            this.ingredients = this.ingredients.filter(function (p) {
                return id !== p.id;
            });

            document.getElementById(`ingredient${id}`).style.display = 'none';
            this.checkInvalid();
        },
        checkInvalid() {
            if (this.ingredients.length == 0) {
                this.invalidCreateForm = true;
                return;
            }

            let self = this;
            let remainingIngredientFields = 0;

            this.ingredients.forEach(function (value, index) {

                if (!value.IngredientName) {
                    remainingIngredientFields++;
                    $(`#ingredientNameAsterisk${value.id}`).show();
                } else {
                    $(`#ingredientNameAsterisk${value.id}`).hide();
                }

                if (!value.Quantity) {
                    remainingIngredientFields++;
                    $(`#quantityAsterisk${value.id}`).show();
                } else {
                    $(`#quantityAsterisk${value.id}`).hide();
                }

                if (!value.MeasurementType) {
                    remainingIngredientFields++;
                    $(`#measurementTypeAsterisk${value.id}`).show();
                } else {
                    $(`#measurementTypeAsterisk${value.id}`).hide();
                }

                if (!value.IngredientName || !value.Quantity || !value.MeasurementType) {
                    self.invalidCreateForm = true;
                } else {
                    self.invalidCreateForm = false;
                }
            });

            if (remainingIngredientFields > 0) {
                $('#remainingIngredientFields').show();
            } else {
                $('#remainingIngredientFields').hide();
            }

            if (self.invalidCreateForm == true) {
                this.invalidCreateForm = true;
                return;
            }

            if (this.createdBy && this.recipeTitle && this.instructions) {
                this.invalidCreateForm = false;
                return;
            }

            this.invalidCreateForm = true;
        },
        createRecipe() {
            let self = this;
            this.recipeWizard.createRecipe(this.recipeTitle, this.instructions, this.extraNotes, this.createdBy, this.ingredients).then(function (data) {
                window.location.href = '/recipe-wizard/#/recipesList';
            }, function (message) {
                alert(message);
            });
        }
    },
    computed: {

    }
};

//register route
routes.push({ path: '/createRecipe', component: CreateRecipe, meta: { title: `Create Recipe` } });