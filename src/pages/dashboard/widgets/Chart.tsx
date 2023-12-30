import Chart, { Props } from 'react-apexcharts';

export type ChartProps = {
    title: string;
    chartData: number[];
};

const defaultProps = ({ title, chartData }: ChartProps): Props => {
    return {
        options: {
            chart: {
                height: 50,
                width: '100%',
                sparkline: {
                    enabled: true,
                },
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 800,
                    animateGradually: {
                        enabled: true,
                        delay: 150,
                    },
                    dynamicAnimation: {
                        enabled: true,
                        speed: 350,
                    },
                },
                redrawOnWindowResize: true,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    barHeight: '50%',
                    columnWidth: '20%',
                    distributed: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            tooltip: {
                enabled: true,
                shared: true,
                intersect: false,
                x: {
                    show: false,
                },
            },
        },
        series: [
            {
                name: title,
                data: chartData,
            },
        ],
    };
};

export default function MyChart({ title, chartData }: ChartProps) {
    const { options, series } = defaultProps({ title, chartData });

    return (
        <div className="col-span-5">
            <Chart options={options} series={series} type="bar" />
        </div>
    );
}
