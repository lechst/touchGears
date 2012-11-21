View = function (model){

    this.model = model;
    this.mainCtnr = {};
    this.mainCanvas = {};
    this.mainCtx = {};

    this.init = function(){
        var idOfMainDiv = 'mainDiv';

        document.write('<div id="'+idOfMainDiv+'"></div>');
        this.mainCtnr = document.getElementById(idOfMainDiv);

        this.mainCtnr.innerHTML = this.mainCtnr.innerHTML + '<canvas></canvas>';
        this.mainCanvas = this.mainCtnr.getElementsByTagName('canvas')[0];
        this.mainCanvas.width = 500;
        this.mainCanvas.height = 500;
        this.mainCtx = this.mainCanvas.getContext('2d');
    };

    this.showMessage = function(message){
        $(this.mainCtnr).append('<div class="messageDiv">'+message+'</div>');
        $('.messageDiv').hide(3000,function() {$('.messageDiv').remove();});
    }

    this.drawGearAsCircle = function(gear){

        this.mainCtx.beginPath();
        this.mainCtx.fillStyle = 'blue';
        this.mainCtx.arc(gear.x, gear.y, gear.r1, 0, 2 * Math.PI, false);
        this.mainCtx.fill();

        this.mainCtx.beginPath();
        this.mainCtx.fillStyle = 'green';
        this.mainCtx.arc(gear.x, gear.y, gear.r0, 0, 2 * Math.PI, false);
        this.mainCtx.fill();

    }

    this.drawGear = function(gear){
        console.log(gear);

        this.mainCtx.fillStyle = '#f00';
        this.mainCtx.beginPath();

        this.mainCtx.moveTo(gear.x+gear.r0, gear.y);

        dAlpha = 2*Math.PI/gear.n;

        z = 0.63;
        w = (gear.r0/gear.r1)*0.8;

        for(var i=0; i<gear.n;i++)
        {

            this.mainCtx.lineTo(gear.x+gear.r0*Math.cos((i+((1-z)/2))*dAlpha),gear.y+gear.r0*Math.sin((i+(1-z)/2)*dAlpha));

            this.mainCtx.lineTo(gear.x+gear.r1*Math.cos((i+((1-z*w)/2))*dAlpha),gear.y+gear.r1*Math.sin((i+(1-z*w)/2)*dAlpha));
            this.mainCtx.lineTo(gear.x+gear.r1*Math.cos((i+((1-(1-z*w)/2)))*dAlpha),gear.y+gear.r1*Math.sin((i+(1-(1-z*w)/2))*dAlpha));

            this.mainCtx.lineTo(gear.x+gear.r0*Math.cos((i+((1-(1-z)/2)))*dAlpha),gear.y+gear.r0*Math.sin((i+(1-(1-z)/2))*dAlpha));


        }


        this.mainCtx.closePath();
        this.mainCtx.fill();
    }


    this.drawAllGears = function(){

        gears = model.getGears();

        for (gId in gears)
        {
            this.drawGear(gears[gId]);
        }
    }

    this.init();



};

