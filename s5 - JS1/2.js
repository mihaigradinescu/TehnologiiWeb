let fib = (n) => {
    switch(n){
        case 0:
        case 1:
            return 1
        default:
            return fib(n-1) + fib(n-2)
    }
}

// console.warn(fib(7))
if (process.argv.length <= 2){
    console.warn('usage : node 2.js <index>')
}
else{
    console.warn(fib(parseInt(process.argv[2])))
}