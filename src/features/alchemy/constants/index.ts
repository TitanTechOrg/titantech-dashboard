import * as z from 'zod';
import { IngredientFieldConfig, IngredientRecipe, RaidCardRecipe, WildCardRecipe } from '../types';

const validation = z
    .number({ message: 'Please enter a number between 0 and 128' })
    .nonnegative({ message: 'Must be a positive number' })
    .min(0, { message: 'Required' })
    .max(128, { message: 'Must be between 0 and 128' });

export const ingredients: IngredientFieldConfig[] = [
    { name: 'Acorn', fieldType: validation, active: true, base: false, order: 10 },
    { name: 'Petal', fieldType: validation, active: false, base: false, order: 0 },
    { name: 'Berries', fieldType: validation, active: true, base: false, order: 15 },
    { name: 'Water', fieldType: validation, active: true, base: true, order: 1 },
    { name: 'Poison', fieldType: validation, active: true, base: true, order: 4 },
    { name: 'Leaf', fieldType: validation, active: true, base: false, order: 16 },
    { name: 'Sand', fieldType: validation, active: true, base: false, order: 7 },
    { name: 'Flame', fieldType: validation, active: true, base: false, order: 5 },
    { name: 'Pepper', fieldType: validation, active: true, base: false, order: 14 },
    { name: 'Steel', fieldType: validation, active: false, base: false, order: 0 },
    { name: 'Mushroom', fieldType: validation, active: true, base: false, order: 11 },
    { name: 'Feather', fieldType: validation, active: true, base: false, order: 8 },
    { name: 'Beetle', fieldType: validation, active: false, base: false, order: 0 },
    { name: 'Lightning', fieldType: validation, active: false, base: false, order: 0 },
    { name: 'Scale', fieldType: validation, active: true, base: true, order: 2 },
    { name: 'Crystal', fieldType: validation, active: false, base: false, order: 0 },
    { name: 'Tooth', fieldType: validation, active: false, base: false, order: 0 },
    { name: 'Egg', fieldType: validation, active: true, base: false, order: 12 },
    { name: 'Shadow', fieldType: validation, active: true, base: false, order: 13 },
    { name: 'Spirit', fieldType: validation, active: true, base: false, order: 9 },
    { name: 'Essence', fieldType: validation, active: true, base: false, order: 6 },
    { name: 'Power', fieldType: validation, active: true, base: true, order: 3 },
];

export const ingredientRecipes: IngredientRecipe[] = [
    {
        ingredient_one: 'Water',
        ingredient_two: 'Scale',
        value: 'Flame',
    },
    {
        ingredient_one: 'Scale',
        ingredient_two: 'Power',
        value: 'Essence',
    },
    {
        ingredient_one: 'Poison',
        ingredient_two: 'Power',
        value: 'Sand',
    },
    {
        ingredient_one: 'Flame',
        ingredient_two: 'Water',
        value: 'Feather',
    },
    {
        ingredient_one: 'Essence',
        ingredient_two: 'Poison',
        value: 'Acorn',
    },
    {
        ingredient_one: 'Sand',
        ingredient_two: 'Essence',
        value: 'Spirit',
    },
    {
        ingredient_one: 'Spirit',
        ingredient_two: 'Sand',
        value: 'Egg',
    },
    {
        ingredient_one: 'Acorn',
        ingredient_two: 'Flame',
        value: 'Pepper',
    },
    {
        ingredient_one: 'Acorn',
        ingredient_two: 'Feather',
        value: 'Mushroom',
    },
    {
        ingredient_one: 'Mushroom',
        ingredient_two: 'Acorn',
        value: 'Leaf',
    },
    {
        ingredient_one: 'Egg',
        ingredient_two: 'Mushroom',
        value: 'Shadow',
    },
    {
        ingredient_one: 'Pepper',
        ingredient_two: 'Shadow',
        value: 'Berries',
    },
];

export const wildcardRecipes: WildCardRecipe[] = [
    {
        ingredient_one: 'Water',
        ingredient_two: 'Shadow',
        value: 36,
    },
    {
        ingredient_one: 'Scale',
        ingredient_two: 'Shadow',
        value: 37,
    },
    {
        ingredient_one: 'Sand',
        ingredient_two: 'Pepper',
        value: 48,
    },
    {
        ingredient_one: 'Pepper',
        ingredient_two: 'Acorn',
        value: 50,
    },
    {
        ingredient_one: 'Berries',
        ingredient_two: 'Power',
        value: 79,
    },
    {
        ingredient_one: 'Berries',
        ingredient_two: 'Leaf',
        value: 228,
    },
];

