import React, { useEffect, useState } from 'react';
import { Shield, Users, Calendar, DollarSign, CheckCircle } from 'lucide-react';
import StatCard from '../components/StatCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getApiStats } from '../services/api.service';

const mockChartData = [
  { name: 'Jan', jobs: 65 },
  { name: 'Feb', jobs: 85 },
  { name: 'Mar', jobs: 95 },
  { name: 'Apr', jobs: 75 },
  { name: 'May', jobs: 110 },
  { name: 'Jun', jobs: 130 },
];

const Dashboard = () => {
  const [loading, setLoading] = React.useState(false);
  const [stats, setStats] = React.useState<any>({});

  useEffect(() => {
    getStats();
  }, []);

  const getStats = async () => {
    setLoading(true);
    const res = await getApiStats();
    setStats(res); // Fetch stats from API
    // Fetch stats from API
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        <StatCard
          title="Total Bodyguards"
          value={stats.bodyguards}
          icon={Shield}
          // trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Active Clients"
          value={stats.clients}
          icon={Users}
          // trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Verified Guards"
          value={stats.verifiedBodyguards}
          icon={CheckCircle}
          // trend={{ value: 15, isPositive: true }}
        />
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={CheckCircle}
          // trend={{ value: 15, isPositive: true }}
        />
        {/* <StatCard
          title="Upcoming Jobs"
          value="56"
          icon={Calendar}
          // trend={{ value: 5, isPositive: true }}
        /> */}
      
        {/* <StatCard
          title="Current Revenue"
          value="9,245"
          isAmount
          icon={DollarSign}
          // trend={{ value: 23, isPositive: true }}
        /> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg hidden">
          <h2 className="text-lg font-semibold mb-4">Jobs Completed (Last 6 Months)</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="jobs" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg hidden">
          <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <div>
                  <p className="text-sm font-medium">New bodyguard verification request</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;