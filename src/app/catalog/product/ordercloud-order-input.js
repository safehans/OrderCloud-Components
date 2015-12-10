angular.module('orderCloud')

    .controller('OrderInputCtrl', OrderInputController)
    .directive('ordercloudOrderInput', OrderCloudOrderInputDirective)

;

function OrderCloudOrderInputDirective() {
    return {
        restrict: 'E',
        scope: {
            product: '='
        },
        templateUrl: 'catalog/product/templates/order-input.tpl.html',
        controller: 'OrderInputCtrl',
        controllerAs: 'orderInput'
    }
}

function OrderInputController() {

}