export const raidcardRecipes: RaidCardRecipe[] = [
    {
        ingredient_one: 'Water',
        ingredient_two: 'Sand',
        value: 12,
    },
    {
        ingredient_one: 'Poison',
        ingredient_two: 'Sand',
        value: 13,
    },
    {
        ingredient_one: 'Power',
        ingredient_two: 'Spirit',
        value: 22,
    },
    {
        ingredient_one: 'Sand',
        ingredient_two: 'Acorn',
        value: 25,
    },
    {
        ingredient_one: 'Spirit',
        ingredient_two: 'Acorn',
        value: 31,
    },
    {
        ingredient_one: 'Flame',
        ingredient_two: 'Egg',
        value: 44,
    },
    {
        ingredient_one: 'Spirit',
        ingredient_two: 'Mushroom',
        value: 46,
    },
    {
        ingredient_one: 'Spirit',
        ingredient_two: 'Egg',
        value: 55,
    },
    {
        ingredient_one: 'Spirit',
        ingredient_two: 'Pepper',
        value: 70,
    },
    {
        ingredient_one: 'Berries',
        ingredient_two: 'Sand',
        value: 111,
    },
    {
        ingredient_one: 'Spirit',
        ingredient_two: 'Leaf',
        value: 220,
    },
];

// Selling equipment gives 1 diamond for Common and Event, 5 for Rare, 25 for Legendary, and 100 for Mythic

// export const diamondRecipes: DiamondRecipe[] = [
//     {
//         ingredient_one: 'Pepper',
//         ingredient_two: 'Sand',
//         value: 18 * 1, // 18 common eq
//     },
//     {
//         ingredient_one: 'Pepper',
//         ingredient_two: 'Spirit',
//         value: 32 * 1, // 32 common eq
//     },
//     {
//         ingredient_one: 'Petal',
//         ingredient_two: 'Pepper',
//         value: 1 * 1, // 1 event eq
//     },
//     {
//         ingredient_one: 'Petal',
//         ingredient_two: 'Berries',
//         value: 1 * 1, // 1 event eq
//     },
//     {
//         ingredient_one: 'Petal',
//         ingredient_two: 'Mushroom',
//         value: 1 * 1, // 1 event eq
//     },
//     {
//         ingredient_one: 'Petal',
//         ingredient_two: 'Feather',
//         value: 1 * 1, // 1 event eq
//     },
//     {
//         ingredient_one: 'Petal',
//         ingredient_two: 'Petal',
//         value: 1 * 1, // 1 event eq
//     },
//     {
//         ingredient_one: 'Sand',
//         ingredient_two: 'Mushroom',
//         value: 1 * 5, // 1 rare eq
//     },
//     {
//         ingredient_one: 'Sand',
//         ingredient_two: 'Sand',
//         value: 2 * 5, // 2 rare eq
//     },
//     {
//         ingredient_one: 'Sand',
//         ingredient_two: 'Essence',
//         value: 6 * 5, // 6 rare eq
//     },
//     {
//         ingredient_one: 'Sand',
//         ingredient_two: 'Scale',
//         value: 23 * 5, // 23 rare eq
//     },
//     {
//         ingredient_one: 'Power',
//         ingredient_two: 'Shadow',
//         value: 1 * 25, // 1 leg eq
//     },
//     {
//         ingredient_one: 'Power',
//         ingredient_two: 'Feather',
//         value: 1 * 25, // 1 leg eq
//     },
//     {
//         ingredient_one: 'Power',
//         ingredient_two: 'Spirit',
//         value: 1 * 25, // 1 leg eq
//     },
//     {
//         ingredient_one: 'Power',
//         ingredient_two: 'Power',
//         value: 1 * 25, // 1 leg eq
//     },
//     {
//         ingredient_one: 'Scale',
//         ingredient_two: 'Scale',
//         value: 1 * 100, // 1 unique eq
//     },
// ];
