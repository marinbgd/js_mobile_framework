VL.namespace('VL.app');

VL.app = (function () {

    'use strict';

    var storedControllers = [],
        storedJSControllers = [],

        initApp = function () {
            console.log('app init started');

            VL.page.init();

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
            //should trigger destroy method of the current page controller
            getControllerFromPageAndExec(event.pageName, 'destroyPage');
        },

        onPageLoadSuccess = function (event) {
            getControllerFromPageAndExec(event.pageName, 'beforeDraw');
        },

        onPageDrawFinish = function (event) {
            getControllerFromPageAndExec(event.pageName, 'afterDraw');
        },

        onPageLoadFail = function (event) {
            console.log('onPageLoadFail');
            VL.html.uiLoader.hide();
        },

        getJSFile = function (pathToJS) {

            if(typeof pathToJS === "undefined" || !(pathToJS) ) {
                return undefined;
            }

            //get dynamically controller
            var scriptUrl = VL.globals.getBaseUrl() + 'js/' + pathToJS;
            var success = false;

            $.ajax({
                url: scriptUrl,
                async: false,
                type: 'get',
                crossDomain: false,
                dataType: 'script',
                cache: false,
                beforeSend: function () {
                    //VL.html.uiLoader.show();
                },
                success: function () {
                    success = true;
                },
                error: function () {
                    success = false;
                },
                complete: function () {
                    //VL.html.uiLoader.hide();
                }

            });

            return success;
        },

        getControllerFromPageAndExec = function (pageName, successExecFunctionName) {

            if(typeof pageName === "undefined" || !(pageName) ) {
                return undefined;
            }

            if(typeof successExecFunctionName === "undefined" || !(successExecFunctionName) ) {
                return undefined;
            }

            //get controller from cache and execute function if exists
            var storedController = storedControllers[pageName];
            if(storedController) {
                if (storedController[successExecFunctionName] && typeof storedController[successExecFunctionName] === 'function') {
                    storedController[successExecFunctionName]();
                    return;
                }
            }


            //controller does not exist in cache, get it via ajax
            var scriptUrl = VL.globals.getBaseUrl() + 'js/controllers/' + pageName + '.js';

            $.ajax({
                url: scriptUrl,
                type: 'get',
                async: false,
                crossDomain: false,
                dataType: 'script',
                cache: false,
                beforeSend: function () {
                    VL.html.uiLoader.show();
                },
                success: function () {
                    var controller = VL.controllers[pageName];
                    storedControllers[pageName] = controller;

                    //exec success callback function
                    if (controller[successExecFunctionName] && typeof controller[successExecFunctionName] === 'function') {
                        controller[successExecFunctionName]();
                    }
                },
                error: function () {
                    console.log('controller load fail');
                },
                complete: function () {
                    VL.html.uiLoader.hide();
                }

            });

        };


    //start the app
    $(document).ready(initApp);

    return {
        getJSFile: getJSFile
    };

}());
