import * as z from 'zod';

export type Ingredient =
    | 'Acorn'
    | 'Petal'
    | 'Berries'
    | 'Water'
    | 'Poison'
    | 'Leaf'
    | 'Sand'
    | 'Flame'
    | 'Pepper'
    | 'Steel'
    | 'Feather'
    | 'Beetle'
    | 'Lightning'
    | 'Scale'
    | 'Crystal'
    | 'Tooth'
    | 'Egg'
    | 'Shadow'
    | 'Spirit'
    | 'Essence'
    | 'Power'
    | 'Mushroom';

export type IngredientValue = {
    [key in Ingredient]: number;
};

export type IngredientRecipe = {
    ingredient_one: Ingredient;
    ingredient_two: Ingredient;
    value: Ingredient;
};

export type DustRecipe = {
    ingredient_one: Ingredient;
    ingredient_two: Ingredient;
    value: number;
};

export type WildCardRecipe = {
    ingredient_one: Ingredient;
    ingredient_two: Ingredient;
    value: number;
};

export type IngredientsData = {
    available_ingredients: IngredientValue;
    ingredient_recipes: IngredientRecipe[];
    dust_recipes: DustRecipe[];
    wild_card_recipes: WildCardRecipe[];
    base_ingredients: Ingredient[];
    ignore_ingredients: Ingredient[];
};

export type IngredientFieldConfig = {
    name: Ingredient;
    fieldType: z.ZodNumber;
    active: boolean;
    base?: boolean;
};
