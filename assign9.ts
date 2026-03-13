import assert from 'node:assert';

const foods = [
  { idli: ['rice', 'urad', 'oil', 'cashew', 'water'] },
  { chapathi: ['atta', 'gluten', 'water', 'oil', 'sugar'] },
  { pizza: ['maida', 'sugar', 'oil', 'chiili', 'flakes', 'sause'] },
  { 'paneer masala': ['paneer', 'onion', 'tomato', 'garlic', 'oil'] },
];

/**
 * Returns food names that do NOT contain a specific ingredient.
 * @param {typeof foods} arr - Array of food objects.
 * @param {string} ingredient - Ingredient to check for.
 * @returns {string[]} Array of food names without the ingredient.
 */

function foodsWithoutIngredient(arr: typeof foods, ingredient: string): string[] {
  return arr
    .filter((foodObj) => {
      const [_foodName, ingredients] = Object.entries(foodObj)[0];
      return !ingredients.includes(ingredient);
    })
    .map((foodObj) => Object.keys(foodObj)[0]);
}
const noSugarFoods = foodsWithoutIngredient(foods, 'sugar');

/**
 * Returns food names that contain all specified ingredients.
 * @param {typeof foods} arr - Array of food objects.
 * @param {string[]} ingredientsList - Array of ingredients to check for.
 * @returns {string[]} Array of food names containing all ingredients.
 */
function foodsWithAllIngredients(arr: typeof foods, ingredientsList: string[]): string[] {
  return arr
    .filter((foodObj) => {
      const [_, ingredients] = Object.entries(foodObj)[0];
      return ingredientsList.every((ing) => ingredients.includes(ing));
    })
    .map((foodObj) => Object.keys(foodObj)[0]);
}
const chiliOilFoods = foodsWithAllIngredients(foods, ['chiili', 'oil']);

/**
 * Marks food items as 'safe' or 'unsafe' based on presence of an ingredient.
 * @param {typeof foods} arr - Array of food objects.
 * @param {string} unsafeIngredient - Ingredient that makes food unsafe.
 * @returns {Array<Record<string, "safe" | "unsafe">>} Array of objects with food name and safety.
 */
function markFoodSafety(
  arr: typeof foods,
  unsafeIngredient: string
): Array<Record<string, 'safe' | 'unsafe'>> {
  return arr.map((foodObj) => {
    const [foodName, ingredients] = Object.entries(foodObj)[0];
    return { [foodName]: ingredients.includes(unsafeIngredient) ? 'unsafe' : 'safe' };
  });
}
const foodSafety = markFoodSafety(foods, 'sugar');

assert.deepStrictEqual(noSugarFoods, ['idli', 'paneer masala']);
assert.deepStrictEqual(chiliOilFoods, ['pizza']);
const expectedSafety = [
  { idli: 'safe' },
  { chapathi: 'unsafe' },
  { pizza: 'unsafe' },
  { 'paneer masala': 'safe' },
];
assert.deepStrictEqual(foodSafety, expectedSafety);
