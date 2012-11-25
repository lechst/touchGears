View = function (model){

    this.model = model;

    this.mainCtnr = {};
    this.mainCanvas = {};
    this.mainCtx = {};

    this.window = { point0: [0,0],
                    zoom: 1,
                    changePoint0: function(x,y) { this.point0[0]+=x; this.point0[1]+=y; },
                    changeZoom: function (x,y,z) { this.point0[0]=x-(x-this.point0[0])*z; this.point0[1]=y-(y-this.point0[1])*z; this.zoom*=z; }
                  };

    this.init = function(){
        var idOfMainDiv = 'mainDiv';

        document.write('<div id="'+idOfMainDiv+'"></div>');
        this.mainCtnr = document.getElementById(idOfMainDiv);

        this.mainCtnr.innerHTML = this.mainCtnr.innerHTML + '<canvas></canvas>';
        this.mainCanvas = this.mainCtnr.getElementsByTagName('canvas')[0];
        this.mainCanvas.width = 500;
        this.mainCanvas.height = 500;
        this.mainCtx = this.mainCanvas.getContext('2d');

        this.chooseMode();
    };

    this.showMessage = function(message){
        $(this.mainCtnr).append('<div class="messageDiv">'+message+'</div>');
        $('.messageDiv').hide(3000,function() {$('.messageDiv').remove();});
    }

    this.chooseMode = function(){
        $(this.mainCtnr).append('<div class="buttons"><input type="radio" name="mode" class="rescale"/>Rescale <input type="radio" name="mode" class="normal"/>Normal</div>');
    }

    this.drawGear = function(gear){
        console.log(gear);

        this.mainCtx.fillStyle = '#f00';
        this.mainCtx.beginPath();

        var x = gear.x * this.window.zoom + this.window.point0[0];
        var y = gear.y * this.window.zoom + this.window.point0[1];
        var r0 = gear.r0 * this.window.zoom;
        var r1 = gear.r1 * this.window.zoom;

        this.mainCtx.moveTo(x + r0, y);

        dAlpha = 2*Math.PI/gear.n;

        z = 0.63;
        w = (r0/r1)*0.8;

        for(var i=0; i<gear.n;i++)
        {

            this.mainCtx.lineTo(x + r0*Math.cos((i+((1-z)/2))*dAlpha), y + r0*Math.sin((i+(1-z)/2)*dAlpha));

            this.mainCtx.lineTo(x + r1*Math.cos((i+((1-z*w)/2))*dAlpha), y + r1*Math.sin((i+(1-z*w)/2)*dAlpha));

            this.mainCtx.lineTo(x + r1*Math.cos((i+((1-(1-z*w)/2)))*dAlpha), y + r1*Math.sin((i+(1-(1-z*w)/2))*dAlpha));

            this.mainCtx.lineTo(x + r0*Math.cos((i+((1-(1-z)/2)))*dAlpha), y + r0*Math.sin((i+(1-(1-z)/2))*dAlpha));

        }

        this.mainCtx.closePath();
        this.mainCtx.fill();
    }

    this.drawAllGears = function(){

        this.mainCtx.fillStyle = 'white';
        this.mainCtx.fillRect(0,0,500,500);

        gears = model.getGears();

        for (gId in gears)
        {
            this.drawGear(gears[gId]);
        }

    }

    this.init();



};

