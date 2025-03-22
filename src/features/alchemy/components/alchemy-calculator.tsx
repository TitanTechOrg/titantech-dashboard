import { Button, Code, Image, Input } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import * as z from 'zod';
import { ingredientRecipes, ingredients, raidcardRecipes, wildcardRecipes } from '../constants';
import { useCalculateAlchemy } from '../hooks/useCalculateAlchemy';
import { IngredientsData } from '../types';

function getImageUrl(name: string) {
    return new URL(`../../../assets/alchemy/${name}.webp`, import.meta.url).href;
}

export function AlchemyCalculator() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(
            z.object(
                Object.fromEntries(ingredients.filter((ingredient) => ingredient.active).map((ingredient) => [ingredient.name, ingredient.fieldType]))
            )
        ),
    });

    const { mutate, isPending, reset: resetAlchemyData, data } = useCalculateAlchemy();

    const onSubmit = handleSubmit((formData: FieldValues) => {
        // Prepare the request body
        const available_ingredients = Object.fromEntries(
            ingredients.filter((ingredient) => ingredient.active).map((ingredient) => [ingredient.name, formData[ingredient.name] || 0])
        ) as IngredientsData['available_ingredients'];

        const payload: IngredientsData = {
            available_ingredients,
            ingredient_recipes: ingredientRecipes, // Add dynamic or static recipes
            dust_recipes: [], // Add dynamic or static recipes
            wild_card_recipes: wildcardRecipes, // Add dynamic or static recipes
            raid_card_recipes: raidcardRecipes,
            base_ingredients: ingredients.filter((ingredient) => ingredient.base).map((ingredient) => ingredient.name),
            ignore_ingredients: [], // ingredients.filter((ingredient) => !ingredient.active).map((ingredient) => ingredient.name),
        };

        mutate(payload);
    });

    const resetData = useCallback(() => {
        resetAlchemyData();
        reset();
    }, [resetAlchemyData, reset]);

    if (data) {
        return (
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="flex w-full flex-col gap-4">
                    <Code className="overflow-x-auto whitespace-pre text-left">{data}</Code>
                    <div>
                        <Button className="w-2" variant="flat" color="primary" onPress={resetData}>
                            Reset
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <form onSubmit={onSubmit} className="contents">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {ingredients
                        .filter((ingredient) => ingredient.active)
                        .sort((a, b) => (b.base ? 1 : 0) - (a.base ? 1 : 0))
                        .map(({ name }) => (
                            <Input
                                className="max-w-xs"
                                key={name}
                                type="number"
                                label={name}
                                labelPlacement="outside"
                                isRequired={true}
                                {...register(name, { valueAsNumber: true })}
                                errorMessage={errors[name]?.message?.toString()}
                                isInvalid={errors[name]?.message != null}
                                color={errors[name]?.message != null ? 'danger' : 'default'}
                                startContent={<Image key={name + 'avatar'} src={getImageUrl(name)} radius="none" className="h-6 w-6" />}
                            />
                        ))}
                </div>
                <Button type="submit" variant="solid" color="primary" isLoading={isPending} disabled={isPending}>
                    Calculate
                </Button>
            </form>
        </div>
    );
}
