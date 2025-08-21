

import { Card, CardContent } from "@/components/ui/card"


export default function OverviewBubbles() {
     const items = [
     { label: "Suggestions", 
       value: 20, 
       color: "bg-purple-400" 
     },
     { label: "Alerts",
       value: 40, 
       color: "bg-cyan-400"
       },
      { label: "Complaints",
       value: 100, 
       color: "bg-orange-400" 
      },
    { label: "Compliments", 
      value: 65, 
      color: "bg-indigo-400" 
    },
  ]
  return(
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
  )
}