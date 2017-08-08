import { appName, apiUrl } from '~/config';
import { appState } from '~/app/states';

angular.module(appName, [])
    .config(appState);

angular.element(document).ready(() => {
    angular.bootstrap(document, [appName]);
});
