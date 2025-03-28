import React, { useEffect } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import ConfigEditor from './ConfigEditor';
const Settings = () => {
  const [config, setConfig] = React.useState<any>({});
  const [loading, setLoading] = React.useState(true);
  const handleSaveConfig = (config: string) => {

  }
  useEffect(() => {
    // Fetch config from API
    // setConfig(response.data)
    getConfig();
  }, []);
  const getConfig = async () => { }
  return (
    <div className="p-6">
      <PageHeader title="Settings" icon={SettingsIcon} />

      <div className="grid grid-cols-1 gap-6 bg-white">
        <ConfigEditor appConfig={{
          "id": "config2ee5bd317371183082587501660346",
          "staleIn": "2025-01-17T12:52:31.590Z",
          "service_urls": {
            "user_service": "http://localhost:6000",
            "job_service": "http://localhost:6045"
          },
          "bookings": {
            "returnFeesIfAllDeclined": true,
            "showCancelButtonMinutes": 20,
            "clientCancellationFee": 100,
            "percentageCompletion": 0.5,
            "bodyguardCancellationFee": 100,
            "cancellationMinimumHours": 1,
            "minimumBookingHours": 1
          },
          "workRates": { "max": 100, "min": 20, "validateRate": true },
          "allowedVersions": ["1.0.0", "1.0.1"],
          "flags": {
            "enabled": true,
            "disabledMessage": "We are currently experiencing high traffic. Please try again later.",
            "withdrawals": true,
            "minimumWithdrawalAmount": 100,
            "funding": true,
            "forceLogin": false,
            "minimumBodyguardAge": 18,
            "minimumClientAge": 15,
            "uploadURL": "http://localhost:6050/file/v1/files/upload",
            "allowedIDs": [
              {
                "name": "Passport",
                "key": "passport",
                "requiresFrontAndBack": false,
                "requiresIDNumber": true
              }
              // ... other IDs
            ],
            "serviceTypes": [
              "Personal Bodyguard",
              "Event Security Guard",
              "Bouncer",
              "Bodyguard Driver"
            ],
            "uniformTypes": ["Formal Suit", "Tactical Uniform", "Business Casuals"],
            "addonItems": ["Bulletproof vests or body armor", "Tactical boots", "Beret"]
          },
          "introPage": {
            "title": [
              "TESING CHANGABLE TEXT",
              "CHOOSE YOUR ASSIGNMENTS",
              "NEVER MISS AN OPPORTUNITY"
            ],
            "subtitle": [
              "Choose assignments that match your availability and preferences.",
              "Receive instant notifications when new job requests are posted.",
              "View upcoming assignments, manage your schedule, and track payments all in one place."
            ]
          },
          "payments": {
            "hireFee": 200,
            "deductFromBodyguard": false,
            "usePercentage": true,
            "percentage": 0.5,
            "maxFee": 200,
            "minFee": 5
          },
          "allowedRoles": [
            {
              "key": "client",
              "title": "Hire a Bodyguard",
              "description": "I need to hire security services"
            },
            {
              "key": "bodyguard",
              "title": "Become a Bodyguard",
              "description": "I'm offering security services"
            }
          ],
          "welcomePage": {
            "title": "Welcome to",
            "appName": "Luxe",
            "subtitle": "Connecting Professionals to High-Value Clients",
            "footer": "Service provided by Luxe"
          },
          "allowedStates": [
            { "name": "Lagos", "code": "lagos" },
            { "name": "Abuja", "code": "abuja" },
            { "name": "Oyo", "code": "oyo" }
          ],
          "measurements": {
            "maxWeight": 150,
            "minWeight": 65,
            "maxHeight": 200,
            "minHeight": 150
          }
        }}
          saveConfig={handleSaveConfig}
        
        />
        
        <div className="bg-white hidden rounded-lg shadow-md p-6">
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
                defaultValue={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Booking Duration (hours)
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={24}
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

    
      </div>
    </div>
  );
};

export default Settings;