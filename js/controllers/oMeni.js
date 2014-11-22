VL.namespace('VL.controllers.oMeni');

VL.controllers.oMeni = (function () {
    
    return {
        
        beforeDraw: function () {
            console.log('VL.controllers.oMeni beforeDraw');
        },
        
        afterDraw: function () {
            console.log('VL.controllers.oMeni afterDraw');
        },
        
        destroyPage: function () {
            console.log('VL.controllers.oMeni destroyPage');
        }
        
    };
    
}());