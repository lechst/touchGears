Controller = function (){

    this.model = new Model();

    this.view = new View(this.model);

    this.device = {};

    this.finger = [0,0];
    this.fingerS = [[0,0],[0,0]];

    this.init = function(){
        this.device = this.checkDevice();

        if(this.device.iphone||this.device.ipad||this.device.ipod) {
            this.bindTouchEvents();
        } else {
            this.bindMouseEvents();
        }

    };

    this.bindMouseEvents = function() {
        $('body')[0].addEventListener('click',this.clickEvent());
    };

    this.bindTouchEvents = function() {
        $('body')[0].addEventListener('touchstart',this.touchStart(),false);
        $('body')[0].addEventListener('touchmove',this.touchMove(),false);
        $('body')[0].addEventListener('touchend',this.touchEnd(),false);
        //$('body')[0].addEventListener('touchcancel',this.touchCancel(),false);
    };

    this.bindGestureEvents = function() {
        $('body')[0].addEventListener('gesturestart',this.gestureStart(),false);
        $('body')[0].addEventListener('gesturechange',this.gestureChange(),false);
        $('body')[0].addEventListener('gestureend',this.gestureEnd(),false);
    };

    this.touchStart = function(){
        var that = this;
        return function(e){
            e.preventDefault();

            var length=0;
            var realTouches = [];

            for(var i=0; i< e.touches.length; i++){
                if(e.touches[i]!=undefined){
                    length = length + 1;
                    realTouches.push(e.touches[i]);
                }
            }

            if(length==1) {
                that.finger[0] = realTouches[0].pageX;
                that.finger[1] = realTouches[0].pageY;
            }
            else if(length==2) {
                that.fingerS[0][0] = realTouches[0].pageX;
                that.fingerS[0][1] = realTouches[0].pageY;
                that.fingerS[1][0] = realTouches[1].pageX;
                that.fingerS[1][1] = realTouches[1].pageY;
            }

        }
    };

    this.touchMove = function(){
        var that = this;
        return function(e){
            e.preventDefault();

            var length=0;
            var realTouches = [];

            for(var i=0; i< e.touches.length; i++){
                if(e.touches[i]!=undefined){
                    length = length + 1;
                    realTouches.push(e.touches[i]);
                }
            }

            if(length==1) {
                var x = realTouches[0].pageX - that.finger[0];
                var y = realTouches[0].pageY - that.finger[1];
                that.view.window.changePoint0(x,y);
                that.view.drawAllGears();
                that.finger[0] = realTouches[0].pageX;
                that.finger[1] = realTouches[0].pageY;
            }
            else if(length==2) {
                var x = 0.5*(that.fingerS[0][0]+that.fingerS[1][0]);
                var y = 0.5*(that.fingerS[0][1]+that.fingerS[1][1]);
                var dold = Math.sqrt((that.fingerS[1][0]-that.fingerS[0][0])*(that.fingerS[1][0]-that.fingerS[0][0])+(that.fingerS[1][1]-that.fingerS[0][1])*(that.fingerS[1][1]-that.fingerS[0][1]));
                var dnew = Math.sqrt((realTouches[1].pageX-realTouches[0].pageX)*(realTouches[1].pageX-realTouches[0].pageX)+(realTouches[1].pageY-realTouches[0].pageY)*(realTouches[1].pageY-realTouches[0].pageY));
                var z = dnew/dold;
                that.view.window.changeZoom(x,y,z);
                that.view.drawAllGears();
                that.fingerS[0][0] = realTouches[0].pageX;
                that.fingerS[0][1] = realTouches[0].pageY;
                that.fingerS[1][0] = realTouches[1].pageX;
                that.fingerS[1][1] = realTouches[1].pageY;
            }

        }
    };

    this.touchEnd = function(){
        var that = this;
        return function(e){
            e.preventDefault();

            var length=0;
            var realTouches = [];

            for(var i=0; i< e.touches.length; i++){
                if(e.touches[i]!=undefined){
                    length = length + 1;
                    realTouches.push(e.touches[i]);
                }
            }

            if(length==1) {
                that.finger[0] = realTouches[0].pageX;
                that.finger[1] = realTouches[0].pageY;
            }
            else if(length==2){
                that.fingerS[0][0] = realTouches[0].pageX;
                that.fingerS[0][1] = realTouches[0].pageY;
                that.fingerS[1][0] = realTouches[1].pageX;
                that.fingerS[1][1] = realTouches[1].pageY;
            }

        }
    };

    this.touchCancel = function(){
        var that = this;
        return function(e){
            e.preventDefault();
        }
    };

    this.gestureStart = function(){
        var that = this;
        return function(e){
            e.preventDefault();
        }
    };

    this.gestureChange = function(){
        var that = this;
        return function(e){
            e.preventDefault();
        }
    };

    this.gestureEnd = function(){
        var that = this;
        return function(e){
            e.preventDefault();
        }
    };

    this.clickEvent = function(){
        var that = this;
        return function(e){
            e.preventDefault();
        }
    };

    this.checkDevice = function(){
        var ua = navigator.userAgent;
        var checker = {
            iphone: ua.match(/iPhone/),
            ipod: ua.match(/iPod/),
            ipad: ua.match(/iPad/),
            blackberry: ua.match(/BlackBerry/),
            android: ua.match(/Android/),
            chrome: ua.match(/Chrome/),
            firefox: ua.match(/Firefox/)
        };
        return checker;
    };

    this.init();

    this.view.drawAllGears();

};