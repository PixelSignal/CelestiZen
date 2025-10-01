import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Users, DollarSign, TrendingUp, Mail, Calendar, LogOut, Activity, ShoppingCart, BarChart3, Download, Zap, CheckCircle, AlertCircle, XCircle, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { checkAllApiHealth, getApiIntegrations, calculateOverallHealth, type ApiStatus, type ApiIntegration } from '../lib/apiHealth';

export function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalCharts: 0,
    paidCharts: 0,
    pendingCharts: 0,
    totalRevenue: 0,
    subscribers: 0,
    sessions: 0,
    convertedSessions: 0,
    todayRevenue: 0,
    weekRevenue: 0,
    monthRevenue: 0,
  });
  const [charts, setCharts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiHealth, setApiHealth] = useState<ApiStatus[]>([]);
  const [apiIntegrations, setApiIntegrations] = useState<ApiIntegration[]>([]);
  const [overallHealth, setOverallHealth] = useState(0);
  const [checkingHealth, setCheckingHealth] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchData();
    checkHealth();
  }, []);

  const checkHealth = async () => {
    setCheckingHealth(true);
    try {
      const healthStatuses = await checkAllApiHealth();
      setApiHealth(healthStatuses);
      setApiIntegrations(getApiIntegrations(healthStatuses));
      setOverallHealth(calculateOverallHealth(healthStatuses));
    } catch (error) {
      console.error('Error checking API health:', error);
    } finally {
      setCheckingHealth(false);
    }
  };

  const checkAuth = () => {
    const isAuthenticated = sessionStorage.getItem('admin_authenticated');
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  };

  const fetchData = async () => {
    try {
      const [chartsRes, subscribersRes, sessionsRes] = await Promise.all([
        supabase.from('birth_charts').select('*').order('created_at', { ascending: false }),
        supabase.from('newsletter_subscribers').select('*'),
        supabase.from('user_sessions').select('*'),
      ]);

      const chartsData = chartsRes.data || [];
      const paidCharts = chartsData.filter((c) => c.payment_status === 'paid');
      const sessionsData = sessionsRes.data || [];
      const convertedSessions = sessionsData.filter((s) => s.converted).length;

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
      const monthAgo = new Date(today);
      monthAgo.setMonth(monthAgo.getMonth() - 1);

      const todayCharts = paidCharts.filter(
        (c) => new Date(c.created_at) >= today
      );
      const weekCharts = paidCharts.filter(
        (c) => new Date(c.created_at) >= weekAgo
      );
      const monthCharts = paidCharts.filter(
        (c) => new Date(c.created_at) >= monthAgo
      );

      setStats({
        totalCharts: chartsData.length,
        paidCharts: paidCharts.length,
        pendingCharts: chartsData.filter((c) => c.payment_status === 'pending').length,
        totalRevenue: paidCharts.length * 1.02,
        subscribers: subscribersRes.data?.length || 0,
        sessions: sessionsData.length,
        convertedSessions,
        todayRevenue: todayCharts.length * 1.02,
        weekRevenue: weekCharts.length * 1.02,
        monthRevenue: monthCharts.length * 1.02,
      });

      setCharts(chartsData.slice(0, 10));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    sessionStorage.removeItem('admin_authenticated');
    navigate('/admin/login');
  };

  const exportData = () => {
    const csvContent = [
      ['Name', 'Email', 'Birth Date', 'Status', 'Created At'],
      ...charts.map(c => [
        `${c.first_name} ${c.last_name}`,
        c.user_email,
        new Date(c.birth_date).toLocaleDateString(),
        c.payment_status,
        new Date(c.created_at).toLocaleString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cosmic-chart-orders-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <Button variant="ghost" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalCharts}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {stats.pendingCharts} pending
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Conversions</p>
                  <p className="text-3xl font-bold text-green-600">{stats.paidCharts}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {stats.sessions > 0 ? ((stats.paidCharts / stats.sessions) * 100).toFixed(1) : 0}% rate
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">
                    ${stats.totalRevenue.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    ${stats.monthRevenue.toFixed(2)} this month
                  </p>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Sessions</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.sessions}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {stats.convertedSessions} converted
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-600">Today</p>
                <BarChart3 className="w-4 h-4 text-gray-400" />
              </div>
              <p className="text-2xl font-bold text-gray-900">${stats.todayRevenue.toFixed(2)}</p>
              <p className="text-xs text-gray-500 mt-1">
                {Math.floor(stats.todayRevenue / 1.02)} orders
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <BarChart3 className="w-4 h-4 text-gray-400" />
              </div>
              <p className="text-2xl font-bold text-gray-900">${stats.weekRevenue.toFixed(2)}</p>
              <p className="text-xs text-gray-500 mt-1">
                {Math.floor(stats.weekRevenue / 1.02)} orders
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <BarChart3 className="w-4 h-4 text-gray-400" />
              </div>
              <p className="text-2xl font-bold text-gray-900">${stats.monthRevenue.toFixed(2)}</p>
              <p className="text-xs text-gray-500 mt-1">
                {Math.floor(stats.monthRevenue / 1.02)} orders
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Birth Charts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Birth Date
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Payment Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Created
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {charts.map((chart) => (
                    <tr key={chart.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm">
                        {chart.first_name} {chart.last_name}
                      </td>
                      <td className="py-3 px-4 text-sm">{chart.user_email}</td>
                      <td className="py-3 px-4 text-sm">
                        {new Date(chart.birth_date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            chart.payment_status === 'paid'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {chart.payment_status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(chart.created_at).toLocaleDateString()}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {charts.length === 0 && (
              <p className="text-center text-gray-500 py-8">No charts created yet</p>
            )}
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>API & AI Integration Status</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={checkHealth}
                disabled={checkingHealth}
              >
                <RefreshCw className={`w-4 h-4 ${checkingHealth ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  <span className="text-lg font-semibold">Overall System Health</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">{overallHealth}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    overallHealth >= 80
                      ? 'bg-green-500'
                      : overallHealth >= 50
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${overallHealth}%` }}
                />
              </div>
            </div>

            <div className="space-y-4">
              {apiIntegrations.map((integration, idx) => {
                const statusIcon = integration.status.status === 'operational'
                  ? <CheckCircle className="w-5 h-5 text-green-600" />
                  : integration.status.status === 'degraded'
                  ? <AlertCircle className="w-5 h-5 text-yellow-600" />
                  : <XCircle className="w-5 h-5 text-red-600" />;

                const statusBg = integration.status.status === 'operational'
                  ? 'bg-green-50 border-green-200'
                  : integration.status.status === 'degraded'
                  ? 'bg-yellow-50 border-yellow-200'
                  : 'bg-red-50 border-red-200';

                return (
                  <div
                    key={idx}
                    className={`border rounded-lg p-4 ${statusBg} transition-all`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        {statusIcon}
                        <div>
                          <h4 className="font-semibold text-gray-900">{integration.name}</h4>
                          <p className="text-xs text-gray-600">{integration.provider}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          {integration.status.health}%
                        </div>
                        {integration.status.responseTime && (
                          <div className="text-xs text-gray-500">
                            {integration.status.responseTime}ms
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 mb-3">{integration.description}</p>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-gray-600">Tier:</span>
                        <span className="ml-2 font-medium text-gray-900">{integration.tier}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Cost:</span>
                        <span className="ml-2 font-medium text-gray-900">{integration.cost}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Usage:</span>
                        <span className="ml-2 font-medium text-gray-900">
                          {integration.usage.current.toLocaleString()} / {integration.usage.limit.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Status:</span>
                        <span className={`ml-2 font-medium capitalize ${
                          integration.status.status === 'operational'
                            ? 'text-green-700'
                            : integration.status.status === 'degraded'
                            ? 'text-yellow-700'
                            : 'text-red-700'
                        }`}>
                          {integration.status.status}
                        </span>
                      </div>
                    </div>

                    {integration.status.endpoint && (
                      <div className="mt-2 pt-2 border-t border-gray-300">
                        <span className="text-xs text-gray-600">Endpoint: </span>
                        <code className="text-xs text-gray-800 bg-white px-2 py-1 rounded">
                          {integration.status.endpoint}
                        </code>
                      </div>
                    )}

                    <div className="mt-3">
                      <div className="w-full bg-gray-300 rounded-full h-1.5">
                        <div
                          className={`h-full rounded-full ${
                            integration.status.health >= 80
                              ? 'bg-green-600'
                              : integration.status.health >= 50
                              ? 'bg-yellow-600'
                              : 'bg-red-600'
                          }`}
                          style={{ width: `${integration.status.health}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <Activity className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h5 className="font-semibold text-blue-900 mb-1">System Information</h5>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Last health check: {apiHealth[0]?.lastCheck.toLocaleTimeString() || 'Never'}</li>
                    <li>• All APIs are monitored in real-time</li>
                    <li>• Auto-refresh available via refresh button</li>
                    <li>• Monthly usage resets automatically</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Total Sessions</span>
                    <span className="font-semibold">{stats.sessions}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Conversions</span>
                    <span className="font-semibold">{stats.paidCharts}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-full bg-green-600 rounded-full"
                      style={{
                        width: `${stats.sessions > 0 ? (stats.paidCharts / stats.sessions) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.sessions > 0
                      ? ((stats.paidCharts / stats.sessions) * 100).toFixed(1)
                      : '0'}
                    %
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" fullWidth onClick={exportData}>
                <Download className="w-4 h-4 mr-2" />
                Export Customer Data
              </Button>
              <Button variant="outline" fullWidth>
                <Mail className="w-4 h-4 mr-2" />
                Email Subscribers ({stats.subscribers})
              </Button>
              <Button variant="outline" fullWidth onClick={() => window.open('https://dashboard.stripe.com', '_blank')}>
                <DollarSign className="w-4 h-4 mr-2" />
                Stripe Dashboard
              </Button>
              <Button variant="outline" fullWidth onClick={() => navigate('/')}>
                <Activity className="w-4 h-4 mr-2" />
                View Live Site
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
