'use client';

import React from 'react';
import { FileText, Calendar, Headphones, Video, Users, TrendingUp } from 'lucide-react';
import StatsCard from '@/components/admin/statsCard';
import { useAuth } from '@/lib/authContext';
import RecentActivity from './recentActivity';
import UpcomingEvent from './upcomingEvents';
import { useBlogs } from '@/lib/hooks/useblogs';
import { useEvents } from '@/lib/hooks/useEvents';
import VisitorsStats from './visitorsStat';


const DashboardPage = () => {
 const {user} = useAuth()
 const {blogs} = useBlogs()
 const {events} = useEvents()


  const stats = [
    {
      title: 'Total Blogs',
      value: blogs.length,
      icon: FileText,
      color: 'purple' as const,
    },
    {
      title: 'Upcoming Events',
      value: events.length,
      icon: Calendar,
      color: 'blue' as const,
    },
    {
      title: 'Sermons',
      value: 0,
      icon: Video,
      color: 'green' as const,
    },
    {
      title: 'Audio Messages',
      value: 0,
      icon: Headphones,
      color: 'orange' as const,
    },
  ];




  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.email?  user.email.split('@')[0]: 'admin'}
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
          <RecentActivity />

        {/* Upcoming Events */}
        <UpcomingEvent />
      </div>

      {/* Quick Stats */}
      <VisitorsStats />
    </div>
  );
};

export default DashboardPage;