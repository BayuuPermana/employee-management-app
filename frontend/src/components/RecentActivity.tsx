import React from 'react';

interface RecentActivityProps {
  activities: { id: string; message: string; timestamp: string }[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
      <ul>
        {activities.length > 0 ? (
          activities.map((activity) => (
            <li key={activity.id} className="border-b border-gray-200 dark:border-gray-700 py-2 last:border-b-0">
              <p className="font-semibold">{activity.message}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{new Date(activity.timestamp).toLocaleString()}</p>
            </li>
          ))
        ) : (
          <li className="py-2 text-gray-600 dark:text-gray-400">No recent activity.</li>
        )}
      </ul>
    </div>
  );
};

export default RecentActivity;
