let sampleString = 'the quick brown fox jumps over the lazy dog'

let freqDist = (text) => {
    let result = {}
    for (let letter of text){
        if (letter in result){
            result[letter]++
        }
        else{
            result[letter] = 1
        }
    }
    return result
}

console.warn(freqDist(sampleString))