let formatString = (s, format) => {
    let modified = s
    for (let i = 0; i < format.length; i++){
        let position = s.indexOf('{' + i + '}')
        if (position === -1){
            return modified
        }
        else{
            modified = modified.replace('{' + i + '}', format[i])
        }
    }
    return modified
}

console.warn(formatString("this is a {0} string and we've {1} it", ['nice', 'formatted']))