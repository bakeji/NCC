import { useEvents } from "@/lib/hooks/useEvents"


export default function UpcomingEvent(){
    const {events} = useEvents()
    return(
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Upcoming Events
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {events.slice(0, 5).map((event, index) => (
              <div key={index} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {event.title}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {event.date}
                    </p>
                  </div>
                  <span
                    className="inline-flex rounded-full px-2 py-1 text-xs font-semibold bg-green-100 text-green-700 "
                  >
                        published
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
    )
}