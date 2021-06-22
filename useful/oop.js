let nest = {
    material: {
        twigs: true,
        cloth: true,
        tinfoil: false,
    },
    contents: ['eggs', 'jackdaw', 'chicks'],
    lookAt: function() {
        let desc = `It/s made of ${this.material.twigs ? 'twigs and' : 'no sticks but'}
        ${this.material.cloth ? 'soft cloth and' : ''} ${this.material.tinfoil ? 'shiny objects.' : 'nothing shiny.'}`
        console.log(desc)
    },
    location : {
        tree: {
            type: 'birch',
            evergreen: false,
            disease: {
                isDiseased: false,

                causeBy: {
                    bugs: false,
                    climate: false,
                    fungus: false,
                    treatment: function() {
                        console.log(this)
                    }
                }
            }
        }
    }
}

nest.lookAt()

//this always point to the object that calls the method


let tree = {
    type: 'birch',
    evergreen: false,
    healthy: false,
    isHealthy: function () {
        return this.healthy;
    },
    heal: function() {
        this.healthy = !this.healthy
    }

};


let disease = {
    causedBy: {
        bugs: true,
        climate: false,
        fungus: false,
    },
    treatment: function (treeObj) {
        if (!treeObj.healthy) {
            console.log('Release the woodpeckers!!!');
            treeObj.heal()
        }
    }
}


class Plant{
    constructor() {
        this.photosynth = true
    }
}

class Tree extends Plant {
    constructor() {
        super()
        this.isTall = true
    }

}