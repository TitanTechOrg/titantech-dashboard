import TitanSelector from '@/features/raid-simulator/components/titan-selector';

export default function RaidSimulator() {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex w-full max-w-3xl flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">Raid Simulator</h1>
                {/* <p className="mb-4 text-center">Simulate your raid with the cards you have.</p> */}
                {/* <p className="text-xs italic">This is a work in progress. Please report any bugs.</p> */}
            </div>
            <div>
                <TitanSelector />
            </div>
        </div>
    );
}
