let sampleString = 'the quick brown fox jumps over the lazy dog'

let freqDist = (text) => {
    let words = text.split(' ')
    let result = {}
    for (let word of words){
        if (word in result){
            result[word]++
        }
        else{
            result[word] = 1
        }
    }
    return result
}

console.warn(freqDist(sampleString))