import { appname } from './config';

angular.module(appname, []);

angular.element(document).ready(() => {
    angular.bootstrap(document, [appname]);
});
