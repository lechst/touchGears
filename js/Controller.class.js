Controller = function (){

    this.model = new Model();

    this.view = new View(this.model);

    this.device = {};

    this.move = { xin: 0, yin: 0, xnow: 0, ynow: 0 };

    this.move2f = { xin1: 0, yin1: 0, xnow1: 0, ynow1: 0, xin2: 0, yin2: 0, xnow2: 0, ynow2: 0 };

    this.startFingers0 = [];
    this.startFingers = [];
    this.startFingers2 = [];
    this.moveFingers = false;

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
                that.startFingers.push([realTouches[0].pageX,realTouches[0].pageY,0,0]);
            }
            else if(length==2){
                that.startFingers2.push([realTouches[0].pageX,realTouches[0].pageY,realTouches[1].pageX,realTouches[1].pageY,0,0,0,0]);
            }

            that.startFingers0.push(length);

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

            if(length==1 && that.startFingers0[0]==1) {
                that.view.zoomMove = 1;
                that.startFingers[0][2] = realTouches[0].pageX;
                that.startFingers[0][3] = realTouches[0].pageY;

                that.view.setMovePoint0(that.startFingers[0][2]-that.startFingers[0][0],that.startFingers[0][3]-that.startFingers[0][1]);
                that.view.drawAllGears();
                that.moveFingers = true;
            }
            else if(length==2 && that.startFingers0[0]==2){
                that.view.setMovePoint0(0,0);
                that.startFingers2[0][4] = realTouches[0].pageX;
                that.startFingers2[0][5] = realTouches[0].pageY;
                that.startFingers2[0][6] = realTouches[1].pageX;
                that.startFingers2[0][7] = realTouches[1].pageY;
                that.move2f = { xin1: that.startFingers2[0][0], yin1: that.startFingers2[0][1], xnow1: that.startFingers2[0][4], ynow1: that.startFingers2[0][5], xin2: that.startFingers2[0][2], yin2: that.startFingers2[0][3], xnow2: that.startFingers2[0][6], ynow2: that.startFingers2[0][7] }
                that.view.setZoom(that.move2f);
                that.view.drawAllGears();
                that.moveFingers = true;
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

            if(that.startFingers0[0]==1 && that.moveFingers){
                that.view.setPoint0();
                that.moveFingers = false;
            }
            else if(that.startFingers0[0]==2 && that.moveFingers){
                that.view.setZoomFixed();
                that.moveFingers = false;
            }

            that.startFingers0 = [];
            that.startFingers = [];
            that.startFingers2 = [];




            /*if(length==0){
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
            }*/

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