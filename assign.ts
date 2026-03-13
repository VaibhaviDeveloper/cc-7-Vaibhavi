import assert from 'node:assert';

/**
 * Returns a function that checks if a number
 * is less than or equal to the given cutoff value.
 *
 * @param {number} cutOffValue - The maximum allowed value.
 * @returns {(num: number) => boolean} Function that validates the number against the cutoff.
 */

function createCutOff(cutOffValue: number): (num: number) => boolean {
  return function (num: number) {
    return num <= cutOffValue;
  };
}
const cutOff100 = createCutOff(100);
assert.equal(cutOff100(89), true);
assert.equal(cutOff100(189), false);
assert.equal(cutOff100(100), true);
assert.equal(cutOff100(101), false);
const cutOff0 = createCutOff(0);
assert.equal(cutOff0(0), true);
assert.equal(cutOff0(-1), true);
assert.equal(cutOff0(1), false);
const cutOffDecimal = createCutOff(10.5);
assert.equal(cutOffDecimal(10.4), true);
assert.equal(cutOffDecimal(10.5), true);
assert.equal(cutOffDecimal(10.6), false);
