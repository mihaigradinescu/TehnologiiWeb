class Robot{
    constructor(name){
        this.name = name
    }
    move(){
        console.warn(this.name + ' is on the move')
    }
}

let r1 = new Robot('R1')
r1.move()

class Weapon{
    constructor(description){
        this.description = description
    }
    fire(){
        return `firing ${this.description}`
    }
}

let w1 = new Weapon('pew pew laser')

class CombatRobot extends Robot{
    constructor(name){
        super(name)
        this.weapons = []
    }
    addWeapon(weapon){
        this.weapons.push(weapon)
    }
    fire(){
         for (let weapon of this.weapons){
             console.warn(weapon.fire())
         }
    }
}

let r2 = new CombatRobot('R2')
r2.addWeapon(w1)
r2.fire()

Robot.prototype.selfDestruct = function (seconds){
    console.warn(this.name + ' will self destruct in ' + seconds + ' seconds')
}

r2.selfDestruct(10)
