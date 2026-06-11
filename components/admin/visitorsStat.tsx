import { useVisitorStats } from "@/lib/hooks/useVisitorsStats"
import { TrendingUp } from "lucide-react";

export default function VisitorsStats(){

    const {allTime, currentMonth, lastMonth, loading  } = useVisitorStats()

    if (loading) return <p>Loading...</p>;

    return(
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Content Performance
          </h2>
        </div>
        <div className="p-6">
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <p className="text-sm text-gray-600">Total Views All Time</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{allTime.toLocaleString()}</p>
               <p className="mt-1 text-sm text-green-600 flex items-center">
                <TrendingUp className="mr-1 h-4 w-4" />
              </p> 
            </div>
             <div>
              <p className="text-sm text-gray-600"> Current Month </p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{currentMonth}</p>
              {/* <p className="mt-1 text-sm text-green-600 flex items-center">
                <TrendingUp className="mr-1 h-4 w-4" />
                +8.2% from last month
              </p> */}
            </div>
            <div>
              <p className="text-sm text-gray-600">Last Month</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{lastMonth}</p>
              {/* <p className="mt-1 text-sm text-green-600 flex items-center">
                <TrendingUp className="mr-1 h-4 w-4" />
                +22.1% from last month
              </p> */}
            </div> 
          </div>
        </div>
      </div>
    )
}