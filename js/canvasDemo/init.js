VL.namespace('VL.canvasDemo.init');

VL.canvasDemo.init = (function () {

    var canvasEl,
        ctx,
        canvasElHolder,
        canvasWidth = 300,
        canvasHeight = 300,

        animationID,

        colorR = 0,
        colorREnd = false,
        colorG = 0,
        colorB = 0,

        init = function () {
            console.log('init init');

            //requestAnimFrame shiv
            window.requestAnimFrame = (function(){
                return  window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    function( callback ){
                        window.setTimeout(callback, 1000 / 60);
                    };
            }());

            window.cancelAnimFrame = (function() {
                return window.cancelAnimationFrame ||
                        window.webkitCancelAnimationFrame ||
                        window.mozCancelAnimationFrame;
            }());


            canvasElHolder = document.getElementById('canvasDemoHolder');
            canvasEl = document.getElementById('canvasDemo');

            setCanvasSizeInit();

            ctx = canvasEl.getContext('2d');
        },

            setCanvasSizeInit = function () {
                canvasWidth = canvasElHolder.offsetWidth;
                canvasEl.width = canvasWidth;
                canvasEl.height = canvasHeight;
            },

            setCanvasSizeCss = function () {
                canvasWidth = canvasElHolder.offsetWidth;
                canvasEl.style.width = canvasWidth + 'px';
                canvasEl.style.height = canvasHeight + 'px';
            },

        paintBlack = function () {
            ctx.fillStyle = '#000';
            ctx.rect(0, 0, canvasWidth, canvasHeight);
            ctx.fill();
        },

        drawLogo = function () {
            //get image
            var logo = document.getElementById('supermanLogo');
            //ctx.drawImage(logo, 0, 0, 100, 80);
            ctx.drawImage(logo, canvasWidth/2-50, canvasHeight/2-40, 100, 80);
        },

        drawRandomBgLogo = function () {

            //make random bg color

            var color = makeRandomRGB();
            console.log(color);

            ctx.fillStyle = color;
            ctx.rect(0, 0, canvasWidth, canvasHeight);
            ctx.fill();

            var logo = document.getElementById('supermanLogo');
            ctx.drawImage(logo, canvasWidth/2-50, canvasHeight/2-40, 100, 80);

            animationID = requestAnimFrame(drawRandomBgLogo);
        },

        drawNicelyBgLogo = function () {

            if (colorR === 100) {
                colorREnd = true;
            }

            if (colorR === 0 ) {
                colorREnd = false;
            }

            if (colorREnd) {
                colorR -= 1;
            } else {
                colorR += 1;
            }

            ctx.fillStyle = 'rgb('+colorR+','+colorG+','+colorB+')';
            ctx.rect(0, 0, canvasWidth, canvasHeight);
            ctx.fill();

            var logo = document.getElementById('supermanLogo');
            ctx.drawImage(logo, canvasWidth/2-50, canvasHeight/2-40, 100, 80);

            animationID = requestAnimationFrame(drawNicelyBgLogo);
        },

        stopAnimation = function () {
            cancelAnimFrame(animationID);
        },


        makeRandomRGB = function () {
            var r = Math.floor(Math.random() * 255 + 1);
            var g = Math.floor(Math.random() * 255 + 1);
            var b = Math.floor(Math.random() * 255 + 1);
            var colorString = 'rgb('+r+','+g+','+b+')';

            return colorString;
        };



    return {
        init: init,
        setCanvasSizeCss: setCanvasSizeCss,
        paintBlack: paintBlack,
        drawLogo: drawLogo,
        drawRandomBgLogo: drawRandomBgLogo,
        drawNicelyBgLogo: drawNicelyBgLogo,
        stopAnimation: stopAnimation
    };

}());