import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { ChartContainer} from "@/components/ui/chart"
import { type ChartConfig } from "@/components/ui/chart"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"

  const chartData = [
  { 
    month: "January", 
    Suggestions: 54, 
    Alerts: 10,
    Complaints: 50,
    Compliments: 30,
  },
  { 
    month: "February", 
    Suggestions: 56, 
    Alerts: 8,
    Complaints: 20,
    Compliments: 15,
   },
  {
    month: "March",
    Suggestions: 49, 
    Alerts: 18,
    Complaints: 30,
    Compliments: 9,
    },
  { 
    month: "April", 
    Suggestions: 20, 
    Alerts: 22,
    Complaints: 8,
    Compliments: 12,
  },
  { 
    month: "May", 
    Suggestions: 16, 
    Alerts: 17,
    Complaints: 9,
    Compliments: 8,
  },
  { 
    month: "June", 
    Suggestions: 37, 
    Alerts: 12,
    Complaints: 17,
    Compliments: 16,
  },
  { 
    month: "July", 
    Suggestions: 22, 
    Alerts: 15,
    Complaints: 27,
    Compliments: 34,
  },
  { 
    month: "August", 
    Suggestions: 21, 
    Alerts: 19,
    Complaints: 34,
    Compliments: 18,
  },
  { 
    month: "September", 
    Suggestions: 45, 
    Alerts: 10,
    Complaints: 17,
    Compliments: 29,
  },
  { 
    month: "October", 
    Suggestions: 39, 
    Alerts: 18,
    Complaints: 25,
    Compliments: 33,
  },
  { 
    month: "November", 
    Suggestions: 32, 
    Alerts: 26,
    Complaints: 41,
    Compliments: 30,
  },
  { 
    month: "December", 
    Suggestions: 50, 
    Alerts: 20,
    Complaints: 15,
    Compliments: 27,
  },
]

 const chartConfig = {
    Suggestions: {
    label: "suggestions",
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

  return(
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false}/>
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="Suggestions" fill="var(--color-Suggestions)" radius={2} />
        <Bar dataKey="Alerts" fill="var(--color-Alerts)" radius={2} />
        <Bar dataKey="Complaints" fill="var(--color-Complaints)" radius={2} />
        <Bar dataKey="Compliments" fill="var(--color-Compliments)" radius={2}/>
      </BarChart>
    </ChartContainer>

    
  )
}