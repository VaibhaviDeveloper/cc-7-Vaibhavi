import assert from 'assert';

type Nutrition = {
  protein?: number;
  carbs?: number;
  sugar?: number;
  vitamins?: number;
};

type Item = {
  name: string;
  type: 'fruit' | 'nut';
  treats: string[];
  nutritions: Nutrition;
};

const items: Item[] = [
  {
    name: 'Banana',
    type: 'fruit',
    treats: ['constipation', 'vitamin deficiency', 'skin issues', 'sleep problems'],
    nutritions: { protein: 8, carbs: 40, sugar: 30, vitamins: 45 },
  },
  {
    name: 'Badam',
    type: 'nut',
    treats: ['bp', 'protein deficiency', 'skin issues', 'sugar'],
    nutritions: { protein: 18, carbs: 20, sugar: 20, vitamins: 65 },
  },
  {
    name: 'Cashew',
    type: 'nut',
    treats: ['bp', 'protein deficiency', 'skin issues', 'bone issues'],
    nutritions: { protein: 22, carbs: 22, vitamins: 60 },
  },
  {
    name: 'Wallnut',
    type: 'nut',
    treats: ['bp', 'protein deficiency', 'skin issues', 'bone issues'],
    nutritions: { protein: 33, carbs: 26, vitamins: 64 },
  },
  {
    name: 'Apple',
    type: 'fruit',
    treats: ['heart problems', 'skin issues', 'bone issues', 'migraine'],
    nutritions: { protein: 22, carbs: 22, vitamins: 60 },
  },
];

/** Returns the item name with the highest value for each nutrition type */
const highestByNutrition = (items: Item[]) => {
  const allKeys = Array.from(
    new Set(items.flatMap((i) => Object.keys(i.nutritions)))
  ) as (keyof Nutrition)[];
  return allKeys.reduce<Record<string, string>>((acc, key) => {
    const maxItem = items.reduce((max, item) => {
      const current = item.nutritions[key] ?? -Infinity;
      const maxValue = max.nutritions[key] ?? -Infinity;
      return current > maxValue ? item : max;
    }, items[0]);
    acc[key] = maxItem.name;
    return acc;
  }, {});
};

/** Returns all unique nutrition types */
const uniqueNutritions = (items: Item[]) =>
  Array.from(new Set(items.flatMap((i) => Object.keys(i.nutritions))));

/** Returns all unique treats */
const uniqueTreats = (items: Item[]) => Array.from(new Set(items.flatMap((i) => i.treats)));

/** Returns common treats for nuts */
const commonNutTreats = (items: Item[]) => {
  const nuts = items.filter((i) => i.type === 'nut');
  return nuts.reduce((acc, n) => acc.filter((t) => n.treats.includes(t)), nuts[0].treats);
};

/** Adds totalNutritions */
const addTotalNutritions = (items: Item[]) =>
  items.map((i) => ({
    ...i,
    totalNutritions: Object.values(i.nutritions).reduce((a, b) => a + b, 0),
  }));

/** Total nutrition across all items */
const totalNutritionValue = (items: Item[]) =>
  items.reduce((sum, i) => sum + Object.values(i.nutritions).reduce((a, b) => a + b, 0), 0);

/** Items treating bone issues */
const boneIssueItems = (items: Item[]) =>
  items.filter((i) => i.treats.includes('bone issues')).map((i) => i.name);

/** Item with maximum number of nutrition types */
const maxNutritionTypes = (items: Item[]) =>
  items.reduce(
    (max, i) => (Object.keys(i.nutritions).length > Object.keys(max.nutritions).length ? i : max),
    items[0]
  );

/** Items treating migraine with vitamins >= 60 */
const migraineVitaminItems = (items: Item[]) =>
  items
    .filter((i) => i.treats.includes('migraine') && (i.nutritions.vitamins ?? 0) >= 60)
    .map((i) => i.name);

/** Item with lowest carbs */
const lowestCarbs = (items: Item[]) =>
  items
    .filter((i) => i.nutritions.carbs !== undefined)
    .reduce((min, i) => (i.nutritions.carbs! < min.nutritions.carbs! ? i : min));

