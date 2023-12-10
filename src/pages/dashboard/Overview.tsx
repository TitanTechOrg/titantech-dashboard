import { BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export type ChartData = {
    labels: string;
    attacks: number;
};

type Props = {
    data: ChartData[];
};

export function Overview({ data }: Props) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="category" dataKey="labels" className="hidden" />
                <YAxis type="number" dataKey="attacks" />
                <Tooltip />
                <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '20px' }} />
                <ReferenceLine y={0} stroke="#000" />
                <Brush dataKey="attacks" height={20} stroke="#8884d8" />
                <Bar dataKey="attacks" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
}
