import { Skeleton } from '@nextui-org/react';

type CardTextsProps = {
    title: string;
    description: string | number;
    isLoading?: boolean;
};

export function CardTexts({ title, description, isLoading }: CardTextsProps) {
    return (
        <Skeleton isLoaded={!!isLoading}>
            <div className="flex flex-row items-center justify-between gap-12">
                <span>{title}</span>
                <span>{description}</span>
            </div>
        </Skeleton>
    );
}
