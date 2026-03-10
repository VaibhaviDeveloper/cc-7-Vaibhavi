import assert from "assert";

type Nutrition = {
  protein?: number;
  carbs?: number;
  sugar?: number;
  vitamins?: number;
};

type Item = {
  name: string;
  type: "fruit" | "nut";
  treats: string[];
  nutritions: Nutrition;
};

const items: Item[] = [
  {
    name: "Banana",
    type: "fruit",
    treats: [
      "constipation",
      "vitamin deficiency",
      "skin issues",
      "sleep problems",
    ],
    nutritions: { protein: 8, carbs: 40, sugar: 30, vitamins: 45 },
  },
  {
    name: "Badam",
    type: "nut",
    treats: ["bp", "protein deficiency", "skin issues", "sugar"],
    nutritions: { protein: 18, carbs: 20, sugar: 20, vitamins: 65 },
  },
  {
    name: "Cashew",
    type: "nut",
    treats: ["bp", "protein deficiency", "skin issues", "bone issues"],
    nutritions: { protein: 22, carbs: 22, vitamins: 60 },
  },
  {
    name: "Wallnut",
    type: "nut",
    treats: ["bp", "protein deficiency", "skin issues", "bone issues"],
    nutritions: { protein: 33, carbs: 26, vitamins: 64 },
  },
  {
    name: "Apple",
    type: "fruit",
    treats: ["heart problems", "skin issues", "bone issues", "migraine"],
    nutritions: { protein: 22, carbs: 22, vitamins: 60 },
  },
];

/**
 * Returns the item name with the highest value for each nutrition type.
 * @param items array of food items
 * @returns object mapping nutrition type to item name
 */
const highestByNutrition = (items: Item[]) => {
  const keys = Object.keys(items[0].nutritions) as (keyof Nutrition)[];

  return keys.reduce<Record<string, string>>((result, key) => {
    const maxItem = items.reduce((max, item) => {
      const current = item.nutritions[key] ?? -Infinity;
      const maxValue = max.nutritions[key] ?? -Infinity;
      return current > maxValue ? item : max;
    }, items[0]);

    result[key] = maxItem.name;
    return result;
  }, {});
};

const highest = highestByNutrition(items);
assert.strictEqual(highest.protein, "Wallnut");

/**
 * Returns all unique nutrition types present in the items.
 * @param items array of food items
 * @returns array of unique nutrition names
 */
const uniqueNutritions = (items: Item[]) =>
  items.reduce<string[]>((acc, item) => {
    Object.keys(item.nutritions).forEach((key) => {
      if (!acc.includes(key)) {
        acc.push(key);
      }
    });
    return acc;
  }, []);

assert.deepStrictEqual(
  uniqueNutritions(items).sort(),
  ["protein", "carbs", "sugar", "vitamins"].sort(),
);

/**
 * Returns all unique health conditions treated by the items.
 * @param items array of food items
 * @returns array of unique treat conditions
 */
const uniqueTreats = (items: Item[]) => [
  ...new Set(items.flatMap((i) => i.treats)),
];

assert(uniqueTreats(items).includes("skin issues"));

/**
 * Returns the common health conditions treated by all nuts.
 * @param items array of food items
 * @returns array of common conditions among nuts
 */
const commonNutTreats = (items: Item[]) => {
  const nuts = items.filter((i) => i.type === "nut");
  return nuts.reduce(
    (acc, n) => acc.filter((t) => n.treats.includes(t)),
    nuts[0].treats,
  );
};

assert(commonNutTreats(items).includes("bp"));

/**
 * Adds totalNutritions property to each item.
 * @param items array of food items
 * @returns array of items with totalNutritions added
 */
const addTotalNutritions = (items: Item[]) =>
  items.map((i) => ({
    ...i,
    totalNutritions: Object.values(i.nutritions).reduce((a, b) => a + b, 0),
  }));

const withTotals = addTotalNutritions(items);
assert(withTotals[0].totalNutritions > 0);

/**
 * Calculates total nutrition value across all items.
 * @param items array of food items
 * @returns total nutrition value
 */
const totalNutritionValue = (items: Item[]) =>
  items.reduce(
    (sum, i) => sum + Object.values(i.nutritions).reduce((a, b) => a + b, 0),
    0,
  );

assert(totalNutritionValue(items) > 0);

/**
 * Returns names of items that treat bone issues.
 * @param items array of food items
 * @returns array of item names
 */
const boneIssueItems = (items: Item[]) =>
  items.filter((i) => i.treats.includes("bone issues")).map((i) => i.name);

assert(boneIssueItems(items).includes("Cashew"));

/**
 * Returns the item with maximum number of nutrition types.
 * @param items array of food items
 * @returns item with most nutrition fields
 */
const maxNutritionTypes = (items: Item[]) =>
  items.reduce(
    (max, i) =>
      Object.keys(i.nutritions).length > Object.keys(max.nutritions).length
        ? i
        : max,
    items[0],
  );

assert.strictEqual(maxNutritionTypes(items).name, "Banana");

/**
 * Returns items that treat migraine and have vitamins >= 60.
 * @param items array of food items
 * @returns array of item names
 */
const migraineVitaminItems = (items: Item[]) =>
  items
    .filter(
      (i) =>
        i.treats.includes("migraine") && (i.nutritions.vitamins ?? 0) >= 60,
    )
    .map((i) => i.name);

assert.deepStrictEqual(migraineVitaminItems(items), ["Apple"]);

/**
 * Returns the item with lowest carbs value.
 * @param items array of food items
 * @returns item with minimum carbs
 */
const lowestCarbs = (items: Item[]) =>
  items
    .filter((i) => i.nutritions.carbs !== undefined)
    .reduce((min, i) =>
      i.nutritions.carbs! < min.nutritions.carbs! ? i : min,
    );

assert.strictEqual(lowestCarbs(items).name, "Badam");

/**
 * Calculates protein intake from nuts that treat sugar issues.
 * @param items array of food items
 * @returns total protein value
 */
const proteinFromAllowedNuts = (items: Item[]) =>
  items
    .filter((i) => i.type === "nut" && i.treats.includes("sugar"))
    .reduce((sum, i) => sum + (i.nutritions.protein ?? 0), 0);

assert.strictEqual(proteinFromAllowedNuts(items), 18);

/**
 * Calculates vitamins intake by selecting one fruit without sugar and one nut.
 * @param items array of food items
 * @returns total vitamin value
 */
const vitaminIntake = (items: Item[]) => {
  const fruit = items.find((i) => i.type === "fruit" && !i.nutritions.sugar);
  const nut = items.find((i) => i.type === "nut");
  return (fruit?.nutritions.vitamins ?? 0) + (nut?.nutritions.vitamins ?? 0);
};

assert.strictEqual(vitaminIntake(items), 60 + 65);