import * as z from 'zod';
import { IngredientFieldConfig, IngredientRecipe, RaidCardRecipe, WildCardRecipe } from '../types';

const validation = z
    .number({ message: 'Please enter a number between 0 and 128' })
    .nonnegative({ message: 'Must be a positive number' })
    .min(0, { message: 'Required' })
    .max(128, { message: 'Must be between 0 and 128' });

export const ingredients: IngredientFieldConfig[] = [
    { name: 'Acorn', fieldType: validation, active: true },
    { name: 'Petal', fieldType: validation, active: true },
    { name: 'Berries', fieldType: validation, active: true, base: true },
    { name: 'Water', fieldType: validation, active: false },
    { name: 'Poison', fieldType: validation, active: false },
    { name: 'Leaf', fieldType: validation, active: false },
    { name: 'Sand', fieldType: validation, active: true },
    { name: 'Flame', fieldType: validation, active: true },
    { name: 'Pepper', fieldType: validation, active: true, base: true },
    { name: 'Steel', fieldType: validation, active: true },
    { name: 'Mushroom', fieldType: validation, active: true, base: true },
    { name: 'Feather', fieldType: validation, active: true },
    { name: 'Beetle', fieldType: validation, active: true },
    { name: 'Lightning', fieldType: validation, active: false },
    { name: 'Scale', fieldType: validation, active: true },
    { name: 'Crystal', fieldType: validation, active: false },
    { name: 'Tooth', fieldType: validation, active: true },
    { name: 'Egg', fieldType: validation, active: false },
    { name: 'Shadow', fieldType: validation, active: true },
    { name: 'Spirit', fieldType: validation, active: true },
    { name: 'Essence', fieldType: validation, active: true },
    { name: 'Power', fieldType: validation, active: true },
];

export const ingredientRecipes: IngredientRecipe[] = [
    {
        ingredient_one: 'Pepper',
        ingredient_two: 'Berries',
        value: 'Sand',
    },
    {
        ingredient_one: 'Pepper',
        ingredient_two: 'Mushroom',
        value: 'Petal',
    },
    {
        ingredient_one: 'Pepper',
        ingredient_two: 'Sand',
        value: 'Feather',
    },
    {
        ingredient_one: 'Berries',
        ingredient_two: 'Mushroom',
        value: 'Acorn',
    },
    {
        ingredient_one: 'Sand',
        ingredient_two: 'Petal',
        value: 'Spirit',
    },
    {
        ingredient_one: 'Acorn',
        ingredient_two: 'Petal',
        value: 'Shadow',
    },
    {
        ingredient_one: 'Acorn',
        ingredient_two: 'Feather',
        value: 'Essence',
    },
    {
        ingredient_one: 'Shadow',
        ingredient_two: 'Feather',
        value: 'Beetle',
    },
    {
        ingredient_one: 'Spirit',
        ingredient_two: 'Shadow',
        value: 'Power',
    },
    {
        ingredient_one: 'Power',
        ingredient_two: 'Spirit',
        value: 'Steel',
    },
    {
        ingredient_one: 'Beetle',
        ingredient_two: 'Power',
        value: 'Flame',
    },
    {
        ingredient_one: 'Essence',
        ingredient_two: 'Power',
        value: 'Tooth',
    },
    {
        ingredient_one: 'Steel',
        ingredient_two: 'Tooth',
        value: 'Scale',
    },
];

export const wildcardRecipes: WildCardRecipe[] = [
    {
        ingredient_one: 'Sand',
        ingredient_two: 'Power',
        value: 16,
    },
    {
        ingredient_one: 'Power',
        ingredient_two: 'Steel',
        value: 41,
    },
    {
        ingredient_one: 'Tooth',
        ingredient_two: 'Scale',
        value: 84,
    },
    {
        ingredient_one: 'Flame',
        ingredient_two: 'Scale',
        value: 84,
    },
];

export const raidcardRecipes: RaidCardRecipe[] = [
    {
        ingredient_one: 'Sand',
        ingredient_two: 'Mushroom',
        value: 6,
    },
    {
        ingredient_one: 'Berries',
        ingredient_two: 'Spirit',
        value: 10,
    },
    {
        ingredient_one: 'Mushroom',
        ingredient_two: 'Spirit',
        value: 10,
    },
    {
        ingredient_one: 'Sand',
        ingredient_two: 'Shadow',
        value: 12,
    },
    {
        ingredient_one: 'Acorn',
        ingredient_two: 'Shadow',
        value: 12,
    },
    {
        ingredient_one: 'Pepper',
        ingredient_two: 'Essence',
        value: 20,
    },
    {
        ingredient_one: 'Acorn',
        ingredient_two: 'Power',
        value: 22,
    },
    {
        ingredient_one: 'Petal',
        ingredient_two: 'Beetle',
        value: 22,
    },
    {
        ingredient_one: 'Feather',
        ingredient_two: 'Beetle',
        value: 26,
    },
    {
        ingredient_one: 'Spirit',
        ingredient_two: 'Beetle',
        value: 26,
    },
    {
        ingredient_one: 'Acorn',
        ingredient_two: 'Flame',
        value: 40,
    },
    {
        ingredient_one: 'Flame',
        ingredient_two: 'Feather',
        value: 45,
    },
    {
        ingredient_one: 'Steel',
        ingredient_two: 'Feather',
        value: 45,
    },
    {
        ingredient_one: 'Essence',
        ingredient_two: 'Flame',
        value: 54,
    },
    {
        ingredient_one: 'Essence',
        ingredient_two: 'Steel',
        value: 54,
    },
    {
        ingredient_one: 'Acorn',
        ingredient_two: 'Scale',
        value: 79,
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
