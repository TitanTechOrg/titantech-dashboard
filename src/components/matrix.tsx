import { Chart, ChartProps } from 'react-chartjs-2';
export function Matrix(props: Omit<ChartProps, 'type'>) {
    return <Chart type="matrix" {...props} />;
}
