import { appname, defaultRoute } from './config';

angular.module(appname, [])
    .config(defaultRoute);

angular.element(document).ready(() => {
    angular.bootstrap(document, [appname]);
});
