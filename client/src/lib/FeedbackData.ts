
export type FeedbackDataItems={
  label: string
  value: number
  color: string
}

export const FeedbackDailyData: FeedbackDataItems[] = [
  { 
     label: "Suggestions",
     value: 8, 
     color: "bg-[var(--color-custom)]" 
    },
  { 
     label: "Alerts", 
     value: 5,
     color: "bg-[var(--color-custom1)]"
     },
  { 
    label: "Complaints", 
    value: 15, 
    color: "bg-[var(--color-custom2)]"
   },
  { 
    label: "Compliments", 
    value: 12, 
    color: "bg-[var(--color-custom3)]" 
  },
]