let sampleArray = [1,2,3,4,5]

// let map = (a, f) => {
//     let result = []
//     for (let item of a){
//         result.push(f(item))
//     }
//     return result
// }

let map = (a, f) => {
    let result = []
    for (let i = 0; i < a.length; i++){
        if (f.length === 1){
            result.push(f(a[i]))
        }
        else{
            result.push(f(a[i], i))
        }
    }
    return result
}

let b = map(sampleArray, (e) => e * 2)

console.warn(b)

let c = map(sampleArray, (e, i) => `at ${i} we have ${e}`)

console.warn(c)