String.prototype.format = function(specs){
    let str = this.toString()
    if(specs){
        for (let prop in specs){
            str = str.replace('{' + prop + '}', specs[prop])
        }
    }
    return str
}

let s = 'i am a string with params {first} and {second}'

console.warn(s.format({first : 'a', second : 'b'}))