VL.namespace('VL.controllers.home');

VL.controllers.home = (function () {
    
    return {
        
        beforeDraw: function () {
            console.log('VL.controllers.home beforeDraw');
        },
        
        afterDraw: function () {
            console.log('VL.controllers.home afterDraw');
        },
        
        destroyPage: function () {
            console.log('VL.controllers.home destroyPage');
        }
        
    };
    
}());