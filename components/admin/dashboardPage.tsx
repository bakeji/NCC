'use client';

import React from 'react';
import { FileText, Calendar, Headphones, Video, Users, TrendingUp } from 'lucide-react';
import StatsCard from '@/components/admin/statsCard';


const DashboardPage = () => {
  const stats = [
    {
      title: 'Total Blogs',
      value: '24',
      icon: FileText,
      color: 'purple' as const,
      trend: { value: 12, isPositive: true },
    },
    {
      title: 'Upcoming Events',
      value: '8',
      icon: Calendar,
      color: 'blue' as const,
      trend: { value: 3, isPositive: true },
    },
    {
      title: 'Sermons',
      value: '156',
      icon: Video,
      color: 'green' as const,
      trend: { value: 8, isPositive: true },
    },
    {
      title: 'Audio Messages',
      value: '89',
      icon: Headphones,
      color: 'orange' as const,
      trend: { value: 5, isPositive: false },
    },
  ];

  const recentActivity = [
    {
      type: 'blog',
      title: 'Walking in Faith: A Life of Purpose',
      action: 'Published',
      time: '2 hours ago',
    },
    {
      type: 'event',
      title: 'Word Conference 2025',
      action: 'Updated',
      time: '5 hours ago',
    },
    {
      type: 'sermon',
      title: 'The Power of Prayer',
      action: 'Uploaded',
      time: '1 day ago',
    },
    {
      type: 'audio',
      title: 'Sunday Service Message',
      action: 'Published',
      time: '2 days ago',
    },
  ];

  const upcomingEvents = [
    {
      title: 'Word Conference',
      date: 'October 27, 2025',
      attendees: 350,
      status: 'Published',
    },
    {
      title: 'Youth Fellowship',
      date: 'November 3, 2025',
      attendees: 120,
      status: 'Draft',
    },
    {
      title: 'Prayer Night',
      date: 'November 10, 2025',
      attendees: 200,
      status: 'Published',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, Admin
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Here's what's happening with your church content today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Activity
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {recentActivity.map((activity, index) => (
              <div key={index} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {activity.action} • {activity.time}
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

        {/* Upcoming Events */}
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Upcoming Events
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {event.title}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {event.date} • {event.attendees} registered
                    </p>
                  </div>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${event.status === 'Published'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                      }`}
                  >
                    {event.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Content Performance
          </h2>
        </div>
        <div className="p-6">
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <p className="text-sm text-gray-600">Total Views This Month</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">12,543</p>
              <p className="mt-1 text-sm text-green-600 flex items-center">
                <TrendingUp className="mr-1 h-4 w-4" />
                +15.3% from last month
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Engagement Rate</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">68%</p>
              <p className="mt-1 text-sm text-green-600 flex items-center">
                <TrendingUp className="mr-1 h-4 w-4" />
                +8.2% from last month
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">New Members</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">45</p>
              <p className="mt-1 text-sm text-green-600 flex items-center">
                <TrendingUp className="mr-1 h-4 w-4" />
                +22.1% from last month
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;