import assert from "assert";
function convertToBinary(numInDecimal:number):string{
    if(numInDecimal===0)return "0";
    let num=numInDecimal;
    let binary="";
    while(num>0){
        let remainder = num%2;
        binary=binary+remainder;
        num=Math.floor(num/2);
    }
    return binary;
}
assert(convertToBinary(10),"1010");
assert(convertToBinary(1000),"111101000");
