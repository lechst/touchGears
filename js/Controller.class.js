Controller = function (){

    this.model = new Model();

    this.view = new View(this.model);

    this.device = {};

    this.move = { xin: 0, yin: 0, xnow: 0, ynow: 0 };

    this.move2f = { xin1: 0, yin1: 0, xnow1: 0, ynow1: 0, xin2: 0, yin2: 0, xnow2: 0, ynow2: 0 };

    this.startFingers = [];

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
    }

    this.bindTouchEvents = function() {
        $('body')[0].addEventListener('touchstart',this.touchStart(),false);
        $('body')[0].addEventListener('touchmove',this.touchMove(),false);
        $('body')[0].addEventListener('touchend',this.touchEnd(),false);
        //$('body')[0].addEventListener('touchcancel',this.touchCancel(),false);
    }

    this.bindGestureEvents = function() {
        $('body')[0].addEventListener('gesturestart',this.gestureStart(),false);
        $('body')[0].addEventListener('gesturechange',this.gestureChange(),false);
        $('body')[0].addEventListener('gestureend',this.gestureEnd(),false);
    }

    this.touchStart = function(){
        that = this;
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
                that.move.xin = realTouches[0].pageX;
                that.move.yin = realTouches[0].pageY;
            }
            else if(length==2){
                that.move2f.xin1 = realTouches[0].pageX;
                that.move2f.yin1 = realTouches[0].pageY;
                that.move2f.xin2 = realTouches[1].pageX;
                that.move2f.yin2 = realTouches[1].pageY;
            }

            that.startFingers.push(length);

        }
    }

    this.touchMove = function(){
        that = this;
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
                that.move.xnow = realTouches[0].pageX;
                that.move.ynow = realTouches[0].pageY;

                that.view.setMovePoint0(that.move.xnow-that.move.xin,that.move.ynow-that.move.yin);
                that.view.drawAllGears();
            }
            else if(length==2){
                that.move2f.xnow1 = realTouches[0].pageX;
                that.move2f.ynow1 = realTouches[0].pageY;
                that.move2f.xnow2 = realTouches[1].pageX;
                that.move2f.ynow2 = realTouches[1].pageY;
                that.view.setZoom(that.move2f);
                that.view.drawAllGears();
            }

        }
    }

    this.touchEnd = function(){
        that = this;
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

            if(length==0){
                if(that.startFingers[0] == 2){
                    that.view.setZoomFixed();
                }
                that.view.setPoint0();
                that.startFingers = [];
            }
            else if(length==1) {
                if(that.startFingers[0] == 1 || that.startFingers[1] == 100){
                    that.view.setPoint0();
                }
                else {
                    that.view.setMovePoint0(0,0);
                    that.view.setPoint0();
                    that.startFingers[1] = 100;
                }

                that.move.xin = realTouches[0].pageX;
                that.move.yin = realTouches[0].pageY;
            }

        }
    }

    this.touchCancel = function(){
        that = this;
        return function(e){
            e.preventDefault();
        }
    }

    this.gestureStart = function(){
        that = this;
        return function(e){
            e.preventDefault();
        }
    }

    this.gestureChange = function(){
        that = this;
        return function(e){
            e.preventDefault();
        }
    }

    this.gestureEnd = function(){
        that = this;
        return function(e){
            e.preventDefault();
        }
    }

    this.clickEvent = function(message){
        that = this;
        return function(e){
            //e.preventDefault();
            //that.view.showMessage(message);
        }
    }

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
    }

    this.init();

    this.view.drawAllGears();

};