import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sparkles, Lock, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Report {
  id: string;
  summary_text: string;
  chart_data: {
    sunSign: string;
    moonSign: string;
    risingSign: string;
  };
  report_type: string;
}

export function ChartPreviewPage() {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    loadReport();
  }, [reportId]);

  const loadReport = async () => {
    try {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .eq('id', reportId)
        .single();

      if (error) throw error;
      setReport(data);
    } catch (error) {
      console.error('Error loading report:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlock = () => {
    const stripePaymentLink = import.meta.env.VITE_STRIPE_PAYMENT_LINK_URL || 'https://buy.stripe.com/test_example';
    window.location.href = `${stripePaymentLink}?client_reference_id=${reportId}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading your chart...</div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Chart not found</div>
      </div>
    );
  }

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

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl p-8 mb-8">
          <h1 className="text-3xl font-bold text-white mb-6">Your Birth Chart Preview</h1>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl p-6 border border-amber-400/30">
              <h2 className="text-2xl font-bold text-white mb-4">Your Big Three</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-amber-400 text-sm font-semibold mb-1">SUN SIGN</div>
                  <div className="text-2xl font-bold text-white">{report.chart_data.sunSign}</div>
                </div>
                <div className="text-center">
                  <div className="text-amber-400 text-sm font-semibold mb-1">MOON SIGN</div>
                  <div className="text-2xl font-bold text-white">{report.chart_data.moonSign}</div>
                </div>
                <div className="text-center">
                  <div className="text-amber-400 text-sm font-semibold mb-1">RISING SIGN</div>
                  <div className="text-2xl font-bold text-white">{report.chart_data.risingSign}</div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">Quick Insight</h3>
              <p className="text-white/80 leading-relaxed">{report.summary_text}</p>
            </div>

            <div className="relative">
              <div className="blur-sm pointer-events-none select-none">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10 mb-4">
                  <h3 className="text-xl font-bold text-white mb-3">Detailed Personality Analysis</h3>
                  <p className="text-white/60 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Your planetary positions reveal deep insights about your personality, strengths, and life path. This comprehensive analysis covers all aspects of your birth chart...
                  </p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10 mb-4">
                  <h3 className="text-xl font-bold text-white mb-3">Love & Relationships</h3>
                  <p className="text-white/60 leading-relaxed">
                    Your Venus and Mars placements indicate how you express love and attraction. Discover your relationship patterns, compatibility insights, and how to create deeper connections...
                  </p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-3">Career & Life Purpose</h3>
                  <p className="text-white/60 leading-relaxed">
                    Your Midheaven and 10th house reveal your career potential and life purpose. Learn about your professional strengths, ideal career paths, and how to achieve fulfillment...
                  </p>
                </div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-slate-900/95 backdrop-blur-md border-2 border-amber-400/50 rounded-2xl p-8 max-w-lg mx-4 shadow-2xl">
                  <div className="text-center mb-6">
                    <Lock className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-white mb-3">Unlock Your Full Report</h2>
                    <p className="text-white/80 text-lg">Get 20+ pages of personalized insights for just $1.02</p>
                  </div>

                  <div className="space-y-3 mb-8">
                    {[
                      'Complete personality analysis',
                      'Love & relationship insights',
                      'Career guidance & life purpose',
                      'Planetary positions & aspects',
                      'Houses & life domains',
                      'Downloadable PDF report'
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-white">
                        <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleUnlock}
                    className="w-full px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-lg font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-xl"
                  >
                    Unlock Full Report - $1.02
                  </button>

                  <p className="text-center text-white/60 text-sm mt-4">
                    <Lock className="w-3 h-3 inline mr-1" />
                    Secure payment • 7-day refund guarantee
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-white/60 text-sm">
            Most astrology sites charge $15-$30 for similar reports.
            <br />
            We believe everyone should have access to their birth chart.
          </p>
        </div>
      </div>
    </div>
  );
}
