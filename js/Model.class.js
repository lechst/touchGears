Model = function (){

    this.init = function(){
        //this.gears.push({x:200,y:300,r0:100,r1:115,n:20});
        this.generateGears(4,500,500,5);
    };

    this.generateGears = function(n,w,h,dR){

        var rxyrset = [];

        var ranx = Math.floor((Math.random()*(w-1))+1);
        var rany = Math.floor((Math.random()*(h-1))+1);
        var dxmin = Math.min(ranx,(w-ranx));
        var dymin = Math.min(rany,(h-rany));
        var dmin = Math.min(dxmin,dymin);
        var ranr0 = Math.floor((Math.random()*(dmin-1))+1);

        this.gears.push({x:ranx,y:rany,r0:ranr0,r1:(ranr0+dR),n:20});

        rxyrset.push([ranx,rany,ranr0]);

        var ranAlpha = 2*Math.PI*Math.random();

        var x = rxyrset[0][0];
        var y = rxyrset[0][1];
        var r0 = rxyrset[0][2];

        var newr0 = Math.random()*Math.min((-dR+y-(r0+dR)*Math.sin(ranAlpha))/(1+Math.sin(ranAlpha)),(-dR+x+(r0+dR)*Math.cos(ranAlpha))/(1-Math.cos(ranAlpha)),(-dR+h-y+(r0+dR)*Math.sin(ranAlpha))/(1-Math.sin(ranAlpha)),(-dR+w-x-(r0+dR)*Math.cos(ranAlpha))/(1+Math.cos(ranAlpha)));

        var newx = x + (r0+dR+newr0)*Math.cos(ranAlpha);
        var newy = y - (r0+dR+newr0)*Math.sin(ranAlpha);

        this.gears.push({x:newx,y:newy,r0:newr0,r1:(newr0+dR),n:20});

        rxyrset.push([newx,newy,newr0]);

        ranAlpha = 2*Math.PI*Math.random();

        var x1 = rxyrset[1][0];
        var y1 = rxyrset[1][1];
        var r01 = rxyrset[1][2];

        var x2 = rxyrset[0][0];
        var y2 = rxyrset[0][1];
        var r02 = rxyrset[0][2];

        var d12 = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
        var cosGamma = Math.cos(ranAlpha)*(x2-x1)/d12 + Math.sin(ranAlpha)*(y1-y2)/d12;

        newr0 = (r01*r01+d12*d12-r02*r02-2*r01*d12*cosGamma)/(2*(r02-r01+d12*cosGamma))-dR;

        newx = x1 + (r01+dR+newr0)*Math.cos(ranAlpha);
        newy = y1 - (r01+dR+newr0)*Math.sin(ranAlpha);

        this.gears.push({x:newx,y:newy,r0:newr0,r1:(newr0+dR),n:20});

        rxyrset.push([newx,newy,newr0]);

    }

    this.gears = [];

    this.init();

    this.getGears = function(){
        return this.gears;
    }


};