/** Protein from nuts treating sugar */
const proteinFromAllowedNuts = (items: Item[]) =>
  items
    .filter((i) => i.type === 'nut' && i.treats.includes('sugar'))
    .reduce((sum, i) => sum + (i.nutritions.protein ?? 0), 0);

/** Vitamins intake from fruit without sugar + any nut */
const vitaminIntake = (items: Item[]) => {
  const fruit = items.find((i) => i.type === 'fruit' && !i.nutritions.sugar);
  const nut = items.find((i) => i.type === 'nut');
  return (fruit?.nutritions.vitamins ?? 0) + (nut?.nutritions.vitamins ?? 0);
};

// highestByNutrition test
const expectedHighest: Record<string, string> = {};
Object.keys(items[0].nutritions).forEach((k) => {
  expectedHighest[k] = items.reduce(
    (max, item) =>
      (item.nutritions[k as keyof Nutrition] ?? -Infinity) >
      (max.nutritions[k as keyof Nutrition] ?? -Infinity)
        ? item
        : max,
    items[0]
  ).name;
});
assert.deepStrictEqual(highestByNutrition(items), expectedHighest);

// uniqueNutritions
assert.deepStrictEqual(
  uniqueNutritions(items).sort(),
  Array.from(new Set(items.flatMap((i) => Object.keys(i.nutritions)))).sort()
);

// uniqueTreats
assert.deepStrictEqual(
  uniqueTreats(items).sort(),
  Array.from(new Set(items.flatMap((i) => i.treats))).sort()
);

// commonNutTreats
const nuts = items.filter((i) => i.type === 'nut');
const expectedCommonNutTreats = nuts.reduce(
  (acc, n) => acc.filter((t) => n.treats.includes(t)),
  nuts[0].treats
);
assert.deepStrictEqual(commonNutTreats(items), expectedCommonNutTreats);

// totalNutritions
const totals = addTotalNutritions(items).map((i) => i.totalNutritions);
assert.deepStrictEqual(
  totals,
  items.map((i) => Object.values(i.nutritions).reduce((a, b) => a + b, 0))
);

// totalNutritionValue
assert.strictEqual(
  totalNutritionValue(items),
  items.reduce((sum, i) => sum + Object.values(i.nutritions).reduce((a, b) => a + b, 0), 0)
);

// boneIssueItems
const expectedBone = items.filter((i) => i.treats.includes('bone issues')).map((i) => i.name);
assert.deepStrictEqual(boneIssueItems(items).sort(), expectedBone.sort());

// maxNutritionTypes
const expectedMax = items.reduce(
  (max, i) => (Object.keys(i.nutritions).length > Object.keys(max.nutritions).length ? i : max),
  items[0]
);
assert.strictEqual(maxNutritionTypes(items).name, expectedMax.name);

// migraineVitaminItems
const expectedMigraine = items
  .filter((i) => i.treats.includes('migraine') && (i.nutritions.vitamins ?? 0) >= 60)
  .map((i) => i.name);
assert.deepStrictEqual(migraineVitaminItems(items).sort(), expectedMigraine.sort());

// lowestCarbs
const expectedLowest = items
  .filter((i) => i.nutritions.carbs !== undefined)
  .reduce((min, i) => (i.nutritions.carbs! < min.nutritions.carbs! ? i : min));
assert.strictEqual(lowestCarbs(items).name, expectedLowest.name);

// proteinFromAllowedNuts
const expectedProtein = items
  .filter((i) => i.type === 'nut' && i.treats.includes('sugar'))
  .reduce((sum, i) => sum + (i.nutritions.protein ?? 0), 0);
assert.strictEqual(proteinFromAllowedNuts(items), expectedProtein);

// vitaminIntake
const fruitWithoutSugar = items.find((i) => i.type === 'fruit' && !i.nutritions.sugar);
const anyNut = items.find((i) => i.type === 'nut');
assert.strictEqual(
  vitaminIntake(items),
  (fruitWithoutSugar?.nutritions.vitamins ?? 0) + (anyNut?.nutritions.vitamins ?? 0)
);
