import { PageContainer } from '@/components/page-container';
import { AlchemyCalculator, ingredientRecipes, Recipes, wildcardRecipes } from '@/features/alchemy';

export default function Alchemy() {
    return (
        <PageContainer>
            <div className="flex flex-col gap-6">
                <div className="text-left">
                    <h1 className="text-2xl font-bold">Alchemy calculator</h1>
                    <p>
                        Use the calculator to optimize alchemy ingredients to craft the most wildcards possible. Fill in your ingredients to get
                        started.
                    </p>
                </div>
                <div className="flex flex-col flex-wrap items-start justify-evenly gap-4 sm:flex-row">
                    <Recipes title="Craftable ingredients" ingredients={ingredientRecipes} />
                    <Recipes title="Wildcard recipes" ingredients={wildcardRecipes} />
                </div>

                <AlchemyCalculator />
            </div>
        </PageContainer>
    );
}
