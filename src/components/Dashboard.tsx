import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Car, LogOut } from 'lucide-react';

interface DashboardProps {
  user: {
    name: string;
    permissions: string[];
  };
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-800">管理系统</h1>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">欢迎, {user.name}</span>
              <button
                onClick={onLogout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <LogOut className="h-4 w-4 mr-2" />
                登出
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">控制面板</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {user.permissions.includes('meeting_documents') && (
                  <Link
                    to="/meeting-documents"
                    className="bg-white overflow-hidden shadow rounded-lg p-6 hover:bg-gray-50 transition duration-150 ease-in-out"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                        <FileText className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">会议文件管理系统</h3>
                        <p className="mt-1 text-sm text-gray-500">管理和组织会议相关文档</p>
                      </div>
                    </div>
                  </Link>
                )}
                {user.permissions.includes('vehicle_management') && (
                  <Link
                    to="/vehicle-management"
                    className="bg-white overflow-hidden shadow rounded-lg p-6 hover:bg-gray-50 transition duration-150 ease-in-out"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                        <Car className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">车辆管理系统</h3>
                        <p className="mt-1 text-sm text-gray-500">管理公司车辆和相关信息</p>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;