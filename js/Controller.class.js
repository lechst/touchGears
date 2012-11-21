Controller = function (){


    this.model = new Model();

    this.view = new View(this.model);

    this.init = function(){};

    this.init();

    this.view.drawAllGears();

};
