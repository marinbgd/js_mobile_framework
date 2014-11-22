var app = {

    storedControllers: {},
    counter:0,
    defaultURL: 'http://localhost/',
    watchLiveDraws : 'http://vstreet.rtsp.fms.visionip.tv/live/vstreet-liveevent-generic-livetwo-25f-4x3-SDq',
    watchLiveDraws_ios: 'http://vstreet.ashttp9.visionip.tv/live/vstreet-liveevent-generic-livetwo-25f-4x3-SDq/playlist.m3u8',
    facebookPageLink: 'https://www.facebook.com/biggamesngr',
    twitterPageLink: 'https://twitter.com/Biggamesng',
    vodstreetPageLink: 'http://www.vodstreet.com',
    youtubePageLink: 'https://www.youtube.com/channel/UC-xCSuCLeKPJ9QbPZ2wdzng/videos',

    lotteryGameBetslip: null,
    sportsBettingGameBetslip: null,

    betslipHeaderButton: null,
    buildPlatform : 'all',
    localStorage: SL.models.LocalStorage,

    data: {
        redirectOnLoginUri: "",
        fiveNinetyGameType: null,
        previousPages: [],
        backButtonPressed: false,
        smsPay: {
            amount: 0,
            message: ""
        }
    },

    currentPage: null,

    nativeDatePicker: false,
    ajaxLoadingImg: null,


    // Application Constructor
    initialize: function() {
        this.betSlipController = SL.controllers.BetSlip;
        this.placeBetController = SL.controllers.PlaceBet;
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onBackButtonClickHandler: function(ev) {

        ev.preventDefault();

        var historyLength =  app.data.previousPages.length;

        // no history available
        if(historyLength < 2) {
            return;
        }

        var lastPage = app.data.previousPages[historyLength-2];

        var pageUrl = SL.utilities.uri.getPageUrlFromAbsoluteUrl(lastPage);
        var currentPageUrl = SL.utilities.uri.getPageUrlFromAbsoluteUrl(window.location.href);

        // you are on the right page already
        if(pageUrl === currentPageUrl) {
            return;
        }

        app.data.previousPages.pop();
        app.data.backButtonPressed = true;

        $.mobile.changePage(pageUrl);
    },


    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {

        document.addEventListener('backbutton', app.onBackButtonClickHandler, false);

        if (typeof $.mobile !== 'undefined') {
            $.mobile.defaultPageTransition   = 'none';
            $.mobile.defaultDialogTransition = 'none';
            $.mobile.buttonMarkup.hoverDelay = 2;
            $.mobile.pushStateEnabled = false;
            $.mobile.phonegapNavigationEnabled = true;
            $.mobile.allowCrossDomainPages = true;
        }
        app.setBaseUrl( $('base').attr('href') );

        $(document).on('pagebeforecreate', '[data-role="page"]', app.onPageBeforeCreate);
        $(document).on('pageinit', '[data-role="page"]', app.onPageInit);
        $(document).on('pagebeforeshow', '[data-role="page"]', app.onPageBeforeShow);
        $(document).on('pagebeforehide', '[data-role="page"]', app.onPageBeforeHide);
        $(document).on('pageremove', '[data-role="page"]', app.onPageRemove);
        $(document).on('pageshow', '[data-role="page"]', app.onPageShow);

        //app.onTestRun();

        app.sportsBettingGameBetslip = $('#sports-betting-game-betslip');
        app.lotteryGameBetslip = $('#lottery-game-betslip');
        app.sixFortyNinePlaceBet = $('#six-forty-nine-game-placebet');

        $('body').prepend( [ app.sportsBettingGameBetslip, app.lotteryGameBetslip, app.sixFortyNinePlaceBet ] );

        //hide footer on every input
		$(document).on('focus', 'input[type="text"], input[type="number"], input[type="date"], input[type="password"]', SL.utilities.html.footer.hide );
		$(document).on('blur', 'input[type="text"], input[type="number"], input[type="date"], input[type="password"]', SL.utilities.html.footer.show );

        //detect if browser has native datepicker and set parameter
        app.nativeDatePicker = app.detectDatepicker();

        //trigger detectHeights func on resize & orientation change
       	$(window).on("resize orientationchange", $.throttle( 200, app.fixHeaderFooter ) );

        //make and add element for ui loading to body
        app.ajaxLoadingImg = $('<section>', { id: 'ajax-loading-icon' });
        $('body').prepend(app.ajaxLoadingImg);



        SL.controllers.Application.init();

        // check if user has already accepted disclaimer
        if (app.localStorage.get("disclaimerAccepted")) {
            $.mobile.changePage("views/home-page.html");
        } else {
            $.mobile.changePage("views/disclaimer.html");
        }


    },

    onTestRun: function () {

        $(document).on('startsession', function(ev){
            //console.log("Hello Event startsession");
        });

        SL.models.api.Session.start('64111111');

        //console.log("end: " + new Date().getTime() );
    },

    onPageBeforeCreate: function(ev) {

        var page = $(ev.target);

        var controller = app.getControllerFromPage(page);

        app.doAutoLayout(page);
        app.initController(page);

        if( controller &&  typeof controller.beforeCreate === 'function') {
            controller.beforeCreate(page);
        }
    },

    /**
     * Start the controller. This is only
     * executed once for the life time of screen.
     **/
    onPageInit: function(ev) {

        var page = $(ev.target);
        var controller = app.getControllerFromPage(page);

        if( controller &&  typeof controller.init === 'function') {
            controller.init(page);
        }
    },

    /**
     * Do final touch ups to the page before it is hidden
     * if controller implements beforeHide method.
     */
    onPageBeforeHide: function(ev){

        var page = $(ev.target);
            page.find("#back-button").off("click", app.onBackButtonClickHandler);

        var controller = app.getControllerFromPage(page);

        // check if current screen has controller and if controller implements beforeHide method
        if( controller &&  typeof controller.stopPage === 'function') {
            controller.stopPage(page);
        }
    },

    /**
     * Do final touch ups to the page before it is shown
     * if controller implements beforeShow method.
     */
    onPageBeforeShow: function(ev) {

        var page = $(ev.target);

        var controller = app.getControllerFromPage(page);
        app.currentPage = page;

        // check if current screen has controller and if controller implements beforeShow method
        if( controller &&  typeof controller.startPage === 'function') {
            controller.startPage(page);
        }

        //if no native datepicker, set parameters for jQueryUI datepicker
        if (!app.nativeDatePicker){
        	app.setDatepickerUIParams();
        }

        app.fixHeaderFooter();

        //display HD or SD images
        window.picturefill();

        $(window).on("resize orientationchange", $.throttle( 200, window.picturefill ) );
    },

    onPageRemove: function(ev) {

        var page = $(ev.target);
        var destructPolicy = page.attr('destruct-policy');

        // just hide the screen
        if( destructPolicy === "hide" ) {
            ev.preventDefault();
            return;
        }

        var controller = app.getControllerFromPage(page);

         // check if controller exists
        if(typeof controller === "undefined") {
         //  @TO-DO Try to implement generic controller
         //console.log("Skiping destruct. Current screen does not have controller. Screen id: " + page.attr('id'));
        }
        else {

            // call page destructor
            if(typeof controller.destruct === 'function') {
                controller.destruct(page);
            }
        }
    },

    onPageShow: function(ev) {

        var page = $(ev.target);
            page.find("#back-button").on("click", app.onBackButtonClickHandler);

        if(app.data.backButtonPressed === true) {
            app.data.backButtonPressed = false;
        }
        else {
            if(page.attr('track-history') !== 'false') {
                app.data.previousPages.push(window.location.href);
            }
        }
    },

    doAutoLayout: function(page) {
        SL.utilities.html.header.add( page );
        SL.utilities.html.footer.add( page );
    },

    fixHeaderFooter : function(){

    	/* detect size of header and footer, compare to full height of device; if needed, set class on body for CSS restyling */
        var viewportHeight=0, footerHeight = 56, headerHeight = 66, combinedHeight = 116, dpr=1,
	    detectHeights = function () {
			if(window.devicePixelRatio !== undefined){
				dpr = window.devicePixelRatio;
			}

			viewportHeight = window.innerHeight  * dpr;
			footerHeight = footerHeight * dpr;
			headerHeight = headerHeight * dpr;
			combinedHeight = headerHeight + footerHeight;

	        //if combined height is big relative to the viewport height, add class to body
	        if ( (viewportHeight/combinedHeight) < 3 ){
	        	$('body').addClass('small_viewport');
	        } else {
	        	$('body').removeClass('small_viewport');
	        }
        }();

    },

    initController: function(page) {

       var controller = app.getControllerFromPage(page);

        // check if controller exists
        if(typeof controller === "undefined") {
         //  @TO-DO Try to implement generic controller
            //console.log("Controller not found for initialization for screen: " + page.attr('id'));
        }
    },

    getControllerFromPage: function(page) {

        var pageId = page.attr('id');
        var storedController = this.storedControllers[pageId];

        if(storedController) {
            return storedController;
        }

        if(typeof pageId === "undefined") {
            return "undefined";
        }

        var parts = pageId.split('-');
        var screenIdentity = parts.slice(0,1)[0];

        var controllerName = screenIdentity.charAt(0).toUpperCase() + screenIdentity.slice(1);
        var controller = SL.controllers[controllerName];

        this.storedControllers[pageId] = controller;

        return controller;
    },

    setBaseUrl: function (url) {
        var baseUrl = SL.utilities.uri.removeLastSegment(url);
        SL.globals.url.setBaseUrl(baseUrl);
    },

    detectDatepicker: function(){
    	if ( Modernizr.inputtypes.date ){
    		return true;
    	} else {
			//add jqueryUI datepicker library
    		var s = document.createElement('script');
		    s.type = 'text/javascript';
		    s.async = true;
		    s.src = 'framework/jquery-ui-1.10.4.DatePicker.min.js';
		    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(s);

    		return false;
    	}
    },

    setDatepickerUIParams: function(){
    	//check if exist any date element before setting datepicker
    	var dateInputs = $('input[type=date]');
    	if ( dateInputs.length > 0 ){
			dateInputs.datepicker({
		    	dateFormat: 'yy-mm-dd',
		    	constrainInput: true,
		    	hideIfNoPrevNext: true,
		    	defaultDate: 0,
		    	showAnim: '',

		    	beforeShow: function(input, inst) {
					var viewportHeight = window.innerHeight;
					var top = window.pageYOffset;

					//position according to scroll
					inst.dpDiv.css({ marginTop: top+'px' });

					if ( viewportHeight < 320 ){
						inst.dpDiv.addClass('noheaderfooter');
						$('.ui-header, .ui-footer').hide();
					}
		    	},

		    	onClose: function(input, inst){
		    		inst.dpDiv.removeClass('noheaderfooter');
					$('.ui-header, .ui-footer').show();
		    	}

		    }).on('focus', function(){this.blur();});
		    //added blur() for hiding virtual keyboard
	   }
    }

};

app.initialize();
