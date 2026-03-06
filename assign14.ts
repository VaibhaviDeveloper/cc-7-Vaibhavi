import assert from "assert";

/**
 * Represents the nutritional values of a food item.
 */
type Nutritions = {
  protein?: number;
  carbs?: number;
  sugar?: number;
  vitamins?: number;
};

/**
 * Represents a fruit or nut with health benefits and nutrition values.
 */
type Food = {
  name: string;
  type: "fruit" | "nut";
  treats: string[];
  nutritions: Nutritions;
};

const foods: Food[] = [
  {
    name: "Banana",
    type: "fruit",
    treats: ["constipation", "vitamin deficiency", "skin issues", "sleep problems"],
    nutritions: { protein: 8, carbs: 40, sugar: 30, vitamins: 45 }
  },
  {
    name: "Badam",
    type: "nut",
    treats: ["bp", "protein deficiency", "skin issues", "sugar"],
    nutritions: { protein: 18, carbs: 20, sugar: 20, vitamins: 65 }
  },
  {
    name: "Cashew",
    type: "nut",
    treats: ["bp", "protein deficiency", "skin issues", "bone issues"],
    nutritions: { protein: 22, carbs: 22, vitamins: 60 }
  },
  {
    name: "Wallnut",
    type: "nut",
    treats: ["bp", "protein deficiency", "skin issues", "bone issues"],
    nutritions: { protein: 33, carbs: 26, vitamins: 64 }
  },
  {
    name: "Apple",
    type: "fruit",
    treats: ["heart problems", "skin issues", "bone issues", "migraine"],
    nutritions: { protein: 22, carbs: 22, vitamins: 60 }
  }
];

/**
 * Generates an object where each nutrition key maps to the food
 * that has the highest value for that nutrition.
 * If multiple foods have the same value, the first one encountered is chosen.
 *
 * @param foods - Array of food items
 * @returns Object mapping nutrition name to food name
 */
function getHighestNutritionFood(foods: Food[]): Record<string, string> {
  const result: Record<string, { name: string; value: number }> = {};

  foods.forEach(food => {
    Object.entries(food.nutritions).forEach(([nutrition, value]) => {
      if (!result[nutrition] || value > result[nutrition].value) {
        result[nutrition] = { name: food.name, value };
      }
    });
  });

  return Object.fromEntries(
    Object.entries(result).map(([k, v]) => [k, v.name])
  );
}

assert.strictEqual(getHighestNutritionFood(foods).protein, "Wallnut");

/**
 * Extracts all unique nutrition types across all foods.
 * @param foods - Array of food items
 * @returns Array of unique nutrition keys
 */
function getUniqueNutritions(foods: Food[]): string[] {
  return [...new Set(
    foods.flatMap(food => Object.keys(food.nutritions))
  )];
}

assert(getUniqueNutritions(foods).includes("protein"));

/**
 * Finds health conditions that are treated by every nut.
 * @param foods - Array of food items
 * @returns Array of health conditions common to all nuts
 */
function getCommonNutConditions(foods: Food[]): string[] {
  const nuts = foods.filter(f => f.type === "nut");

  return nuts[0].treats.filter(condition =>
    nuts.every(nut => nut.treats.includes(condition))
  );
}

assert(getCommonNutConditions(foods).includes("bp"));

/**
 * Adds a new property `totalNutritions` to each food object.
 * The value represents the sum of all nutrition values for that food.
 *
 * @param foods - Array of food items
 * @returns New array with totalNutritions property added
 */
function addTotalNutritions(foods: Food[]) {
  return foods.map(food => ({
    ...food,
    totalNutritions: Object.values(food.nutritions)
      .reduce((sum, value) => sum + value, 0)
  }));
}

const foodsWithTotals = addTotalNutritions(foods);
assert(foodsWithTotals[0].totalNutritions > 0);

/**
 * Calculates the sum of all nutrition values across all foods.
 *
 * @param foods - Array of food items
 * @returns Total nutrition value
 */
function getTotalNutritionValue(foods: Food[]): number {
  return foods.reduce((total, food) => {
    return total + Object.values(food.nutritions)
      .reduce((sum, val) => sum + val, 0);
  }, 0);
}

assert(getTotalNutritionValue(foods) > 0);

/**
 * Finds foods that treat bone-related issues.
 *
 * @param foods - Array of food items
 * @returns Array of food names
 */
function getFoodsForBoneIssues(foods: Food[]): string[] {
  return foods
    .filter(food => food.treats.includes("bone issues"))
    .map(food => food.name);
}

assert(getFoodsForBoneIssues(foods).includes("Apple"));

/**
 * Determines which food has the highest number
 * of different nutrition types.
 *
 * @param foods - Array of food items
 * @returns Name of the food
 */
function getFoodWithMaxNutritionTypes(foods: Food[]): string {
  return foods.reduce((max, food) =>
    Object.keys(food.nutritions).length >
    Object.keys(max.nutritions).length
      ? food
      : max
  ).name;
}

assert.strictEqual(getFoodWithMaxNutritionTypes(foods), "Banana");

/**
 * Finds foods that treat migraine and contain
 * vitamins greater than or equal to 60.
 *
 * @param foods - Array of food items
 * @returns Array of food names
 */
function getMigraineVitaminFoods(foods: Food[]): string[] {
  return foods
    .filter(food =>
      food.treats.includes("migraine") &&
      (food.nutritions.vitamins ?? 0) >= 60
    )
    .map(food => food.name);
}

assert(getMigraineVitaminFoods(foods).includes("Apple"));

/**
 * Determines the food item that has the lowest carb value.
 * Foods without a carb value are ignored.
 *
 * @param foods - Array of food items
 * @returns Name of the food with lowest carbs
 */
function getLowestCarbsFood(foods: Food[]): string {
  const foodsWithCarbs = foods.filter(f => f.nutritions.carbs !== undefined);

  return foodsWithCarbs.reduce((min, food) =>
    (food.nutritions.carbs! < min.nutritions.carbs!) ? food : min
  ).name;
}

assert.strictEqual(getLowestCarbsFood(foods), "Badam");

/**
 * Calculates total protein intake from nuts that treat sugar issues.
 * Nuts that do not treat sugar issues are excluded.
 *
 * @param foods - Array of food items
 * @returns Total protein intake
 */
function getProteinFromAllowedNuts(foods: Food[]): number {
  return foods
    .filter(food => food.type === "nut" && food.treats.includes("sugar"))
    .reduce((total, food) => total + (food.nutritions.protein ?? 0), 0);
}

assert.strictEqual(getProteinFromAllowedNuts(foods), 18);

/**
 * Calculates the total vitamin intake when eating
 * all nuts and only fruits that do NOT contain sugar.
 *
 * @param foods - Array of food items
 * @returns Total vitamin intake
 */
function getVitaminIntake(foods: Food[]): number {
  const nuts = foods.filter(food => food.type === "nut");

  const allowedFruits = foods.filter(
    food => food.type === "fruit" && !("sugar" in food.nutritions)
  );

  return [...nuts, ...allowedFruits]
    .reduce((sum, food) => sum + (food.nutritions.vitamins ?? 0), 0);
}

assert.strictEqual(getVitaminIntake(foods), 249);