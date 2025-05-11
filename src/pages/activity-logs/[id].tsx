import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { format } from 'date-fns';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import { activityLogService, ActivityLog } from '@/services/activityLogService';
import LoadingScreen from '@/components/ui/LoadingScreen';
import toast from 'react-hot-toast';

const ActivityLogDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [log, setLog] = useState<ActivityLog | null>(null);

  // Check if user is admin
  useEffect(() => {
    if (user && user.role !== 'Admin') {
      toast.error('You do not have permission to access this page');
      router.push('/dashboard');
    }
  }, [user, router]);

  // Fetch activity log details
  useEffect(() => {
    if (!id || user?.role !== 'Admin') return;

    const fetchActivityLog = async () => {
      setIsLoading(true);
      try {
        const data = await activityLogService.getActivityLogById(id as string);
        setLog(data);
      } catch (error) {
        console.error('Error fetching activity log:', error);
        toast.error('Failed to load activity log details');
        router.push('/activity-logs');
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivityLog();
  }, [id, user, router]);

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    try {
      return format(new Date(timestamp), 'MMM d, yyyy HH:mm:ss');
    } catch (error) {
      return timestamp;
    }
  };

  // If not admin, don't render the page
  if (user && user.role !== 'Admin') {
    return null;
  }

  if (isLoading) return <LoadingScreen />;

  if (!log) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Activity log not found</h2>
          <p className="mt-2 text-gray-600">The activity log you're looking for doesn't exist</p>
          <Link href="/activity-logs" className="mt-4 btn btn-primary">
            Back to Activity Logs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Activity Log Details | Military Asset Management</title>
      </Head>

      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Back button and title */}
          <div className="flex items-center mb-6">
            <button
              onClick={() => router.back()}
              className="mr-4 text-gray-500 hover:text-gray-700"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-900">Activity Log Details</h1>
          </div>

          {/* Activity Log Details */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {log.action} {log.resourceType}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {formatTimestamp(log.timestamp)}
              </p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">User</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div>{log.username}</div>
                    <div className="text-sm text-gray-500">{log.user?.fullName}</div>
                    <div className="text-sm text-gray-500">Role: {log.user?.role}</div>
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Action</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{log.action}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Resource Type</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{log.resourceType}</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Resource ID</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{log.resourceId}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">IP Address</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{log.ipAddress}</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">User Agent</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div className="max-h-32 overflow-y-auto">
                      {log.userAgent}
                    </div>
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Timestamp</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {formatTimestamp(log.timestamp)}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Details</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div className="max-h-96 overflow-y-auto">
                      <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto">
                        {JSON.stringify(log.details, null, 2)}
                      </pre>
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Related Actions */}
          <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4">
            <Link 
              href={`/activity-logs?username=${log.username}`}
              className="btn btn-secondary mb-2 sm:mb-0"
            >
              View User Logs
            </Link>
            <Link 
              href={`/activity-logs?resourceType=${log.resourceType}&resourceId=${log.resourceId}`}
              className="btn btn-secondary mb-2 sm:mb-0"
            >
              View Resource Logs
            </Link>
            <Link 
              href={`/activity-logs?action=${log.action}`}
              className="btn btn-secondary"
            >
              View Similar Actions
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivityLogDetailPage;