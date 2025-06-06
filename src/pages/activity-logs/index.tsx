import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import { activityLogService, ActivityLog, ActionSummary, ResourceSummary, UserSummary, DailySummary } from '@/services/activityLogService';
import LoadingScreen from '@/components/ui/LoadingScreen';
import Pagination from '@/components/ui/Pagination';
import DashboardCard from '@/components/dashboard/DashboardCard';
import DashboardChart from '@/components/dashboard/DashboardChart';
import toast from 'react-hot-toast';

// Action types for filtering
const actionTypes = [
  'All',
  'Login',
  'Logout',
  'Create',
  'Update',
  'Delete',
  'Transfer',
  'Assign',
  'Return',
  'Failed Login'
];

// Resource types for filtering
const resourceTypes = [
  'All',
  'User',
  'Asset',
  'Assignment',
  'Transfer',
  'Purchase',
  'Expenditure'
];

const ActivityLogsPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [totalLogs, setTotalLogs] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [actionSummary, setActionSummary] = useState<ActionSummary[]>([]);
  const [resourceSummary, setResourceSummary] = useState<ResourceSummary[]>([]);
  const [userSummary, setUserSummary] = useState<UserSummary[]>([]);
  const [dailySummary, setDailySummary] = useState<DailySummary[]>([]);
  
  // Filters
  const [filters, setFilters] = useState({
    username: '',
    action: '',
    resourceType: '',
    resourceId: '',
    startDate: '',
    endDate: ''
  });
  
  // Sort options
  const [sortBy, setSortBy] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState('desc');
  
  // Check if user is admin
  useEffect(() => {
    if (user && user.role !== 'Admin') {
      toast.error('You do not have permission to access this page');
      router.push('/dashboard');
    }
  }, [user, router]);

  // Fetch activity logs
  const fetchActivityLogs = async () => {
    if (user?.role !== 'Admin') return;
    
    setIsLoading(true);
    try {
      const params: any = {
        limit,
        skip: (page - 1) * limit,
        sortBy,
        sortOrder
      };
      
      // Add filters if they exist
      if (filters.username) params.username = filters.username;
      if (filters.action && filters.action !== 'All') params.action = filters.action;
      if (filters.resourceType && filters.resourceType !== 'All') params.resourceType = filters.resourceType;
      if (filters.resourceId) params.resourceId = filters.resourceId;
      if (filters.startDate) params.startDate = new Date(filters.startDate).toISOString();
      if (filters.endDate) params.endDate = new Date(filters.endDate).toISOString();
      
      const response = await activityLogService.getActivityLogs(params);
      setLogs(response.logs);
      setTotalLogs(response.total);
    } catch (error) {
      console.error('Error fetching activity logs:', error);
      toast.error('Failed to load activity logs');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch summary data
  const fetchSummaryData = async () => {
    if (user?.role !== 'Admin') return;
    
    try {
      const [actions, resources, users, daily] = await Promise.all([
        activityLogService.getActionsSummary(),
        activityLogService.getResourcesSummary(),
        activityLogService.getUsersSummary(),
        activityLogService.getDailySummary()
      ]);
      
      setActionSummary(actions);
      setResourceSummary(resources);
      setUserSummary(users);
      setDailySummary(daily);
    } catch (error) {
      console.error('Error fetching summary data:', error);
      toast.error('Failed to load summary data');
    }
  };

  // Fetch data when dependencies change
  useEffect(() => {
    if (user?.role === 'Admin') {
      fetchActivityLogs();
    }
  }, [filters, sortBy, sortOrder, page, limit, user]);

  // Fetch summary data on initial load
  useEffect(() => {
    if (user?.role === 'Admin') {
      fetchSummaryData();
    }
  }, [user]);

  // Handle filter changes
  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }));
    setPage(1); // Reset to first page when filters change
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Handle limit change
  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // Reset to first page when limit changes
  };

  // Handle sort change
  const handleSortChange = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    try {
      return format(new Date(timestamp), 'MMM d, yyyy HH:mm:ss');
    } catch (error) {
      return timestamp;
    }
  };

  // Get badge class for action type
  const getActionBadgeClass = (action: string) => {
    switch (action) {
      case 'Login':
        return 'bg-green-100 text-green-800';
      case 'Logout':
        return 'bg-blue-100 text-blue-800';
      case 'Create':
        return 'bg-purple-100 text-purple-800';
      case 'Update':
        return 'bg-yellow-100 text-yellow-800';
      case 'Delete':
        return 'bg-red-100 text-red-800';
      case 'Transfer':
        return 'bg-indigo-100 text-indigo-800';
      case 'Assign':
        return 'bg-pink-100 text-pink-800';
      case 'Return':
        return 'bg-teal-100 text-teal-800';
      case 'Failed Login':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // If not admin, don't render the page
  if (user && user.role !== 'Admin') {
    return null;
  }

  if (isLoading && logs.length === 0) return <LoadingScreen />;

  return (
    <>
      <Head>
        <title>Activity Logs | Military Asset Management</title>
      </Head>

      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Activity Logs</h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor and analyze system activity
          </p>

          {/* Summary Charts */}
          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <DashboardCard title="Actions by Type">
              <DashboardChart
                type="pie"
                data={{
                  labels: actionSummary.map(item => item._id),
                  datasets: [
                    {
                      data: actionSummary.map(item => item.count),
                      backgroundColor: [
                        '#3B82F6', // blue
                        '#10B981', // green
                        '#F59E0B', // yellow
                        '#EF4444', // red
                        '#8B5CF6', // purple
                        '#EC4899', // pink
                        '#14B8A6', // teal
                        '#6366F1', // indigo
                      ],
                    },
                  ],
                }}
              />
            </DashboardCard>

            <DashboardCard title="Resources by Type">
              <DashboardChart
                type="bar"
                data={{
                  labels: resourceSummary.map(item => item._id),
                  datasets: [
                    {
                      label: 'Count',
                      data: resourceSummary.map(item => item.count),
                      backgroundColor: '#3B82F6',
                    },
                  ],
                }}
              />
            </DashboardCard>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <DashboardCard title="Daily Activity (Last 30 Days)">
              <DashboardChart
                type="line"
                data={{
                  labels: dailySummary.map(item => item.date),
                  datasets: [
                    {
                      label: 'Activity Count',
                      data: dailySummary.map(item => item.count),
                      borderColor: '#3B82F6',
                      backgroundColor: 'rgba(59, 130, 246, 0.1)',
                      tension: 0.1,
                    },
                  ],
                }}
              />
            </DashboardCard>

            <DashboardCard title="Most Active Users">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Username
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Activity
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userSummary.slice(0, 5).map((user) => (
                      <tr key={user._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {user._id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.count}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatTimestamp(user.lastActivity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </DashboardCard>
          </div>

          {/* Filters */}
          <div className="mt-6 bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Filters</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="mt-1 form-input"
                  value={filters.username}
                  onChange={(e) => handleFilterChange('username', e.target.value)}
                  placeholder="Filter by username"
                />
              </div>

              <div>
                <label htmlFor="action" className="block text-sm font-medium text-gray-700">
                  Action
                </label>
                <select
                  id="action"
                  className="mt-1 form-select"
                  value={filters.action}
                  onChange={(e) => handleFilterChange('action', e.target.value)}
                >
                  {actionTypes.map((action) => (
                    <option key={action} value={action}>
                      {action}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="resourceType" className="block text-sm font-medium text-gray-700">
                  Resource Type
                </label>
                <select
                  id="resourceType"
                  className="mt-1 form-select"
                  value={filters.resourceType}
                  onChange={(e) => handleFilterChange('resourceType', e.target.value)}
                >
                  {resourceTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="resourceId" className="block text-sm font-medium text-gray-700">
                  Resource ID
                </label>
                <input
                  type="text"
                  id="resourceId"
                  className="mt-1 form-input"
                  value={filters.resourceId}
                  onChange={(e) => handleFilterChange('resourceId', e.target.value)}
                  placeholder="Filter by resource ID"
                />
              </div>

              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  className="mt-1 form-input"
                  value={filters.startDate}
                  onChange={(e) => handleFilterChange('startDate', e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  className="mt-1 form-input"
                  value={filters.endDate}
                  onChange={(e) => handleFilterChange('endDate', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Activity Logs Table */}
          <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Activity Logs</h2>
              <div className="flex items-center space-x-2">
                <label htmlFor="sortBy" className="text-sm font-medium text-gray-700">
                  Sort by:
                </label>
                <select
                  id="sortBy"
                  className="form-select"
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option value="timestamp">Timestamp</option>
                  <option value="username">Username</option>
                  <option value="action">Action</option>
                  <option value="resourceType">Resource Type</option>
                </select>
                <button
                  type="button"
                  className="p-1 rounded-md hover:bg-gray-100"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                >
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </button>
              </div>
            </div>

            <div className="border-t border-gray-200">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                </div>
              ) : logs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No activity logs found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Timestamp
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Resource
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Details
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          IP Address
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {logs.map((log) => (
                        <tr key={log._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatTimestamp(log.timestamp)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{log.username}</div>
                            <div className="text-sm text-gray-500">{log.user?.fullName}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getActionBadgeClass(log.action)}`}>
                              {log.action}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{log.resourceType}</div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">{log.resourceId}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="truncate max-w-xs">
                              {log.details ? JSON.stringify(log.details) : '-'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {log.ipAddress}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Pagination */}
            {!isLoading && logs.length > 0 && (
              <div className="border-t border-gray-200 px-4 py-3">
                <Pagination
                  currentPage={page}
                  totalItems={totalLogs}
                  itemsPerPage={limit}
                  onPageChange={handlePageChange}
                  onLimitChange={handleLimitChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivityLogsPage;