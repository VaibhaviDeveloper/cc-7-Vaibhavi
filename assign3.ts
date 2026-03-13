import assert from 'assert';
/**
 * Filters out lines that contain the digit '4' from a multiline string of purchases,
 * then adds 10 to the quantity of each remaining item (skipping the header).
 * @param {string} text - Multiline string with items and their quantities.
 * @returns {string[]} Transformed array of strings with updated quantities.
 */
const purchases = `items qty
apple 24
mango 50
guava 42
onion 31
water 10`;
const lines = purchases.split('\n');
const linesWithoutFour = lines.filter((line) => !line.includes('4'));
const transformedLine = linesWithoutFour.map((line, index) => {
  if (index === 0) {
    return line;
  }
  const [item, quantity] = line.split(' ');
  let numQuantity = Number(quantity);
  if (!isNaN(numQuantity)) {
    numQuantity += 10;
  }
  return `${item} ${numQuantity}`;
});
const finalOutput = transformedLine.join('\n');
const expectedOutput = `items qty
mango 60
onion 41
water 20`;
assert.deepStrictEqual(finalOutput, expectedOutput);
