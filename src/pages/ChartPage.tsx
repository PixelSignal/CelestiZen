import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { calculateSunSign } from '../lib/astrology';

interface FormData {
  name: string;
  birthDate: string;
  birthTime: string;
  timeUnknown: boolean;
  birthCity: string;
  birthCountry: string;
  email: string;
}

export function ChartPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    birthDate: '',
    birthTime: '12:00',
    timeUnknown: false,
    birthCity: '',
    birthCountry: '',
    email: ''
  });

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      await handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .upsert({ email: formData.email }, { onConflict: 'email' })
        .select()
        .single();

      if (userError) throw userError;

      const birthDateTime = formData.timeUnknown
        ? `${formData.birthDate}T12:00:00`
        : `${formData.birthDate}T${formData.birthTime}:00`;

      const { data: chartInput, error: chartError } = await supabase
        .from('chart_inputs')
        .insert({
          user_id: userData.id,
          name: formData.name,
          birth_date: formData.birthDate,
          birth_time: formData.timeUnknown ? null : formData.birthTime,
          time_unknown: formData.timeUnknown,
          birth_city: formData.birthCity,
          birth_country: formData.birthCountry,
          latitude: null,
          longitude: null,
          tz_name: null,
          tz_offset_minutes: null
        })
        .select()
        .single();

      if (chartError) throw chartError;

      const sunSign = calculateSunSign(new Date(formData.birthDate));

      const chartData = {
        sunSign,
        moonSign: 'Calculating...',
        risingSign: formData.timeUnknown ? 'Unknown (birth time needed)' : 'Calculating...'
      };

      const { data: report, error: reportError } = await supabase
        .from('reports')
        .insert({
          user_id: userData.id,
          chart_input_id: chartInput.id,
          summary_text: `Your Sun is in ${sunSign}. This is a preview of your birth chart.`,
          chart_data: chartData,
          report_type: 'free_preview'
        })
        .select()
        .single();

      if (reportError) throw reportError;

      navigate(`/chart/preview/${report.id}`);
    } catch (error) {
      console.error('Error creating chart:', error);
      alert('Failed to create chart. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const canProceed = () => {
    if (step === 1) return formData.name && formData.birthDate;
    if (step === 2) return formData.birthCity && formData.birthCountry;
    if (step === 3) return formData.email;
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      <header className="border-b border-white/10 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-white hover:text-amber-400 transition-colors"
            >
              <Sparkles className="w-8 h-8 text-amber-400" />
              <span className="text-2xl font-bold">Celestizen</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-white">Create Your Free Mini-Chart</h1>
            <span className="text-white/60">Step {step} of 3</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl p-8">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Birth Information</h2>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3.5 border-2 border-white/30 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Birth Date
                </label>
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleChange('birthDate', e.target.value)}
                  className="w-full px-4 py-3.5 border-2 border-white/30 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Birth Time (Optional)
                </label>
                <input
                  type="time"
                  value={formData.birthTime}
                  onChange={(e) => handleChange('birthTime', e.target.value)}
                  disabled={formData.timeUnknown}
                  className="w-full px-4 py-3.5 border-2 border-white/30 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <label className="flex items-center mt-3 text-white/80 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.timeUnknown}
                    onChange={(e) => handleChange('timeUnknown', e.target.checked)}
                    className="mr-2 w-4 h-4 text-amber-500 border-white/30 rounded focus:ring-amber-400"
                  />
                  <span className="text-sm">I don't know my birth time</span>
                </label>
                {formData.timeUnknown && (
                  <p className="mt-2 text-sm text-amber-300">
                    We'll use noon as default. Rising sign accuracy may be limited.
                  </p>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Birth Location</h2>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Birth City
                </label>
                <input
                  type="text"
                  value={formData.birthCity}
                  onChange={(e) => handleChange('birthCity', e.target.value)}
                  placeholder="e.g., New York"
                  className="w-full px-4 py-3.5 border-2 border-white/30 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Birth Country
                </label>
                <input
                  type="text"
                  value={formData.birthCountry}
                  onChange={(e) => handleChange('birthCountry', e.target.value)}
                  placeholder="e.g., United States"
                  className="w-full px-4 py-3.5 border-2 border-white/30 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Get Your Chart</h2>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3.5 border-2 border-white/30 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
                />
                <p className="mt-2 text-sm text-white/60">
                  We'll email you a copy of your chart
                </p>
              </div>

              <div className="bg-amber-500/20 border border-amber-400/50 rounded-xl p-4">
                <p className="text-white/90 text-sm leading-relaxed">
                  By continuing, you agree to our Terms of Service and Privacy Policy.
                  Your data is encrypted and secure.
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="flex-1 px-6 py-3.5 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all border-2 border-white/20 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!canProceed() || loading}
              className="flex-1 px-6 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? 'Creating...' : step === 3 ? 'Create Chart' : 'Continue'}
              {!loading && step < 3 && <ArrowRight className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-white/60 text-sm">
            100% free preview • No credit card required
          </p>
        </div>
      </div>
    </div>
  );
}
