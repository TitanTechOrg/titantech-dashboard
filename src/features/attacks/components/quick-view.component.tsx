import { TitanSequence } from '@/features/titans';
import { TitanPart } from '..';
import { percentage } from '@/utils/number-formatter';

type QuickViewProps = {
    data: TitanPart[];
    titan: TitanSequence | undefined;
    isCompactView?: boolean;
};

// based on from: bg-red-50 to: bg-red-600
const MappedPercentage = {
    0: 'bg-transparent',
    1: 'bg-[rgb(253.66,239.96,239.96)]',
    2: 'bg-[rgb(253.32,237.92,237.92)]',
    3: 'bg-[rgb(252.98,235.88,235.88)]',
    4: 'bg-[rgb(252.64,233.84,233.84)]',
    5: 'bg-[rgb(252.3,231.8,231.8)]',
    6: 'bg-[rgb(251.96,229.76,229.76)]',
    7: 'bg-[rgb(251.62,227.72,227.72)]',
    8: 'bg-[rgb(251.28,225.68,225.68)]',
    9: 'bg-[rgb(250.94,223.64,223.64)]',
    10: 'bg-[rgb(250.6,221.6,221.6)]',
    11: 'bg-[rgb(250.26,219.56,219.56)]',
    12: 'bg-[rgb(249.92,217.52,217.52)]',
    13: 'bg-[rgb(249.58,215.48,215.48)]',
    14: 'bg-[rgb(249.24,213.44,213.44)]',
    15: 'bg-[rgb(248.9,211.4,211.4)]',
    16: 'bg-[rgb(248.56,209.36,209.36)]',
    17: 'bg-[rgb(248.22,207.32,207.32)]',
    18: 'bg-[rgb(247.88,205.28,205.28)]',
    19: 'bg-[rgb(247.54,203.24,203.24)]',
    20: 'bg-[rgb(247.2,201.2,201.2)]',
    21: 'bg-[rgb(246.86,199.16,199.16)]',
    22: 'bg-[rgb(246.52,197.12,197.12)]',
    23: 'bg-[rgb(246.18,195.07999999999998,195.07999999999998)]',
    24: 'bg-[rgb(245.84,193.04,193.04)]',
    25: 'bg-[rgb(245.5,191,191)]',
    26: 'bg-[rgb(245.16,188.96,188.96)]',
    27: 'bg-[rgb(244.82,186.92,186.92)]',
    28: 'bg-[rgb(244.48,184.88,184.88)]',
    29: 'bg-[rgb(244.14,182.84,182.84)]',
    30: 'bg-[rgb(243.8,180.8,180.8)]',
    31: 'bg-[rgb(243.46,178.76,178.76)]',
    32: 'bg-[rgb(243.12,176.72,176.72)]',
    33: 'bg-[rgb(242.78,174.68,174.68)]',
    34: 'bg-[rgb(242.44,172.64,172.64)]',
    35: 'bg-[rgb(242.1,170.60000000000002,170.60000000000002)]',
    36: 'bg-[rgb(241.76,168.56,168.56)]',
    37: 'bg-[rgb(241.42,166.51999999999998,166.51999999999998)]',
    38: 'bg-[rgb(241.08,164.48000000000002,164.48000000000002)]',
    39: 'bg-[rgb(240.74,162.44,162.44)]',
    40: 'bg-[rgb(240.4,160.39999999999998,160.39999999999998)]',
    41: 'bg-[rgb(240.06,158.36,158.36)]',
    42: 'bg-[rgb(239.72,156.32,156.32)]',
    43: 'bg-[rgb(239.38,154.28,154.28)]',
    44: 'bg-[rgb(239.04,152.24,152.24)]',
    45: 'bg-[rgb(238.7,150.2,150.2)]',
    46: 'bg-[rgb(238.36,148.16,148.16)]',
    47: 'bg-[rgb(238.02,146.12,146.12)]',
    48: 'bg-[rgb(237.68,144.07999999999998,144.07999999999998)]',
    49: 'bg-[rgb(237.34,142.04000000000002,142.04000000000002)]',
    50: 'bg-[rgb(237,140,140)]',
    51: 'bg-[rgb(236.66,137.95999999999998,137.95999999999998)]',
    52: 'bg-[rgb(236.32,135.92000000000002,135.92000000000002)]',
    53: 'bg-[rgb(235.98,133.88,133.88)]',
    54: 'bg-[rgb(235.64,131.83999999999997,131.83999999999997)]',
    55: 'bg-[rgb(235.3,129.8,129.8)]',
    56: 'bg-[rgb(234.96,127.75999999999999,127.75999999999999)]',
    57: 'bg-[rgb(234.62,125.72000000000001,125.72000000000001)]',
    58: 'bg-[rgb(234.28,123.68,123.68)]',
    59: 'bg-[rgb(233.94,121.64,121.64)]',
    60: 'bg-[rgb(233.6,119.60000000000001,119.60000000000001)]',
    61: 'bg-[rgb(233.26,117.56,117.56)]',
    62: 'bg-[rgb(232.92000000000002,115.52,115.52)]',
    63: 'bg-[rgb(232.57999999999998,113.47999999999999,113.47999999999999)]',
    64: 'bg-[rgb(232.24,111.44,111.44)]',
    65: 'bg-[rgb(231.9,109.4,109.4)]',
    66: 'bg-[rgb(231.56,107.35999999999999,107.35999999999999)]',
    67: 'bg-[rgb(231.22,105.32,105.32)]',
    68: 'bg-[rgb(230.88,103.28,103.28)]',
    69: 'bg-[rgb(230.54,101.24000000000001,101.24000000000001)]',
    70: 'bg-[rgb(230.2,99.20000000000002,99.20000000000002)]',
    71: 'bg-[rgb(229.86,97.16,97.16)]',
    72: 'bg-[rgb(229.52,95.12,95.12)]',
    73: 'bg-[rgb(229.18,93.08000000000001,93.08000000000001)]',
    74: 'bg-[rgb(228.84,91.03999999999999,91.03999999999999)]',
    75: 'bg-[rgb(228.5,89,89)]',
    76: 'bg-[rgb(228.16,86.96000000000001,86.96000000000001)]',
    77: 'bg-[rgb(227.82,84.91999999999999,84.91999999999999)]',
    78: 'bg-[rgb(227.48,82.88,82.88)]',
    79: 'bg-[rgb(227.14,80.84,80.84)]',
    80: 'bg-[rgb(226.8,78.79999999999998,78.79999999999998)]',
    81: 'bg-[rgb(226.46,76.75999999999999,76.75999999999999)]',
    82: 'bg-[rgb(226.12,74.72,74.72)]',
    83: 'bg-[rgb(225.78,72.68,72.68)]',
    84: 'bg-[rgb(225.44,70.64000000000001,70.64000000000001)]',
    85: 'bg-[rgb(225.1,68.6,68.6)]',
    86: 'bg-[rgb(224.76,66.56,66.56)]',
    87: 'bg-[rgb(224.42000000000002,64.52000000000001,64.52000000000001)]',
    88: 'bg-[rgb(224.07999999999998,62.47999999999999,62.47999999999999)]',
    89: 'bg-[rgb(223.74,60.44,60.44)]',
    90: 'bg-[rgb(223.4,58.400000000000006,58.400000000000006)]',
    91: 'bg-[rgb(223.06,56.359999999999985,56.359999999999985)]',
    92: 'bg-[rgb(222.72,54.31999999999999,54.31999999999999)]',
    93: 'bg-[rgb(222.38,52.28,52.28)]',
    94: 'bg-[rgb(222.04,50.24000000000001,50.24000000000001)]',
    95: 'bg-[rgb(221.7,48.20000000000002,48.20000000000002)]',
    96: 'bg-[rgb(221.36,46.16,46.16)]',
    97: 'bg-[rgb(221.02,44.120000000000005,44.120000000000005)]',
    98: 'bg-[rgb(220.68,42.08000000000001,42.08000000000001)]',
    99: 'bg-[rgb(220.34,40.03999999999999,40.03999999999999)]',
    100: 'bg-[rgb(220,38,38)]',
} as const;

