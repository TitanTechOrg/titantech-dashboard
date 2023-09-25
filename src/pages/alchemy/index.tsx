import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';

import { Button, Input, Code, Divider, Avatar } from '@nextui-org/react';
import { useState } from 'react';

const ingregients: string[] = [
    'Acorn',
    'Leaf',
    'Sand',
    'Petal',
    'Steel',
    'Berries',
    'Lightning',
    'Pepper',
    'Scale',
    'Power',
    'Flame',
    'Crystal',
    'Egg',
    'Essence',
    'Feather',
    'Spirit',
];

function getImageUrl(name: string): string {
    return new URL(`../../assets/alchemy/${ingregients.find((imgName) => imgName === name)}.webp`, import.meta.url).href;
}

const schema = z.object({
    Acorn: z.number().nonnegative({ message: 'Must be a positive number' }).min(0, { message: 'Required' }),
    Leaf: z.number().nonnegative({ message: 'Must be a positive number' }).min(0, { message: 'Required' }),
    Sand: z.number().nonnegative({ message: 'Must be a positive number' }).min(0, { message: 'Required' }),
    Petal: z.number().nonnegative({ message: 'Must be a positive number' }).min(0, { message: 'Required' }),
    Steel: z.number().nonnegative({ message: 'Must be a positive number' }).min(0, { message: 'Required' }),
    Berries: z.number().nonnegative({ message: 'Must be a positive number' }).min(0, { message: 'Required' }),
    Lightning: z.number().nonnegative({ message: 'Must be a positive number' }).min(0, { message: 'Required' }),
    Pepper: z.number().nonnegative({ message: 'Must be a positive number' }).min(0, { message: 'Required' }),
    Scale: z.number().nonnegative({ message: 'Must be a positive number' }).min(0, { message: 'Required' }),
    Power: z.number().nonnegative({ message: 'Must be a positive number' }).min(0, { message: 'Required' }),
    Flame: z.number().nonnegative({ message: 'Must be a positive number' }).min(0, { message: 'Required' }),
    Crystal: z.number().nonnegative({ message: 'Must be a positive number' }).min(0, { message: 'Required' }),
    Egg: z.number().nonnegative({ message: 'Must be a positive number' }).min(0, { message: 'Required' }),
    Essence: z.number().nonnegative({ message: 'Must be a positive number' }).min(0, { message: 'Required' }),
    Feather: z.number().nonnegative({ message: 'Must be a positive number' }).min(0, { message: 'Required' }),
    Spirit: z.number().nonnegative({ message: 'Must be a positive number' }).min(0, { message: 'Required' }),
});

function Alchemy() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const [craftingData, setCraftingData] = useState<string | null>(null);

    const fetchAlchemyCrafts = async (data: FieldValues) => {
        try {
            const json: string = JSON.stringify(data);
            const response = await axios.post('https://titantech-dashboard-alchemy-zkrb6b3q4q-ew.a.run.app/api/v3/alchemy', json, {
                headers: { 'Content-Type': 'application/json' }, // Overwrite Axios's automatically set Content-Type
            });

            if (response.data) setCraftingData(response.data);
        } catch (err) {
            setCraftingData(null);
        }
    };

    const onSubmit = handleSubmit((data: FieldValues) => fetchAlchemyCrafts(data));
    const resetData = () => {
        setCraftingData(null);
        reset();
    };

    return (
        <div className="flex justify-center items-center flex-col gap-4">
            <h4 className="font-bold text-large">TT2 Alchemy Event Dust Calculator</h4>
            <h3 className="font-normal text-foreground/90">by TitanTech</h3>
            <Divider />
            {craftingData == null ? (
                <form onSubmit={onSubmit} className="flex max-w-xs flex-wrap md:flex-wrap gap-4">
                    {ingregients.map((ingredient: string) => {
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
                                startContent={
                                    <Avatar key={ingredient + 'avatar'} src={getImageUrl(ingredient)} size="sm" radius="sm" className="h-6 w-6" />
                                }
                            />
                        );
                    })}
                    <Button type="submit" variant="solid" color="primary">
                        Submit
                    </Button>
                </form>
            ) : (
                <div className="flex flex-col gap-4">
                    <Code className="whitespace-pre text-left overflow-x-auto">{craftingData}</Code>
                    <Button variant="solid" color="primary" onClick={resetData}>
                        Reset
                    </Button>
                </div>
            )}
        </div>
    );
}

export default Alchemy;
