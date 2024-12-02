import { Image } from '@nextui-org/react';
import { IngredientRecipe, WildCardRecipe } from '../types';

function getImageUrl(name: string) {
    return new URL(`../../../assets/alchemy/${name}.webp`, import.meta.url).href;
}

function getWildcardImageUrl() {
    return new URL(`../../../assets/cards/Wildcard.webp`, import.meta.url).href;
}

type RecipesProps = {
    title: string;
    ingredients: IngredientRecipe[] | WildCardRecipe[];
};

export function Recipes({ title, ingredients }: RecipesProps) {
    return (
        <details>
            <summary className="cursor-pointer font-medium">{title}</summary>
            {ingredients.map((item, idx) => (
                <div key={title + idx} className="mb-1 flex gap-1">
                    <div className="contents">
                        <Image src={getImageUrl(item.ingredient_one)} className="h-6 w-6 object-contain" radius="none" />
                        +
                        <Image src={getImageUrl(item.ingredient_two)} className="h-6 w-6 object-contain" radius="none" />
                    </div>
                    <span>=</span>
                    {typeof item.value === 'number' ? (
                        <div className="contents">
                            <span>{item.value}</span>
                            <Image src={getWildcardImageUrl()} className="h-6 w-6 object-contain" radius="none" />
                        </div>
                    ) : (
                        <Image src={getImageUrl(item.value)} className="h-6 w-6 object-contain" radius="none" />
                    )}
                </div>
            ))}
        </details>
    );
}
