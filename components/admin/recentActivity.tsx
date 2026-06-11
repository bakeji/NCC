import { useRecentActivity } from "@/lib/hooks/useRecentActivity"

export default function RecentActivity(){
    const {activities} = useRecentActivity()
    return(
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Activity
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {activities.map((activity, index) => (
              <div key={index} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {activity.action} • {activity.activityAt.toLocaleDateString()} 
                    </p>
                  </div>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${activity.type === 'blog'
                        ? 'bg-purple-100 text-purple-700'
                        : activity.type === 'event'
                          ? 'bg-blue-100 text-blue-700'
                          : activity.type === 'sermon'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-orange-100 text-orange-700'
                      }`}
                  >
                    {activity.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
    )
}