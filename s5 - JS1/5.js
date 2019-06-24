let sampleN = 75

let isPrime = (n) => {
    let isPrime = true
    for (let i = 2; i <= Math.sqrt(n); i++){
        if (!(n % i)){
            isPrime = false
        }
    }
    return isPrime
}

console.warn(`${sampleN} is ${isPrime(sampleN) ? 'prime' : 'not prime'}`)