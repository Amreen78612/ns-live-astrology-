"use client";

import { useState } from "react";
import { Save, Globe, DollarSign, Bell, Shield, Mail } from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "NS Live Astro",
    siteEmail: "contact@nsliveastro.com",
    sitePhone: "+91 9652 47 5566",
    currency: "INR",
    taxRate: "18",
    enableNotifications: true,
    enableEmailAlerts: true,
    maintenanceMode: false,
  });

  const handleSave = () => {
    // Save settings logic
    alert("Settings saved successfully!");
  };

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-[#1E3A8A] mb-2">
          Settings
        </h1>
        <p className="text-[#666]">
          Manage your application settings and configurations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <Globe className="text-[#FF6B35]" size={24} />
            <h2 className="text-2xl font-bold text-[#1E3A8A]">
              General Settings
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#1E3A8A] mb-2">
                Site Name
              </label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) =>
                  setSettings({ ...settings, siteName: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1E3A8A] mb-2">
                Contact Email
              </label>
              <input
                type="email"
                value={settings.siteEmail}
                onChange={(e) =>
                  setSettings({ ...settings, siteEmail: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1E3A8A] mb-2">
                Contact Phone
              </label>
              <input
                type="tel"
                value={settings.sitePhone}
                onChange={(e) =>
                  setSettings({ ...settings, sitePhone: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <DollarSign className="text-[#10B981]" size={24} />
            <h2 className="text-2xl font-bold text-[#1E3A8A]">
              Payment Settings
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#1E3A8A] mb-2">
                Currency
              </label>
              <select
                value={settings.currency}
                onChange={(e) =>
                  setSettings({ ...settings, currency: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none"
              >
                <option value="INR">Indian Rupee (₹)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="EUR">Euro (€)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1E3A8A] mb-2">
                Tax Rate (%)
              </label>
              <input
                type="number"
                value={settings.taxRate}
                onChange={(e) =>
                  setSettings({ ...settings, taxRate: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <Bell className="text-[#0066FF]" size={24} />
            <h2 className="text-2xl font-bold text-[#1E3A8A]">Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#F8F9FA] rounded-lg">
              <div>
                <p className="font-semibold text-[#1E3A8A]">
                  Push Notifications
                </p>
                <p className="text-sm text-[#666]">
                  Enable push notifications for bookings
                </p>
              </div>
              <label className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  checked={settings.enableNotifications}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      enableNotifications: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                />
                <span className="absolute inset-0 bg-gray-300 peer-checked:bg-[#FF6B35] rounded-full transition-colors cursor-pointer"></span>
                <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></span>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#F8F9FA] rounded-lg">
              <div>
                <p className="font-semibold text-[#1E3A8A]">Email Alerts</p>
                <p className="text-sm text-[#666]">
                  Receive email alerts for new bookings
                </p>
              </div>
              <label className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  checked={settings.enableEmailAlerts}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      enableEmailAlerts: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                />
                <span className="absolute inset-0 bg-gray-300 peer-checked:bg-[#FF6B35] rounded-full transition-colors cursor-pointer"></span>
                <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="text-[#FF6B35]" size={24} />
            <h2 className="text-2xl font-bold text-[#1E3A8A]">Security</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#F8F9FA] rounded-lg">
              <div>
                <p className="font-semibold text-[#1E3A8A]">Maintenance Mode</p>
                <p className="text-sm text-[#666]">
                  Temporarily disable public access
                </p>
              </div>
              <label className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      maintenanceMode: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                />
                <span className="absolute inset-0 bg-gray-300 peer-checked:bg-red-500 rounded-full transition-colors cursor-pointer"></span>
                <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></span>
              </label>
            </div>

            <button className="w-full bg-[#1E3A8A] text-white py-3 rounded-lg font-semibold hover:bg-[#0F1F4A] transition-colors">
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-[#FF6B35] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#FF5722] transition-colors shadow-lg"
        >
          <Save size={24} />
          Save All Settings
        </button>
      </div>
    </div>
  );
}
