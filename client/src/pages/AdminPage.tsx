import FeedbackDailyOverview from "@/components/FeedbackDailyOverview"
import {FeedbackDailyData} from "@/lib/FeedbackData"
import DashboardChart from "@/components/DashboardChart"

export default function AdminPage(){

  
   return (
   <div className="flex flex-col items-center justify-center gap-15 ml-20">
   <FeedbackDailyOverview title="Feedback Daily Overview" items={FeedbackDailyData}/>
   <div className="w-250">
   <DashboardChart/>
   </div>
   </div>
   )
  
}