type MappedPercentageType = keyof typeof MappedPercentage;

const getBackgroundColour = (findPartOnName: string, parts: TitanPart[], totalDamage: number) => {
    const foundPart = parts.find((part) => part.name === findPartOnName);

    let key: MappedPercentageType = 0;

    if (!foundPart) return MappedPercentage[key];

    key = Math.round(percentage(totalDamage, foundPart.value)) as MappedPercentageType;

    return MappedPercentage[key];
};

export function QuickView({ data, titan, isCompactView = false }: QuickViewProps) {
    const totalDamage = data.reduce((prev, curr) => prev + curr.value, 0);

    const classes = isCompactView
        ? `flex flex-col text-center items-center justify-center scale-75 max-h-16`
        : `flex flex-col text-center absolute -top-12 right-16`;

    return (
        <div className={`${classes}`}>
            <span>{titan?.name}</span>
            <div className="flex flex-row items-center justify-center gap-0">
                <div className={`border-1 border-gray-400 min-w-6 ${getBackgroundColour('ArmUpperRight', data, totalDamage)}`}>&nbsp;</div>
                <div className={`border-1 border-x-0 border-gray-400 min-w-6 ${getBackgroundColour('Head', data, totalDamage)}`}>&nbsp;</div>
                <div className={`border-1 border-gray-400 min-w-6 ${getBackgroundColour('ArmUpperLeft', data, totalDamage)}`}>&nbsp;</div>
            </div>
            <div className="flex flex-row items-center justify-center gap-0">
                <div className={`border-1 border-t-0 border-gray-400 min-w-6 ${getBackgroundColour('HandRight', data, totalDamage)}`}>&nbsp;</div>
                <div className={`border-1 border-t-0 border-x-0 border-gray-400 min-w-6 ${getBackgroundColour('ChestUpper', data, totalDamage)}`}>
                    &nbsp;
                </div>
                <div className={`border-1 border-t-0 border-gray-400 min-w-6 ${getBackgroundColour('HandLeft', data, totalDamage)}`}>&nbsp;</div>
            </div>
            <div className="flex flex-row items-center justify-center gap-0">
                <div className={`border-1 border-t-0 border-r-0 border-gray-400 min-w-6 ${getBackgroundColour('LegUpperRight', data, totalDamage)}`}>
                    &nbsp;
                </div>
                <div className={`border-1 border-t-0 border-gray-400 min-w-6 ${getBackgroundColour('LegUpperLeft', data, totalDamage)}`}>&nbsp;</div>
            </div>
        </div>
    );
}
