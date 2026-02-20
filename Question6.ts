import assert from "assert";

/**
 * A function that will pad zeros before a number to ensure it has a specified number of digits.
 *  @param {number} num - The original number to pad with zeros.
 *  @param {number} numOfDigits - The minimum total number of digits required.
 *  @returns {string} The number converted to a string and padded with leading zeros if needed.
 */

function padZerosBeforeNumber(num:number, numOfDigits:number):string{
    const strNum=String(num);
    if(strNum.length>=numOfDigits){
        return strNum;
    }
    
const requiredNumberOfDigits=numOfDigits-strNum.length;
const zeros="0".repeat(requiredNumberOfDigits);
return strNum+zeros;
}

const expectedOutput="00003345";
assert(padZerosBeforeNumber(3345,8),expectedOutput);
assert(padZerosBeforeNumber(4567,4),"4567");
