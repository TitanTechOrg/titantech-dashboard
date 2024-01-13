import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, Input, Code, Image } from '@nextui-org/react';
import { useCallback } from 'react';
import { useCalculateAlchemy } from '..';

import Acorn from '@/assets/alchemy/Acorn.webp';
import Leaf from '@/assets/alchemy/Leaf.webp';
import Sand from '@/assets/alchemy/Sand.webp';
import Petal from '@/assets/alchemy/Petal.webp';
import Steel from '@/assets/alchemy/Steel.webp';
import Berries from '@/assets/alchemy/Berries.webp';
import Lightning from '@/assets/alchemy/Lightning.webp';
import Pepper from '@/assets/alchemy/Pepper.webp';
import Scale from '@/assets/alchemy/Scale.webp';
import Power from '@/assets/alchemy/Power.webp';
import Flame from '@/assets/alchemy/Flame.webp';
import Crystal from '@/assets/alchemy/Crystal.webp';
import Egg from '@/assets/alchemy/Egg.webp';
import Essence from '@/assets/alchemy/Essence.webp';
import Feather from '@/assets/alchemy/Feather.webp';
import Spirit from '@/assets/alchemy/Spirit.webp';

const validation = z
    .number()
    .nonnegative({ message: 'Must be a positive number' })
    .min(0, { message: 'Required' })
    .max(128, { message: 'Must be between 0 and 128' });

const ingredients = [
    { name: 'Acorn', fieldType: validation, imgUrl: Acorn },
    { name: 'Leaf', fieldType: validation, imgUrl: Leaf },
    { name: 'Sand', fieldType: validation, imgUrl: Sand },
    { name: 'Petal', fieldType: validation, imgUrl: Petal },
    { name: 'Steel', fieldType: validation, imgUrl: Steel },
    { name: 'Berries', fieldType: validation, imgUrl: Berries },
    { name: 'Lightning', fieldType: validation, imgUrl: Lightning },
    { name: 'Pepper', fieldType: validation, imgUrl: Pepper },
    { name: 'Scale', fieldType: validation, imgUrl: Scale },
    { name: 'Power', fieldType: validation, imgUrl: Power },
    { name: 'Flame', fieldType: validation, imgUrl: Flame },
    { name: 'Crystal', fieldType: validation, imgUrl: Crystal },
    { name: 'Egg', fieldType: validation, imgUrl: Egg },
    { name: 'Essence', fieldType: validation, imgUrl: Essence },
    { name: 'Feather', fieldType: validation, imgUrl: Feather },
    { name: 'Spirit', fieldType: validation, imgUrl: Spirit },
];

type Ingredients = (typeof ingredients)[0];

const schema = z.object(Object.fromEntries(ingredients.map((ingredient) => [ingredient.name, ingredient.fieldType])));

export function AlchemyCalculator() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const { mutate, isPending, reset: resetAlchemyData, data } = useCalculateAlchemy();

    const onSubmit = handleSubmit((data: FieldValues) => mutate(data));

    const resetData = useCallback(() => {
        resetAlchemyData();
        reset();
    }, []);

    return (
        <div className="flex justify-center items-center flex-col gap-4">
            {data == null ? (
                <form onSubmit={onSubmit} className="flex max-w-xs flex-wrap gap-4">
                    {ingredients.map(({ name: ingredient, imgUrl }: Ingredients) => {
                        return (
                            <Input
                                key={ingredient}
                                type="number"
                                label={ingredient}
                                isRequired
                                {...register(ingredient, { valueAsNumber: true })}
                                errorMessage={errors[ingredient]?.message?.toString()}
                                isInvalid={errors[ingredient]?.message != null}
                                color={errors[ingredient]?.message != null ? 'danger' : 'default'}
                                startContent={<Image key={ingredient + 'avatar'} src={imgUrl} radius="none" className="h-6 w-6" />}
                            />
                        );
                    })}
                    <Button type="submit" variant="solid" color="primary" isLoading={isPending} disabled={isPending}>
                        Submit
                    </Button>
                </form>
            ) : (
                <div className="flex flex-col gap-4 w-full">
                    <Code className="whitespace-pre text-left overflow-x-auto">{data}</Code>
                    <Button className="w-2" variant="flat" color="primary" onClick={resetData}>
                        Reset
                    </Button>
                </div>
            )}
        </div>
    );
}
