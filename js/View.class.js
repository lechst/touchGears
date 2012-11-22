View = function (model){

    this.model = model;
    this.mainCtnr = {};
    this.mainCanvas = {};
    this.mainCtx = {};
    this.x0 = 0;
    this.y0 = 0;
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

        this.mainCtx.moveTo(gear.x+this.x0+this.moveRight+gear.r0, gear.y+this.y0+this.moveDown);

        dAlpha = 2*Math.PI/gear.n;

        z = 0.63;
        w = (gear.r0/gear.r1)*0.8;

        for(var i=0; i<gear.n;i++)
        {

            this.mainCtx.lineTo(gear.x+this.x0+this.moveRight+gear.r0*Math.cos((i+((1-z)/2))*dAlpha),gear.y+this.y0+this.moveDown+gear.r0*Math.sin((i+(1-z)/2)*dAlpha));

            this.mainCtx.lineTo(gear.x+this.x0+this.moveRight+gear.r1*Math.cos((i+((1-z*w)/2))*dAlpha),gear.y+this.y0+this.moveDown+gear.r1*Math.sin((i+(1-z*w)/2)*dAlpha));

            this.mainCtx.lineTo(gear.x+this.x0+this.moveRight+gear.r1*Math.cos((i+((1-(1-z*w)/2)))*dAlpha),gear.y+this.y0+this.moveDown+gear.r1*Math.sin((i+(1-(1-z*w)/2))*dAlpha));

            this.mainCtx.lineTo(gear.x+this.x0+this.moveRight+gear.r0*Math.cos((i+((1-(1-z)/2)))*dAlpha),gear.y+this.y0+this.moveDown+gear.r0*Math.sin((i+(1-(1-z)/2))*dAlpha));

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

    this.setMovePoint0 = function(moveR,moveD){
        this.moveRight = moveR;
        this.moveDown = moveD;
    }

    this.setPoint0 = function(){
        this.x0 = this.x0+this.moveRight;
        this.y0 = this.y0+this.moveDown;
    }

    this.init();



};

