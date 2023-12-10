import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
    Button,
    Input,
    Code,
    Image,
    Avatar,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Spacer,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
} from '@nextui-org/react';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { ENDPOINTS, instance } from '@/lib/api/axios';

const menuItems = ['Dashboard', 'Alchemy'];

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

function getLogoUrl(): string {
    return new URL(`../../assets/Logo.webp`, import.meta.url).href;
}

const schema = z.object({
    Acorn: z
        .number()
        .nonnegative({ message: 'Must be a positive number' })
        .min(0, { message: 'Required' })
        .max(128, { message: 'Must be between 0 and 128' }),
    Leaf: z
        .number()
        .nonnegative({ message: 'Must be a positive number' })
        .min(0, { message: 'Required' })
        .max(128, { message: 'Must be between 0 and 128' }),
    Sand: z
        .number()
        .nonnegative({ message: 'Must be a positive number' })
        .min(0, { message: 'Required' })
        .max(128, { message: 'Must be between 0 and 128' }),
    Petal: z
        .number()
        .nonnegative({ message: 'Must be a positive number' })
        .min(0, { message: 'Required' })
        .max(128, { message: 'Must be between 0 and 128' }),
    Steel: z
        .number()
        .nonnegative({ message: 'Must be a positive number' })
        .min(0, { message: 'Required' })
        .max(128, { message: 'Must be between 0 and 128' }),
    Berries: z
        .number()
        .nonnegative({ message: 'Must be a positive number' })
        .min(0, { message: 'Required' })
        .max(128, { message: 'Must be between 0 and 128' }),
    Lightning: z
        .number()
        .nonnegative({ message: 'Must be a positive number' })
        .min(0, { message: 'Required' })
        .max(128, { message: 'Must be between 0 and 128' }),
    Pepper: z
        .number()
        .nonnegative({ message: 'Must be a positive number' })
        .min(0, { message: 'Required' })
        .max(128, { message: 'Must be between 0 and 128' }),
    Scale: z
        .number()
        .nonnegative({ message: 'Must be a positive number' })
        .min(0, { message: 'Required' })
        .max(128, { message: 'Must be between 0 and 128' }),
    Power: z
        .number()
        .nonnegative({ message: 'Must be a positive number' })
        .min(0, { message: 'Required' })
        .max(128, { message: 'Must be between 0 and 128' }),
    Flame: z
        .number()
        .nonnegative({ message: 'Must be a positive number' })
        .min(0, { message: 'Required' })
        .max(128, { message: 'Must be between 0 and 128' }),
    Crystal: z
        .number()
        .nonnegative({ message: 'Must be a positive number' })
        .min(0, { message: 'Required' })
        .max(128, { message: 'Must be between 0 and 128' }),
    Egg: z
        .number()
        .nonnegative({ message: 'Must be a positive number' })
        .min(0, { message: 'Required' })
        .max(128, { message: 'Must be between 0 and 128' }),
    Essence: z
        .number()
        .nonnegative({ message: 'Must be a positive number' })
        .min(0, { message: 'Required' })
        .max(128, { message: 'Must be between 0 and 128' }),
    Feather: z
        .number()
        .nonnegative({ message: 'Must be a positive number' })
        .min(0, { message: 'Required' })
        .max(128, { message: 'Must be between 0 and 128' }),
    Spirit: z
        .number()
        .nonnegative({ message: 'Must be a positive number' })
        .min(0, { message: 'Required' })
        .max(128, { message: 'Must be between 0 and 128' }),
});

function Alchemy() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });
    const [isLoading, setLoading] = useState<boolean>(false);
    const [craftingData, setCraftingData] = useState<string | null>(null);

    const fetchAlchemyCrafts = async (data: FieldValues) => {
        try {
            const json: string = JSON.stringify(data);
            const response = await instance.post(ENDPOINTS.alchemy_crafts, json, {
                headers: { 'Content-Type': 'application/json' }, // Overwrite Axios's automatically set Content-Type
            });
            if (response.data) setCraftingData(response.data);
        } catch (err) {
            setCraftingData(null);
        }
    };

    const mutation = useMutation({
        mutationFn: fetchAlchemyCrafts,
        onMutate: () => setLoading(true),
        onSettled: () => setLoading(false),
    });

    const onSubmit = handleSubmit((data: FieldValues) => mutation.mutate(data));

    const resetData = () => {
        setCraftingData(null);
        reset();
    };

    return (
        <>
            <Navbar isBordered isBlurred={true} onMenuOpenChange={setIsMenuOpen}>
                <NavbarContent>
                    <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="sm:hidden" />

                    <NavbarBrand className="gap-2">
                        <Image src={getLogoUrl()} className="h-9 w9" radius="sm" />
                        <p className="font-bold text-inherit">TitanTech</p>
                    </NavbarBrand>
                </NavbarContent>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarItem>
                        <Link color="foreground" href="/dashboard">
                            Dashboard
                        </Link>
                    </NavbarItem>
                    <NavbarItem isActive>
                        <Link href="/alchemy" aria-current="page">
                            Alchemy
                        </Link>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem className="hidden">
                        <Button color="primary" variant="flat">
                            Sign out
                        </Button>
                    </NavbarItem>
                </NavbarContent>
                <NavbarMenu className="z-50 mt-8 pl-12">
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link color={index === 1 ? 'primary' : 'foreground'} className="w-full" href={`/${item}`} size="lg">
                                {item}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </Navbar>
            <div className="flex justify-center items-center flex-col gap-4">
                <Spacer />
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
                        <Button type="submit" variant="solid" color="primary" isLoading={isLoading} disabled={isLoading}>
                            Submit
                        </Button>
                    </form>
                ) : (
                    <div className="flex flex-col gap-4 w-full">
                        <Code className="whitespace-pre text-left overflow-x-auto">{craftingData}</Code>
                        <Button className="w-2" variant="flat" color="primary" onClick={resetData}>
                            Reset
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}

export default Alchemy;
