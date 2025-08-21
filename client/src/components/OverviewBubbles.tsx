import { Card, CardContent } from "@/components/ui/card"


export default function OverviewBubbles() {
     const items = [
     { label: "Suggestions", 
       value: 8, 
       color: "bg-[var(--color-custom)]" 
     },
     { label: "Alerts",
       value: 5, 
       color: "bg-[var(--color-custom1)]"
       },
      { label: "Complaints",
       value: 15, 
       color: "bg-[var(--color-custom2)]" 
      },
    { label: "Compliments", 
      value: 3, 
      color: "bg-[var(--color-custom3)]" 
    },
  ]
  return(
    <div>
    <h1 className="text-3xl font-bold text-center mt-6">Feeback Daily Overview</h1>
     <div className="relative flex flex-wrap justify-center gap-6 mt-6 ml-4 mr-10">
      
      {items.map((item, i) => (
        <Card
          key={i}
          className={`rounded-full ${item.color} w-36 h-36 flex items-center justify-center shadow-xl text-white relative`}
        >
          <CardContent className="text-center flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">{item.value}</span>
            <span className="text-sm">{item.label}</span>
          </CardContent>
        </Card>
      ))}
    </div>
    </div>
  )
}