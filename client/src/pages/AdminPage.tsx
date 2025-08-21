import OverviewBubbles from "@/components/OverviewBubbles"
import DashboardChart from "@/components/DashboardChart"

export default function AdminPage(){

  
   return (
   <div className="flex flex-col items-center justify-center gap-50 ml-50">
   <OverviewBubbles/>
   <DashboardChart/>
   </div>
   )
  
}