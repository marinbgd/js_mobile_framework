VL.namespace('VL.page');

VL.page = (function () {
    
    var PAGE_BEFORE_LOAD = 'VL.page.before.load.event',
        PAGE_LOAD_SUCCESS = 'VL.page.load.success.event',
        PAGE_LOAD_FAIL = 'VL.page.load.fail.event',
        PAGE_DRAW_FINISHED = 'VL.page.draw.finished.event',
        
        baseUrl = null,
        viewsFolder = 'view',
        
        currentRequestedPage = null,
        
        pageHtmlContainer = $('#content'),
        
        setListenerOnAnchors = function () {
            $(document).on('click', 'a', anchorClickEventHandler);
        },
        
            anchorClickEventHandler = function (event) {
                event.preventDefault();
                event.stopPropagation();
                
                var clickedElement = $(event.currentTarget);
                
                var href = clickedElement.attr('href');
                
                if (href.length > 0 && href !== '#') {
                    change(href);
                }
                
            },
    
        change = function ( pageUrl ) {
            
            //this event should trigger current page controller destroy method
            var event = $.Event(PAGE_BEFORE_LOAD, { pageName: currentRequestedPage} );
            $(document).trigger(event);
            
            
            var absoluteUrl = baseUrl + viewsFolder + '/' + pageUrl;
            var pageName = pageUrl.replace('.html', '');
            currentRequestedPage = pageName;
            

            var jqxhr = $.get( absoluteUrl, function( response ) {
                changePageSuccessHandler(response);
            })
                .done(function() {
                    console.log( "changePage second success" );
                })
                .fail(function() {
                    var event = $.Event(PAGE_LOAD_FAIL);
                    $(document).trigger(event);
                });

            },
        
        changePageSuccessHandler = function (response) {
            var event;
            try {
                
                event = $.Event(PAGE_LOAD_SUCCESS, { pageName: currentRequestedPage });
                $(document).trigger(event);
                
                pageHtmlContainer.html(response);
                
                event = $.Event(PAGE_DRAW_FINISHED, { pageName: currentRequestedPage });
                $(document).trigger(event);
                
                //change window location for history implementation
                window.location.href = baseUrl + '#' + viewsFolder + '/' + currentRequestedPage;
                
            } catch (error) {
                console.log(error);
            }
            
        },
        
        setBaseUrl = function (url) {
            baseUrl = url;
        },
        
        getBaseUrl = function () {
            return baseUrl;
        };
    
    
    return {
        
        PAGE_BEFORE_LOAD: PAGE_BEFORE_LOAD,
        PAGE_LOAD_SUCCESS: PAGE_LOAD_SUCCESS,
        PAGE_LOAD_FAIL: PAGE_LOAD_FAIL,
        PAGE_DRAW_FINISHED: PAGE_DRAW_FINISHED,
        
        change: change,
        setBaseUrl: setBaseUrl,
        getBaseUrl: getBaseUrl,
        setListenerOnAnchors: setListenerOnAnchors
    };
    
}());