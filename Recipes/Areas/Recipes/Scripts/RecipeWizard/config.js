const baseUrl = '/recipe-wizard';

const appOpts = {
    baseUrl,
    endpoints: Object.freeze({
        recipes: `${baseUrl}/recipes`,
    }),
    title: ''
};

// event bus
const bus = new Vue();

// Recipe Wizard Instance
const recipeWizard = new RecipeWizard(appOpts.endpoints);

// routes
const routes = [{ path: '/', redirect: '/recipesList' }];