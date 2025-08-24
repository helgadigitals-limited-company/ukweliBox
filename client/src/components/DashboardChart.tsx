import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { ChartContainer} from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { ChartData } from "@/lib/ChartDataType"


 const chartConfig = {
    Suggestions: {
    label: "Suggestions",
    color: "#6463D6",
  },
    Alerts: {
    label: "Alerts",
    color: "#DF0404",
  },
    Complaints: {
    label: "Complaints",
    color: "#F99C30",
  },
    Compliments: {
    label: "Compliments",
    color: "#1D1717",
  },
} satisfies ChartConfig


export default function DashboardChart() {

   const totals = ChartData.reduce(
    (acc, item) => {
      acc.Suggestions += item.Suggestions
      acc.Alerts += item.Alerts
      acc.Complaints += item.Complaints
      acc.Compliments += item.Compliments
      return acc
    },
    { 
      Suggestions: 0, 
      Alerts: 0, 
      Complaints: 0, 
      Compliments: 0 
    }
  )

  return(
  <div>
    <div className="mb-6 flex items-start justify-between">
      <div>
        <h2 className="text-lg font-semibold">Bar Chart</h2>
        <p className="text-2xl text-black-400">
          Showing Total feedbacks in the last year
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 text-right">
        <div>
          <p className="text-2xl text-[var(--color-custom)]">
            {chartConfig.Suggestions.label}
          </p>
          <p className="text-2xl font-bold text-[var(--color-custom)]">
            {totals.Suggestions}
          </p>
        </div>
        <div>
          <p className="text-2xl text-[var(--color-custom2)]">
            {chartConfig.Complaints.label}
          </p>
          <p className="text-2xl font-bold text-[var(--color-custom2)]">
            {totals.Complaints}
          </p>
        </div>
        <div>
          <div>
          <p className="text-2xl text-[var(--color-custom3)]">
            {chartConfig.Compliments.label}
          </p>
          <p className="text-2xl font-bold text-[var(--color-custom3)]">
            {totals.Compliments}
          </p>
        </div>
        </div>
        <div>
          <p className="text-2xl text-[var(--color-custom1)]">
            {chartConfig.Alerts.label}
          </p>
          <p className="text-2xl font-bold text-[var(--color-custom1)]">
            {totals.Alerts}
          </p>
        </div>
      </div>
    </div>

    <ChartContainer config={chartConfig} className="p-6 text-foreground">
    <BarChart accessibilityLayer data={ChartData} className="w-full">
      <CartesianGrid vertical={false} />
      <XAxis
        dataKey="month"
        tickLine={false}
        tickMargin={10}
        axisLine={false}
        tickFormatter={(v) => String(v).slice(0, 3)}
      />
      <ChartTooltip content={<ChartTooltipContent />} />
      <ChartLegend content={<ChartLegendContent />} />
      <Bar dataKey="Suggestions" fill="var(--color-Suggestions)" radius={4} />
      <Bar dataKey="Alerts" fill="var(--color-Alerts)" radius={4} />
      <Bar dataKey="Complaints" fill="var(--color-Complaints)" radius={4} />
      <Bar dataKey="Compliments" fill="var(--color-Compliments)" radius={4} />
    </BarChart>
</ChartContainer>
</div>

  )
}