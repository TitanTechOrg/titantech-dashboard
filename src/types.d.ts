import { TooltipPositionerFunction } from 'chart.js';

declare module 'chart.js' {
    interface TooltipPositionerMap {
        myCustomPositioner: TooltipPositionerFunction<ChartType>;
    }
}
