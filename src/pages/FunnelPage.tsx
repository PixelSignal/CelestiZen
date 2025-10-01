import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Checkbox } from '../components/ui/Checkbox';
import { Progress } from '../components/ui/Progress';
import { ArrowRight, Sparkles, Lock, Check, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { calculateSunSign, generateChartData } from '../lib/astrology';
import { geocodeLocation } from '../lib/geocoding';

const stepSchemas = [
  z.object({
    email: z.string().email('Please enter a valid email address'),
  }),
  z.object({
    firstName: z.string().min(2, 'Please enter your first name'),
  }),
  z.object({
    birthDay: z.string().min(1, 'Required'),
    birthMonth: z.string().min(1, 'Required'),
    birthYear: z.string().min(1, 'Required'),
  }),
  z.object({
    birthHour: z.string().optional(),
    birthMinute: z.string().optional(),
    timeUnknown: z.boolean().optional(),
  }),
  z.object({
    birthCity: z.string().min(2, 'Please enter your birth city'),
  }),
];

const days = Array.from({ length: 31 }, (_, i) => ({ value: i + 1, label: String(i + 1) }));
const months = [
  { value: 1, label: 'January' }, { value: 2, label: 'February' }, { value: 3, label: 'March' },
  { value: 4, label: 'April' }, { value: 5, label: 'May' }, { value: 6, label: 'June' },
  { value: 7, label: 'July' }, { value: 8, label: 'August' }, { value: 9, label: 'September' },
  { value: 10, label: 'October' }, { value: 11, label: 'November' }, { value: 12, label: 'December' },
];
const years = Array.from({ length: 100 }, (_, i) => ({ value: 2025 - i, label: String(2025 - i) }));
const hours = Array.from({ length: 24 }, (_, i) => ({ value: i, label: String(i).padStart(2, '0') }));
const minutes = Array.from({ length: 60 }, (_, i) => ({ value: i, label: String(i).padStart(2, '0') }));

export function FunnelPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [abandonedCheckoutId, setAbandonedCheckoutId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(stepSchemas[currentStep]),
    mode: 'onChange',
  });

  const timeUnknown = watch('timeUnknown');
  const totalSteps = 5;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  useEffect(() => {
    if (formData.email && !abandonedCheckoutId) {
      saveAbandonedCheckout();
    }
  }, [formData.email]);

  const saveAbandonedCheckout = async () => {
    if (abandonedCheckoutId) return;

    try {
      const { data, error } = await supabase
        .from('birth_charts')
        .insert({
          user_email: formData.email,
          first_name: formData.firstName || '',
          last_name: '',
          birth_date: '2000-01-01',
          birth_place: '',
          latitude: 0,
          longitude: 0,
          timezone: 'UTC',
          payment_status: 'abandoned',
          chart_data: {},
        })
        .select()
        .single();

      if (!error && data) {
        setAbandonedCheckoutId(data.id);
      }
    } catch (error) {
      console.error('Error saving abandoned checkout:', error);
    }
  };

  const updateAbandonedCheckout = async (updates: any) => {
    if (!abandonedCheckoutId) return;

    try {
      await supabase
        .from('birth_charts')
        .update(updates)
        .eq('id', abandonedCheckoutId);
    } catch (error) {
      console.error('Error updating abandoned checkout:', error);
    }
  };

  const onSubmit = async (data: any) => {
    const updatedData = { ...formData, ...data };
    setFormData(updatedData);

    if (abandonedCheckoutId) {
      await updateAbandonedCheckout({
        first_name: updatedData.firstName || formData.firstName,
        ...data,
      });
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      await handleFinalSubmit(updatedData);
    }
  };

  const handleFinalSubmit = async (data: any) => {
    setLoading(true);
    try {
      const birthDate = `${data.birthYear}-${String(data.birthMonth).padStart(2, '0')}-${String(data.birthDay).padStart(2, '0')}`;
      const birthTime = data.timeUnknown
        ? null
        : `${String(data.birthHour || 12).padStart(2, '0')}:${String(data.birthMinute || 0).padStart(2, '0')}:00`;

      let latitude = 40.7128;
      let longitude = -74.006;
      let birthPlace = data.birthCity;

      try {
        const geocoded = await geocodeLocation(data.birthCity);
        latitude = geocoded.latitude;
        longitude = geocoded.longitude;
        birthPlace = geocoded.displayName;
      } catch (error) {
        console.warn('Geocoding failed, using default coordinates');
      }

      const chartData = generateChartData(birthDate, birthTime, latitude, longitude);

      let chartId = abandonedCheckoutId;

      if (abandonedCheckoutId) {
        await supabase
          .from('birth_charts')
          .update({
            first_name: data.firstName,
            birth_date: birthDate,
            birth_time: birthTime,
            birth_place: birthPlace,
            latitude,
            longitude,
            timezone: 'UTC',
            chart_data: chartData,
            payment_status: 'pending',
          })
          .eq('id', abandonedCheckoutId);
      } else {
        const { data: insertData, error } = await supabase
          .from('birth_charts')
          .insert({
            user_email: data.email,
            first_name: data.firstName,
            last_name: '',
            birth_date: birthDate,
            birth_time: birthTime,
            birth_place: birthPlace,
            latitude,
            longitude,
            timezone: 'UTC',
            chart_data: chartData,
            payment_status: 'pending',
          })
          .select()
          .single();

        if (error) throw error;
        chartId = insertData.id;
      }

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const successUrl = `${supabaseUrl}/functions/v1/stripe-webhook?chart_id=${chartId}`;
      const stripeCheckoutUrl = `https://buy.stripe.com/aFaeVd1hy8hudcC45C7bW04?client_reference_id=${chartId}&prefilled_email=${encodeURIComponent(data.email)}&success_url=${encodeURIComponent(successUrl)}`;
      window.location.href = stripeCheckoutUrl;
    } catch (error) {
      console.error('Error creating birth chart:', error);
      alert('There was an error creating your chart. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isFieldFilled = (field: string) => {
    return formData[field] !== undefined && formData[field] !== '';
  };

  return (
    <div className="min-h-screen cosmic-bg py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Sparkles className="w-7 h-7 text-amber-400" />
            <h1 className="text-2xl md:text-3xl font-bold text-white">Your Personalized Birth Chart</h1>
          </div>
          <p className="text-white/90 text-sm md:text-base mb-4">
            Join 10,000+ people who discovered their cosmic blueprint
          </p>
          <Progress value={progress} showLabel className="max-w-md mx-auto" />
        </div>

        <Card className="glass-effect text-white border-2 border-white/20 shadow-2xl">
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                      Unlock Your Cosmic Truth
                    </h2>
                    <p className="text-white/80 text-sm md:text-base">
                      Discover what the stars reveal about your personality, purpose, and path
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl p-6 border border-amber-500/40">
                    <div className="flex items-start space-x-3 mb-4">
                      <Star className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-lg mb-2">What You'll Get:</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center space-x-2">
                            <Check className="w-4 h-4 text-green-400" />
                            <span>Complete astrological birth chart analysis</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Check className="w-4 h-4 text-green-400" />
                            <span>AI-powered personalized interpretation</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Check className="w-4 h-4 text-green-400" />
                            <span>Detailed insights on personality & life path</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Check className="w-4 h-4 text-green-400" />
                            <span>Planetary positions & house placements</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-amber-500/30">
                      <span className="text-2xl font-bold text-amber-400">$1.02</span>
                      <span className="text-sm text-white/70">Only takes 2 minutes</span>
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-xl p-5 border border-white/20">
                    <label className="block text-sm font-semibold mb-2">
                      Enter your email to get started
                    </label>
                    <Input
                      {...register('email')}
                      type="email"
                      placeholder="your@email.com"
                      error={errors.email?.message as string}
                      className="text-base"
                    />
                    <div className="flex items-center space-x-2 mt-3">
                      <Lock className="w-4 h-4 text-green-400" />
                      <p className="text-xs text-white/70">
                        Your data is encrypted and secure. We'll never spam you.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">What's your name?</h2>
                    <p className="text-white/70 text-sm">
                      We'll personalize your report with your name
                    </p>
                  </div>

                  <div className="bg-white/10 rounded-xl p-5 border border-white/20">
                    <Input
                      label="First Name"
                      {...register('firstName')}
                      placeholder="John"
                      error={errors.firstName?.message as string}
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">When were you born?</h2>
                    <p className="text-white/70 text-sm">
                      Your birth date determines your Sun sign
                    </p>
                  </div>

                  <div className="bg-white/10 rounded-xl p-5 border border-white/20">
                    <div className="grid grid-cols-3 gap-3">
                      <Select
                        label="Month"
                        {...register('birthMonth')}
                        options={[{ value: '', label: 'Month' }, ...months]}
                        error={errors.birthMonth?.message as string}
                      />
                      <Select
                        label="Day"
                        {...register('birthDay')}
                        options={[{ value: '', label: 'Day' }, ...days]}
                        error={errors.birthDay?.message as string}
                      />
                      <Select
                        label="Year"
                        {...register('birthYear')}
                        options={[{ value: '', label: 'Year' }, ...years]}
                        error={errors.birthYear?.message as string}
                      />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-lg p-4">
                    <p className="text-sm text-indigo-200 flex items-center space-x-2">
                      <Sparkles className="w-4 h-4" />
                      <span>We use NASA data for precise astrological calculations</span>
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">What time were you born?</h2>
                    <p className="text-white/70 text-sm">
                      This helps calculate your Rising sign (optional)
                    </p>
                  </div>

                  <div className="bg-white/10 rounded-xl p-5 border border-white/20">
                    <Checkbox
                      label="I don't know my birth time"
                      {...register('timeUnknown')}
                    />
                  </div>

                  {!timeUnknown && (
                    <div className="bg-white/10 rounded-xl p-5 border border-white/20">
                      <div className="grid grid-cols-2 gap-4">
                        <Select
                          label="Hour"
                          {...register('birthHour')}
                          options={[{ value: '', label: 'Hour' }, ...hours]}
                        />
                        <Select
                          label="Minute"
                          {...register('birthMinute')}
                          options={[{ value: '', label: 'Min' }, ...minutes]}
                        />
                      </div>
                    </div>
                  )}

                  {timeUnknown && (
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                      <p className="text-sm text-blue-200">
                        No worries! We'll create a detailed solar chart for you
                      </p>
                    </div>
                  )}
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">Where were you born?</h2>
                    <p className="text-white/70 text-sm">
                      Just your city name is enough
                    </p>
                  </div>

                  <div className="bg-white/10 rounded-xl p-5 border border-white/20">
                    <Input
                      label="Birth City"
                      {...register('birthCity')}
                      placeholder="e.g., New York, London, Tokyo"
                      error={errors.birthCity?.message as string}
                    />
                  </div>

                  <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4">
                    <p className="text-sm text-purple-200">
                      Your location determines house cusps and Rising sign accuracy
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-amber-500/30 to-orange-500/30 rounded-xl p-6 border-2 border-amber-500/50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">You're Almost There!</h3>
                      <Sparkles className="w-6 h-6 text-amber-400" />
                    </div>
                    <div className="space-y-2 text-sm mb-4">
                      {isFieldFilled('email') && (
                        <div className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-green-400" />
                          <span>Email: {formData.email}</span>
                        </div>
                      )}
                      {isFieldFilled('firstName') && (
                        <div className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-green-400" />
                          <span>Name: {formData.firstName}</span>
                        </div>
                      )}
                      {isFieldFilled('birthMonth') && (
                        <div className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-green-400" />
                          <span>Birth Date: {months.find(m => m.value == formData.birthMonth)?.label} {formData.birthDay}, {formData.birthYear}</span>
                        </div>
                      )}
                      {isFieldFilled('birthHour') || formData.timeUnknown && (
                        <div className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-green-400" />
                          <span>Birth Time: {formData.timeUnknown ? 'Unknown' : `${String(formData.birthHour || 12).padStart(2, '0')}:${String(formData.birthMinute || 0).padStart(2, '0')}`}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-amber-500/30">
                      <div>
                        <p className="text-xs text-white/70 mb-1">One-time payment</p>
                        <p className="text-3xl font-bold text-amber-400">$1.02</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-white/70">30-day guarantee</p>
                        <p className="text-xs text-green-400 font-semibold">100% secure</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-6">
                <Button
                  type="submit"
                  variant="secondary"
                  fullWidth
                  className="shadow-xl shadow-amber-500/30 text-lg py-6"
                  disabled={loading}
                  size="lg"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Processing...
                    </>
                  ) : currentStep === totalSteps - 1 ? (
                    <>
                      <Lock className="w-5 h-5 mr-2" />
                      Complete Your Order
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>

                {currentStep === totalSteps - 1 && (
                  <p className="text-center text-xs text-white/60 mt-3">
                    By completing your order, you agree to our Terms of Service and Privacy Policy
                  </p>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6 space-y-3">
          <div className="flex items-center justify-center space-x-6 text-xs text-white/70">
            <div className="flex items-center space-x-1">
              <Lock className="w-3 h-3" />
              <span>Secure Checkout</span>
            </div>
            <div className="flex items-center space-x-1">
              <Check className="w-3 h-3" />
              <span>Money-Back Guarantee</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3" />
              <span>10k+ Happy Customers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
