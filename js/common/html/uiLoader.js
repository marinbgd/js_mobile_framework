VL.namespace('VL.html.uiLoader');

VL.html.uiLoader = (function () {
    
    var uiLoaderElement,
        
        init = function () {
            uiLoaderElement = document.getElementById('uiLoader');
        },
        
        show = function () {
            if (uiLoaderElement.className === 'hidden') {
                uiLoaderElement.className = '';
            }
        },
        
        hide = function () {
            if (uiLoaderElement.className.length === 0) {
                uiLoaderElement.className = 'hidden';
            }
        };
    
    return {
        
        init: init,
        show: show,
        hide: hide
        
    };

}());