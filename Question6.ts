import assert from "assert";
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
