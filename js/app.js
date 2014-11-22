VL.namespace('VL.app');

VL.app = (function () {
    
    var storedControllers = [],
    
        initApp = function () {
            console.log('app init started');
        

            VL.page.setBaseUrl( 'http://localhost/test/' );
            VL.page.setListenerOnAnchors();
            
            setPageEventListeners();
            
            //init uiLoader
            VL.html.uiLoader.init();
            
            //load first page
            VL.page.change( 'home.html' );
        
        },
        
        setPageEventListeners = function () {
            
            $(document).on( VL.page.PAGE_BEFORE_LOAD, onPageBeforeLoad);
            $(document).on( VL.page.PAGE_LOAD_SUCCESS, onPageLoadSuccess);
            $(document).on( VL.page.PAGE_DRAW_FINISHED, onPageDrawFinish);
            $(document).on( VL.page.PAGE_LOAD_FAIL, onPageLoadFail);
            
        },
        
        onPageBeforeLoad = function (event) {
            console.log('onPageBeforeLoad');
            
            //should trigger destroy method of the current page controller
            var controller = getControllerFromPage(event.pageName);
            
            if (controller && typeof controller.destroyPage === 'function') {
                controller.destroyPage();
            }
        },
        
        onPageLoadSuccess = function (event) {
            console.log('onPageLoadSuccess');
            
            var controller = getControllerFromPage(event.pageName);
            
            if (controller && typeof controller.beforeDraw === 'function') {
                controller.beforeDraw();
            }
        },
        
        onPageDrawFinish = function (event) {
            console.log('onPageDrawFinish');
            
            var controller = getControllerFromPage(event.pageName);
            
            if (controller && typeof controller.afterDraw === 'function') {
                controller.afterDraw();
            }
        },
    
        onPageLoadFail = function (event) {
            console.log('onPageLoadFail');
        },
        
        getControllerFromPage = function (pageName) {
            
            if(typeof pageName === "undefined" || !(pageName) ) {
                return undefined;
            }
            
            var storedController = storedControllers[pageName];
            if(storedController) {
                return storedController;
            }

            
            //get dynamically controller
            var scriptUrl = VL.page.getBaseUrl() + 'js/controllers/' + pageName + '.js';
            
            /*$.getScript( scriptUrl )
                .done( function( script, textStatus ) {
                    console.log(111);
                    var controller = VL.controllers[pageName];
                    storedControllers[pageName] = controller;
                    return controller;
                })
                .fail( function( jqxhr, settings, exception ) {
                    console.log('controller load fail');
                });*/
            
            $.ajax({
                url: scriptUrl,
                async: false,
                crossDomain: false,
                dataType: 'script',
                cache: false,
                beforeSend: function () {
                    VL.html.uiLoader.show();
                },
                success: function () {
                    console.log(111);
                    var controller = VL.controllers[pageName];
                    storedControllers[pageName] = controller;
                    return controller;
                },
                error: function () {
                    console.log('controller load fail');
                    return null;
                },
                complete: function () {
                    VL.html.uiLoader.hide();
                }
                
            });
            
        };
    
    
    
    //start the app
    $(document).ready(initApp);
    
}());
