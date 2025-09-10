import {
  Card,
  CardBody,
  CardHeader,
  Code,
  CodeProps,
  Divider,
  Spinner,
} from '@heroui/react';
import { ChartData as ChartDataPropType } from 'chart.js';
import { Fragment, lazy, Suspense } from 'react';

const Doughnut = lazy(() =>
  import('react-chartjs-2').then((module) => ({ default: module.Doughnut }))
);

type DonutChartDataLabels = {
  title: string;
  value: string | number;
  colour: CodeProps['color'];
};

type DonutChartDataProps = {
  chartData: ChartDataPropType<'doughnut', number[], string>;
  title: string;
  labels: DonutChartDataLabels[];
};

export function DonutChartData({
  chartData,
  labels,
  title,
}: DonutChartDataProps) {
  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader className="text-lg font-medium">{title}</CardHeader>
      <CardBody>
        <Divider className="mt-0 mb-4" />
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="h-32 w-32">
            <Suspense fallback={<Spinner label="Loading chart..." />}>
              <Doughnut data={chartData} />
            </Suspense>
          </div>
          <Divider className="h-auto" orientation="vertical" />
          <div className="flex w-full flex-col gap-2">
            {labels.map((val, index) => {
              return (
                <Fragment key={val.title}>
                  <div className="flex flex-row justify-between gap-12">
                    <Code color={val.colour}>{val.title}</Code>
                    {val.value}
                  </div>
                  {index !== labels.length - 1 ? <Divider /> : null}
                </Fragment>
              );
            })}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
