function primeCheckerGenerator(){
    let cache = [2, 3]
    let checkIndividualPrime = (n) => {
        for (let item of cache){
            if (!(n % item)){
                return false
            }
        }
        return true
    }
    return function(n){
        let found = cache.indexOf(n) !== -1
        if (found){
            return true
        }
        else{
            if (n < cache[cache.length - 1]){
                return false
            }
            else{
                for (let i = cache[cache.length - 1] + 1; i < Math.sqrt(n); i++){
                    if (checkIndividualPrime(i)){
                        cache.push(i)
                    }
                }
                return checkIndividualPrime(n)
            }
        }
    }
}

let primeChecker = primeCheckerGenerator()
console.warn(primeChecker(13))
console.warn(primeChecker(55))
console.warn(primeChecker(5))





