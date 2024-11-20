import * as z from 'zod';
import { IngredientFieldConfig, IngredientRecipe, WildCardRecipe } from '../types';

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
        ingredient_one: 'Sand',
        ingredient_two: 'Acorn',
        value: 'Feather',
    },
    {
        ingredient_one: 'Acorn',
        ingredient_two: 'Petal',
        value: 'Shadow',
    },
    {
        ingredient_one: 'Shadow',
        ingredient_two: 'Feather',
        value: 'Power',
    },
    {
        ingredient_one: 'Spirit',
        ingredient_two: 'Feather',
        value: 'Beetle',
    },
    {
        ingredient_one: 'Spirit',
        ingredient_two: 'Shadow',
        value: 'Essence',
    },
    {
        ingredient_one: 'Power',
        ingredient_two: 'Essence',
        value: 'Steel',
    },
    {
        ingredient_one: 'Beetle',
        ingredient_two: 'Essence',
        value: 'Flame',
    },
    {
        ingredient_one: 'Beetle',
        ingredient_two: 'Power',
        value: 'Tooth',
    },
    {
        ingredient_one: 'Steel',
        ingredient_two: 'Flame',
        value: 'Scale',
    },
];

export const wildcardRecipes: WildCardRecipe[] = [
    {
        ingredient_one: 'Flame',
        ingredient_two: 'Sand',
        value: 30,
    },
    {
        ingredient_one: 'Flame',
        ingredient_two: 'Shadow',
        value: 34,
    },
    {
        ingredient_one: 'Flame',
        ingredient_two: 'Power',
        value: 41,
    },
    {
        ingredient_one: 'Flame',
        ingredient_two: 'Tooth',
        value: 55,
    },
    {
        ingredient_one: 'Flame',
        ingredient_two: 'Scale',
        value: 84,
    },
];
