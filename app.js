function textProcessor(input, tokens){
    if(typeof input != "string"){
        throw new Error("Input should be a string");
    }
    else if(input.length <6){
          throw new Error("Input should have at least 6 characters");
    }
    else if(!input.includes("${")){
        return input;
    }
   for(let i=0;i<tokens.length;i++){
       if(!tokens[i].hasOwnProperty("tokenName") || !tokens[i].hasOwnProperty("tokenValue")){
            throw new Error("Invalid array format");
       }
       if(typeof tokens[i].tokenName != "string" || typeof tokens[i].tokenValue != "string"){
           throw new Error("Invalid array format");
       }
   }
   
   var splittedInput = input.split(" ");
   for(let i=0;i<splittedInput.length;i++){
       if(splittedInput[i].startsWith("${")){
         let afterWords = splittedInput[i].substring(splittedInput[i].indexOf("}")+1, splittedInput[i].length);   
         tokens.forEach(element => {
                if(element.tokenName==splittedInput[i].substring(2,splittedInput[i].indexOf("}"))){
                    splittedInput[i]=element.tokenValue;
                    splittedInput[i] += afterWords;
                }
            });
           
       }
   }
   return splittedInput.join(" ");
}

const app = {
    textProcessor: textProcessor
};

module.exports = app;