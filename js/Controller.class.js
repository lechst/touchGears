Controller = function (){

    this.model = new Model();

    this.view = new View(this.model);

    this.device = {};

    this.init = function(){
        this.device = this.checkDevice();

        if(this.device.iphone||this.device.ipad||this.device.ipod) {
            this.bindTouchEvents();
        } else {
            this.bindMouseEvents();
        }

    };

    this.bindMouseEvents = function() {
        $('body')[0].addEventListener('click',this.clickEvent('Komp'));
    }

    this.bindTouchEvents = function() {
        $('body')[0].addEventListener('touchstart',this.clickEvent('iPad touch'));
        $('body')[0].addEventListener('touchmove',this.clickEvent('iPad move'));
    }

    this.clickEvent = function(message){
        that = this;
        return function(e){
            that.view.showMessage(message);
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