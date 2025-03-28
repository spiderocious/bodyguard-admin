// @ts-nocheck
import React, { useState } from 'react';
import { X, Plus, Save, AlertTriangle } from 'lucide-react';

const ConfigEditor = ({ appConfig, saveConfig }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [defaultConfig, setDefaultConfig] = useState(appConfig);
  const [config, setCurrentConfig] = useState(appConfig);

  const [changes, setChanges] = useState({});

  const setConfig = (newConfig) => {
    setCurrentConfig((prev) => ({ ...prev, ...newConfig }));
  };

  // Track changes for the confirmation modal
  const trackChange = (path, oldValue, newValue) => {
    setChanges(prev => ({
      ...prev,
      [path]: { old: oldValue, new: newValue }
    }));
  };

  // Reusable Input Components
  const TextInput = ({ value, onChange, label, disabled = false }: any) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="text"
        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    </div>
  );

  const NumberInput = ({ value, onChange, label }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="number"
        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );

  const BooleanInput = ({ value, onChange, label }) => (
    <div className="mb-4 flex items-center">
      <input
        type="checkbox"
        className="rounded text-blue-600 focus:ring-blue-500"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label className="ml-2 text-sm text-gray-700">{label}</label>
    </div>
  );

  const ArrayInput = ({ value, onChange, label }) => {
    const [newItem, setNewItem] = useState('');

    const addItem = () => {
      if (newItem.trim()) {
        onChange([...value, newItem.trim()]);
        setNewItem('');
      }
    };

    const removeItem = (index) => {
      onChange(value.filter((_, i) => i !== index));
    };

    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {value.map((item, index) => (
            <span key={index} className="inline-flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-md">
              {item}
              <button
                onClick={() => removeItem(index)}
                className="ml-1 text-blue-600 hover:text-blue-800"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addItem()}
          />
          <button
            onClick={addItem}
            className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    );
  };

  const ObjectArrayInput = ({ value, onChange, label, template }: any) => {
    const [isAdding, setIsAdding] = useState(false);
    const [newItem, setNewItem] = useState({ ...template });

    const addItem = () => {
      onChange([...value, { ...newItem }]);
      setNewItem({ ...template });
      setIsAdding(false);
    };

    const removeItem = (index: any) => {
      onChange(value.filter((_: any, i: any) => i !== index));
    };

    const updateItem = (index, field: any, newValue: any) => {
      const updatedItems = [...value];
      updatedItems[index] = { ...updatedItems[index], [field]: newValue };
      onChange(updatedItems);
    };

    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <div className="space-y-4">
          {value.map((item, index) => (
            <div key={index} className="p-4 border rounded-md">
              {Object.entries(item).map(([key, val]) => (
                <div key={key} className="mb-2">
                  {typeof val === 'boolean' ? (
                    <BooleanInput
                      label={key}
                      value={val}
                      onChange={(newVal) => updateItem(index, key, newVal)}
                    />
                  ) : (
                    <TextInput
                      label={key}
                      value={val}
                      onChange={(newVal) => updateItem(index, key, newVal)}
                    />
                  )}
                </div>
              ))}
              <button
                onClick={() => removeItem(index)}
                className="mt-2 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        {isAdding ? (
          <div className="mt-4 p-4 border rounded-md">
            {Object.entries(template).map(([key, val]) => (
              <div key={key} className="mb-2">
                {typeof val === 'boolean' ? (
                  <BooleanInput
                    label={key}
                    value={newItem[key]}
                    onChange={(newVal) => setNewItem({ ...newItem, [key]: newVal })}
                  />
                ) : (
                  <TextInput
                    label={key}
                    value={newItem[key]}
                    onChange={(newVal) => setNewItem({ ...newItem, [key]: newVal })}
                  />
                )}
              </div>
            ))}
            <div className="flex gap-2 mt-4">
              <button
                onClick={addItem}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add New
          </button>
        )}
      </div>
    );
  };

  // Tab components
  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'bookings', label: 'Bookings' },
    { id: 'flags', label: 'Flags' },
    { id: 'payments', label: 'Payments' },
    { id: 'content', label: 'Content' }
  ];

  const handleSave = () => {
    // Here you would typically show the confirmation modal
    console.log('Changes to confirm:', changes);
    console.log('Updated config:', config);
    saveConfig(config);
  };

  return (
    <div className="p-6 w-full mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Configuration Editor</h1>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
        >
          <Save size={20} />
          Save Changes
        </button>
      </div>

      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {activeTab === 'general' && (
          <div>
            <TextInput
              label="Configuration ID"
              value={config.id}
              onChange={(value) => setConfig({ ...config, id: value })}
              disabled
            />
            {/* <TextInput
              label="Stale In"
              value={config.staleIn}
              onChange={(value) => setConfig({ ...config, staleIn: value })}
            /> */}
            {/* Add more general settings */}
          </div>
        )}

        {activeTab === 'bookings' && (
          <div>
            <NumberInput
              label="Client Cancellation Fee"
              value={config.bookings.clientCancellationFee}
              onChange={(value) =>
                setConfig({
                  ...config,
                  bookings: { ...config.bookings, clientCancellationFee: value }
                })
              }
            />
            <NumberInput
              label="Bodyguard Cancellation Fee"
              value={config.bookings.bodyguardCancellationFee}
              onChange={(value) =>
                setConfig({
                  ...config,
                  bookings: { ...config.bookings, bodyguardCancellationFee: value }
                })
              }
            />

            <NumberInput 
              key="percentageCompletion"
              label={"Percentage Completion"}
              value={config.bookings.percentageCompletion}
              onChange={(value) =>
                setConfig({
                  ...config,
                  bookings: { ...config.bookings, percentageCompletion: value }
                })
              }
            />
            
          </div>
        )}

        {activeTab === 'flags' && (
          <div>
            <BooleanInput
              label="Enabled"
              value={config.flags.enabled}
              onChange={(value) =>
                setConfig({
                  ...config,
                  flags: { ...config.flags, enabled: value }
                })
              }
            />
            <TextInput
              label="Disabled Message"
              value={config.flags.disabledMessage}
              onChange={(value) =>
                setConfig({
                  ...config,
                  flags: { ...config.flags, disabledMessage: value }
                })
              }
            />
            <NumberInput
              label="Minimum Withdrawal Amount"
              value={config.flags.minimumWithdrawalAmount}
              onChange={(value) =>
                setConfig({
                  ...config,
                  flags: { ...config.flags, minimumWithdrawalAmount: value }
                })
              }
            />
            <NumberInput
              label="Minimum Bodyguard Age"
              value={config.flags.minimumBodyguardAge}
              onChange={(value) =>
                setConfig({
                  ...config,
                  flags: { ...config.flags, minimumBodyguardAge: value }
                })
              }
            />
            <NumberInput
              label="Minimum Client Age"
              value={config.flags.minimumClientAge}
              onChange={(value) =>
                setConfig({
                  ...config,
                  flags: { ...config.flags, minimumClientAge: value }
                })
              }
            />
            
            <ArrayInput
              label="Service Types"
              value={config.flags.serviceTypes}
              onChange={(value) =>
                setConfig({
                  ...config,
                  flags: { ...config.flags, serviceTypes: value }
                })
              }
            />
            
            <ArrayInput
              label="Uniform Types"
              value={config.flags.uniformTypes}
              onChange={(value) =>
                setConfig({
                  ...config,
                  flags: { ...config.flags, uniformTypes: value }
                })
              }
            />
            
            <ArrayInput
              label="Addon Items"
              value={config.flags.addonItems}
              onChange={(value) =>
                setConfig({
                  ...config,
                  flags: { ...config.flags, addonItems: value }
                })
              }
            />

            <ObjectArrayInput
              label="Allowed IDs"
              value={config.flags.allowedIDs}
              onChange={(value) =>
                setConfig({
                  ...config,
                  flags: { ...config.flags, allowedIDs: value }
                })
              }
              template={{
                name: "",
                key: "",
                requiresFrontAndBack: false,
                requiresIDNumber: true
              }}
            />
          </div>
        )}

        {activeTab === 'payments' && (
          <div>
            <NumberInput
              label="Hire Fee"
              value={config.payments.hireFee}
              onChange={(value) =>
                setConfig({
                  ...config,
                  payments: { ...config.payments, hireFee: value }
                })
              }
            />
            <BooleanInput
              label="Deduct From Bodyguard"
              value={config.payments.deductFromBodyguard}
              onChange={(value) =>
                setConfig({
                  ...config,
                  payments: { ...config.payments, deductFromBodyguard: value }
                })
              }
            />
            <BooleanInput
              label="Use Percentage"
              value={config.payments.usePercentage}
              onChange={(value) =>
                setConfig({
                  ...config,
                  payments: { ...config.payments, usePercentage: value }
                })
              }
            />
            <NumberInput
              label="Percentage"
              value={config.payments.percentage}
              onChange={(value) =>
                setConfig({
                  ...config,
                  payments: { ...config.payments, percentage: value }
                })
              }
            />
            <NumberInput
              label="Max Fee"
              value={config.payments.maxFee}
              onChange={(value) =>
                setConfig({
                  ...config,
                  payments: { ...config.payments, maxFee: value }
                })
              }
            />
            <NumberInput
              label="Min Fee"
              value={config.payments.minFee}
              onChange={(value) =>
                setConfig({
                  ...config,
                  payments: { ...config.payments, minFee: value }
                })
              }
            />
          </div>
        )}

        {activeTab === 'content' && (
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Intro Page</h3>
              <ArrayInput
                label="Title Lines"
                value={config.introPage.title}
                onChange={(value) =>
                  setConfig({
                    ...config,
                    introPage: { ...config.introPage, title: value }
                  })
                }
              />
              <ArrayInput
                label="Subtitle Lines"
                value={config.introPage.subtitle}
                onChange={(value) =>
                  setConfig({
                    ...config,
                    introPage: { ...config.introPage, subtitle: value }
                  })
                }
              />
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Welcome Page</h3>
              <TextInput
                label="Title"
                value={config.welcomePage.title}
                onChange={(value) =>
                  setConfig({
                    ...config,
                    welcomePage: { ...config.welcomePage, title: value }
                  })
                }
              />
              <TextInput
                label="App Name"
                value={config.welcomePage.appName}
                onChange={(value) =>
                  setConfig({
                    ...config,
                    welcomePage: { ...config.welcomePage, appName: value }
                  })
                }
              />
              <TextInput
                label="Subtitle"
                value={config.welcomePage.subtitle}
                onChange={(value) =>
                  setConfig({
                    ...config,
                    welcomePage: { ...config.welcomePage, subtitle: value }
                  })
                }
              />
              <TextInput
                label="Footer"
                value={config.welcomePage.footer}
                onChange={(value) =>
                  setConfig({
                    ...config,
                    welcomePage: { ...config.welcomePage, footer: value }
                  })
                }
              />
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Other Settings</h3>
              <ObjectArrayInput
                label="Allowed Roles"
                value={config.allowedRoles}
                onChange={(value) =>
                  setConfig({
                    ...config,
                    allowedRoles: value
                  })
                }
                template={{
                  key: "",
                  title: "",
                  description: ""
                }}
              />
              
              <ObjectArrayInput
                label="Allowed States"
                value={config.allowedStates}
                onChange={(value) =>
                  setConfig({
                    ...config,
                    allowedStates: value
                  })
                }
                template={{
                  name: "",
                  code: ""
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfigEditor;