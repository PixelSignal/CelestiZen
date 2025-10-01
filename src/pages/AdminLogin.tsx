import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Lock } from 'lucide-react';

export function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (email === 'admin@cosmichart.com' && password === 'admin123') {
        sessionStorage.setItem('admin_authenticated', 'true');
        navigate('/admin');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-10 h-10 text-amber-400" />
            <h1 className="text-3xl font-bold text-white">Cosmic Chart</h1>
          </div>
          <p className="text-white/80">Admin Dashboard Login</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-xl shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="flex items-center justify-center space-x-2 text-xl font-semibold text-white">
              <Lock className="w-5 h-5" />
              <span>Secure Access</span>
            </h2>
          </div>

          <div className="p-6">
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="bg-red-500/20 border border-red-400 rounded-lg p-4">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@cosmichart.com"
                  required
                  className="w-full px-4 py-3.5 border-2 border-white/30 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-white mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3.5 border-2 border-white/30 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Back to website
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-6 text-center text-white/60 text-sm">
          <p>Default credentials for demo:</p>
          <p className="font-mono text-white/80 mt-1">admin@cosmichart.com / admin123</p>
        </div>
      </div>
    </div>
  );
}
