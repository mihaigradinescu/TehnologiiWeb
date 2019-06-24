let dictionary = ['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog']

let sampleText = `
	best
	read
	on
	windy
	nights
`

let checkAcrostih = (text) => {
    let candidate = text.split('\n').map((e) => e.trim()).filter((e) => e).map((e) => e[0]).reduce((a, e) => a + e, '')
    console.warn(candidate)
    return dictionary.indexOf(candidate) !== -1 
}

console.warn(checkAcrostih(sampleText) ? 'yes' : 'no')
