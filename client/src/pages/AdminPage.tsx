import FeedbackDailyOverview from "@/components/FeedbackDailyOverview"
import {FeedbackDailyData} from "@/lib/FeedbackData"
import DashboardChart from "@/components/DashboardChart"

export default function AdminPage(){

  
   return (
   <div className="flex flex-col items-center justify-center gap-50 ml-50">
   <FeedbackDailyOverview title="Feedback Daily Overview" items={FeedbackDailyData}/>
   <DashboardChart/>
   </div>
   )
  
}