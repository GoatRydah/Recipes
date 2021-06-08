// add app props to routes
routes.forEach(function (route) {
    route.props = Object.assign({
        appOpts
    });
});

const router = new VueRouter({ routes });