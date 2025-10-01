import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { CheckCircle, Download, Share2, Sparkles, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type BirthChart = Database['public']['Tables']['birth_charts']['Row'];

export function SuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const chartId = searchParams.get('chartId');
  const [chart, setChart] = useState<BirthChart | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!chartId) {
      navigate('/');
      return;
    }

    const fetchChart = async () => {
      try {
        const { data, error } = await supabase
          .from('birth_charts')
          .select('*')
          .eq('id', chartId)
          .single();

        if (error) throw error;
        setChart(data);
      } catch (error) {
        console.error('Error fetching chart:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchChart();
  }, [chartId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen cosmic-bg flex items-center justify-center">
        <div className="text-white text-xl">Loading your chart...</div>
      </div>
    );
  }

  if (!chart) {
    return null;
  }

  const chartData = chart.chart_data as any;

  return (
    <div className="min-h-screen cosmic-bg py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Birth Chart is Ready!
          </h1>
          <p className="text-xl text-gray-300">
            Thank you, {chart.first_name}! Your personalized astrology report has been generated.
          </p>
        </div>

        <Card className="glass-effect text-white mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-amber-400" />
              <span>Your Cosmic Blueprint</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4">Birth Information</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Name:</strong> {chart.first_name} {chart.last_name}
                  </p>
                  <p>
                    <strong>Date:</strong> {new Date(chart.birth_date).toLocaleDateString()}
                  </p>
                  {chart.birth_time && (
                    <p>
                      <strong>Time:</strong> {chart.birth_time}
                    </p>
                  )}
                  <p>
                    <strong>Place:</strong> {chart.birth_place}
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-lg p-6 border border-amber-500/30">
                <h3 className="text-lg font-bold mb-4 text-amber-400">Your Core Signs</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                      <Star className="w-5 h-5 text-white fill-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-300">Sun Sign</p>
                      <p className="font-bold">{chartData?.sunSign}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
                      <Star className="w-5 h-5 text-white fill-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-300">Moon Sign</p>
                      <p className="font-bold">{chartData?.moonSign}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                      <Star className="w-5 h-5 text-white fill-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-300">Rising Sign</p>
                      <p className="font-bold">{chartData?.risingSign}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {chartData?.planets && (
              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4">Planetary Positions</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {chartData.planets.map((planet: any, index: number) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="font-medium">{planet.planet}</span>
                      <span className="text-gray-300">
                        {planet.sign} {planet.degree.toFixed(1)}° (House {planet.house})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {chartData?.elementalBalance && (
              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4">Elemental Balance</h3>
                <div className="space-y-3">
                  {Object.entries(chartData.elementalBalance).map(([element, value]: [string, any]) => (
                    <div key={element}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="capitalize">{element}</span>
                        <span>{value.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg p-6 border border-indigo-500/30">
              <h3 className="text-lg font-bold mb-3">Sample Interpretation</h3>
              <p className="text-sm leading-relaxed text-gray-200">
                With your <strong>{chartData?.sunSign}</strong> Sun, you embody the core traits of
                confidence, creativity, and determination. Your <strong>{chartData?.moonSign}</strong>{' '}
                Moon reveals your emotional nature and how you nurture yourself and others. Your{' '}
                <strong>{chartData?.risingSign}</strong> Rising sign represents how others perceive you
                and your approach to new experiences.
              </p>
              <p className="text-sm leading-relaxed text-gray-200 mt-3">
                This unique combination creates a complex personality that balances ambition with
                emotional depth. Your planetary placements indicate natural talents in communication,
                creativity, and leadership.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button variant="secondary" size="lg">
            <Download className="w-5 h-5 mr-2" />
            Download Full Report (PDF)
          </Button>
          <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
            <Share2 className="w-5 h-5 mr-2" />
            Share Results
          </Button>
        </div>

        <Card className="glass-effect text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">What's Next?</h3>
            <p className="text-gray-300 mb-6">
              Check your email for your complete birth chart report and personalized insights. We've
              sent it to <strong>{chart.user_email}</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="ghost" onClick={() => navigate('/')} className="text-white">
                Return to Home
              </Button>
              <Button variant="secondary" onClick={() => navigate('/funnel')}>
                Create Another Chart
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-white/60 text-sm">
          <p>Questions? Email us at support@cosmichart.com</p>
          <p className="mt-2">
            Protected by our{' '}
            <a href="/refund" className="underline hover:text-white">
              30-day money-back guarantee
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
