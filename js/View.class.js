View = function (model){

    this.model = model;
    this.mainCtnr = {};
    this.mainCanvas = {};
    this.mainCanvas2 = {};
    this.mainCtx = {};
    this.mainCtx2 = {};
    this.x0 = 0;
    this.y0 = 0;
    this.zoom = 1;
    this.zoomMove = 1;
    this.moveRight = 0;
    this.moveDown = 0;

    this.init = function(){
        var idOfMainDiv = 'mainDiv';

        document.write('<div id="'+idOfMainDiv+'"></div>');
        this.mainCtnr = document.getElementById(idOfMainDiv);

        this.mainCtnr.innerHTML = this.mainCtnr.innerHTML + '<canvas></canvas>';
        this.mainCanvas = this.mainCtnr.getElementsByTagName('canvas')[0];
        this.mainCanvas.width = 500;
        this.mainCanvas.height = 500;
        this.mainCtx = this.mainCanvas.getContext('2d');

        document.write('<canvas id="maly"></canvas>');
        this.mainCanvas2 = document.getElementById('maly');
        $(this.mainCanvas2).css('width',100);
        $(this.mainCanvas2).css('height',100);
        $(this.mainCanvas2).css('left',500);
        $(this.mainCanvas2).css('top',0);
        $(this.mainCanvas2).css('position','fixed');
        $(this.mainCanvas2).css('z-index','10000');
        $(this.mainCanvas2).css('background-color','white');
        this.mainCanvas2.width = 500;
        this.mainCanvas2.height = 500;
        this.mainCtx2 = this.mainCanvas2.getContext('2d');


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

        this.mainCtx.moveTo(this.zoom*this.zoomMove*gear.x+this.x0+this.moveRight+this.zoom*this.zoomMove*gear.r0, this.zoom*this.zoomMove*gear.y+this.y0+this.moveDown);

        dAlpha = 2*Math.PI/gear.n;

        z = 0.63;
        w = (gear.r0/gear.r1)*0.8;

        for(var i=0; i<gear.n;i++)
        {

            this.mainCtx.lineTo(this.zoom*this.zoomMove*gear.x+this.x0+this.moveRight+this.zoom*this.zoomMove*gear.r0*Math.cos((i+((1-z)/2))*dAlpha),this.zoom*this.zoomMove*gear.y+this.y0+this.moveDown+this.zoom*this.zoomMove*gear.r0*Math.sin((i+(1-z)/2)*dAlpha));

            this.mainCtx.lineTo(this.zoom*this.zoomMove*gear.x+this.x0+this.moveRight+this.zoom*this.zoomMove*gear.r1*Math.cos((i+((1-z*w)/2))*dAlpha),this.zoom*this.zoomMove*gear.y+this.y0+this.moveDown+this.zoom*this.zoomMove*gear.r1*Math.sin((i+(1-z*w)/2)*dAlpha));

            this.mainCtx.lineTo(this.zoom*this.zoomMove*gear.x+this.x0+this.moveRight+this.zoom*this.zoomMove*gear.r1*Math.cos((i+((1-(1-z*w)/2)))*dAlpha),this.zoom*this.zoomMove*gear.y+this.y0+this.moveDown+this.zoom*this.zoomMove*gear.r1*Math.sin((i+(1-(1-z*w)/2))*dAlpha));

            this.mainCtx.lineTo(this.zoom*this.zoomMove*gear.x+this.x0+this.moveRight+this.zoom*this.zoomMove*gear.r0*Math.cos((i+((1-(1-z)/2)))*dAlpha),this.zoom*this.zoomMove*gear.y+this.y0+this.moveDown+this.zoom*this.zoomMove*gear.r0*Math.sin((i+(1-(1-z)/2))*dAlpha));

        }

        this.mainCtx.closePath();
        this.mainCtx.fill();
    }

    this.drawGearWorld = function(gear){
        console.log(gear);

        this.mainCtx2.fillStyle = '#f00';
        this.mainCtx2.beginPath();

        this.mainCtx2.moveTo(1*1*gear.x+0+0+1*1*gear.r0, 1*1*gear.y+0+0);

        dAlpha = 2*Math.PI/gear.n;

        z = 0.63;
        w = (gear.r0/gear.r1)*0.8;

        for(var i=0; i<gear.n;i++)
        {

            this.mainCtx2.lineTo(1*1*gear.x+0+0+1*1*gear.r0*Math.cos((i+((1-z)/2))*dAlpha),1*1*gear.y+0+0+1*1*gear.r0*Math.sin((i+(1-z)/2)*dAlpha));

            this.mainCtx2.lineTo(1*1*gear.x+0+0+1*1*gear.r1*Math.cos((i+((1-z*w)/2))*dAlpha),1*1*gear.y+0+0+1*1*gear.r1*Math.sin((i+(1-z*w)/2)*dAlpha));

            this.mainCtx2.lineTo(1*1*gear.x+0+0+1*1*gear.r1*Math.cos((i+((1-(1-z*w)/2)))*dAlpha),1*1*gear.y+0+0+1*1*gear.r1*Math.sin((i+(1-(1-z*w)/2))*dAlpha));

            this.mainCtx2.lineTo(1*1*gear.x+0+0+1*1*gear.r0*Math.cos((i+((1-(1-z)/2)))*dAlpha),1*1*gear.y+0+0+1*1*gear.r0*Math.sin((i+(1-(1-z)/2))*dAlpha));

        }

        this.mainCtx2.closePath();
        this.mainCtx2.fill();
    }


    this.drawAllGears = function(){

        this.mainCtx.fillStyle = 'white';
        this.mainCtx.fillRect(0,0,500,500);

        gears = model.getGears();

        for (gId in gears)
        {
            this.drawGear(gears[gId]);
            this.drawGearWorld(gears[gId]);
        }

    }

    this.setMovePoint0 = function(moveR,moveD){
        this.moveRight = moveR;
        this.moveDown = moveD;
    }

    this.setPoint0 = function(){
        this.x0 = this.x0+this.moveRight;
        this.y0 = this.y0+this.moveDown;
    }

    this.setZoom = function(m2f){
        var dnow = Math.sqrt((m2f.xnow2-m2f.xnow1)*(m2f.xnow2-m2f.xnow1)+(m2f.ynow2-m2f.ynow1)*(m2f.ynow2-m2f.ynow1));
        var din = Math.sqrt((m2f.xin2-m2f.xin1)*(m2f.xin2-m2f.xin1)+(m2f.yin2-m2f.yin1)*(m2f.yin2-m2f.yin1));
        this.zoomMove = dnow/din;
    }

    this.setZoomFixed = function(){
        this.zoom = this.zoom * this.zoomMove;
    }

    this.init();



};

