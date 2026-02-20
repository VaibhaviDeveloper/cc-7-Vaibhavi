import assert from "assert";
 
/**
 * Converts a decimal number to its binary representation as a string.
 *The function repeatedly divides the number by 2 and accumulates
 * the remainders to build the binary string. If the input is 0,
 * it returns `"0"`.
 * @param {number} numInDecimal - The decimal number to convert to binary.
 * @returns {string} -The binary representation of the input number.
 */

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
assert(convertToBinary(0),"0");
