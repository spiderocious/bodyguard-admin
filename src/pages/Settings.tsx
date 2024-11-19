import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const Settings = () => {
  return (
    <div className="p-6">
      <PageHeader title="Settings" icon={SettingsIcon} />

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Application Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Commission Rate (%)
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={10}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Booking Duration (hours)
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Booking Duration (hours)
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={72}
              />
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-md font-semibold mb-3">Notification Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="emailNotifications"
                  className="rounded text-blue-600 focus:ring-blue-500"
                  defaultChecked
                />
                <label
                  htmlFor="emailNotifications"
                  className="ml-2 text-sm text-gray-700"
                >
                  Email Notifications
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="pushNotifications"
                  className="rounded text-blue-600 focus:ring-blue-500"
                  defaultChecked
                />
                <label
                  htmlFor="pushNotifications"
                  className="ml-2 text-sm text-gray-700"
                >
                  Push Notifications
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button className="btn btn-primary">Save Changes</button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">API Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                API Key
              </label>
              <div className="flex space-x-2">
                <input
                  type="password"
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value="sk_test_123456789"
                  readOnly
                />
                <button className="btn btn-secondary">Regenerate</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;