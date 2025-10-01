import { useNavigate } from 'react-router-dom';
import { Sparkles, Shield, Clock, CheckCircle, ChevronDown, Mail, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { useState } from 'react';

export function LandingPage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What do I get for $1.02?',
      answer: 'You get a complete 20-25 page birth chart report including your Sun, Moon, Rising signs, all planetary positions and aspects, life domain insights (career, love, money, health), and a downloadable PDF you can keep forever.'
    },
    {
      question: 'How accurate is the birth chart?',
      answer: 'We use professional astronomical ephemeris data - the same calculations used by professional astrologers. If you know your exact birth time, your chart will be highly accurate. Without birth time, we use noon as default and some house-related interpretations may be less precise.'
    },
    {
      question: 'What if I\'m not satisfied?',
      answer: 'We offer a simple refund within 7 days if you\'re unhappy with your report. Just email us and we\'ll process it immediately - no questions asked.'
    },
    {
      question: 'How quickly will I receive my report?',
      answer: 'Your full report is generated instantly after payment and delivered to your email within 2 minutes. You can also access it directly on the website through a private link.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-amber-400" />
              <span className="text-2xl font-bold text-white">Celestizen</span>
            </div>
            <button
              onClick={() => navigate('/chart/new')}
              className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Discover Your
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
                Cosmic Blueprint
              </span>
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              CelestiZen combines ancient wisdom with modern technology to help you achieve balance, clarity, and purpose. Unlock your inner potential with personalized cosmic guidance and mindfulness practices tailored to your unique energy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={() => navigate('/chart/new')}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-xl"
              >
                Start Your Journey
              </button>
              <button
                onClick={() => {
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-lg font-semibold rounded-xl hover:bg-white/20 transition-all border-2 border-white/20"
              >
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="flex items-center gap-2 text-amber-400 mb-1">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-2xl font-bold">50,000+</span>
                </div>
                <p className="text-white/60 text-sm">Happy Users</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-amber-400 mb-1">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-2xl font-bold">4.9/5</span>
                </div>
                <p className="text-white/60 text-sm">Average Rating</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-amber-400 mb-1">
                  <Shield className="w-5 h-5" />
                  <span className="text-2xl font-bold">100%</span>
                </div>
                <p className="text-white/60 text-sm">Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Chart Visual */}
          <div className="relative">
            <div className="relative w-full max-w-md mx-auto aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-amber-600/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="relative bg-slate-900/50 backdrop-blur-md border-2 border-purple-500/30 rounded-full p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">♈</div>
                  <div className="text-amber-400 text-sm font-semibold mb-2">Cosmic Energy</div>
                  <div className="text-white text-3xl font-bold mb-2">Rising ♋</div>
                  <div className="text-purple-400 text-lg">87% Aligned</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-white text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { icon: '📅', title: 'Enter Birth Info', desc: 'Provide your birth date, time, and location' },
            { icon: '🔮', title: 'Precise Analysis', desc: 'Advanced algorithms calculate your chart' },
            { icon: '💳', title: 'Secure Payment', desc: 'Just $1.02 for your complete report' },
            { icon: '📊', title: 'Get Report', desc: 'Instant access to your cosmic blueprint' },
          ].map((step, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
              <div className="text-5xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-white/70">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Value Comparison */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Premium Quality at an Unbeatable Price
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Other Services */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/10">
              <h3 className="text-2xl font-bold text-white/60 mb-6 line-through">
                Other Services
              </h3>
              <ul className="space-y-4 text-white/60">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">⚠️</span>
                  <span>$15 - $30 for similar reports</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">⚠️</span>
                  <span>Generic interpretations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">⚠️</span>
                  <span>Confusing technical jargon</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">⚠️</span>
                  <span>No refund guarantee</span>
                </li>
              </ul>
            </div>

            {/* Celestizen */}
            <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-8 border-2 border-amber-400/50 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-amber-400 text-slate-900 px-4 py-1 rounded-full text-sm font-bold">
                BEST VALUE
              </div>
              <h3 className="text-3xl font-bold text-white mb-6">
                Celestizen
              </h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-amber-400">$1.02</span>
                <span className="text-white/60 ml-2">one-time</span>
              </div>
              <ul className="space-y-4 text-white">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>Complete 20-25 page personalized report</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>Beginner-friendly language with practical tips</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>Professional ephemeris calculations</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>7-day money-back guarantee</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>Downloadable PDF + online access</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Report Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">See What You'll Receive</h2>
          <p className="text-xl text-white/70">Here's a sneak peek of your beautifully designed personalized astrological report</p>
        </div>

        <div className="max-w-5xl mx-auto bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md border-2 border-purple-500/30 rounded-3xl p-8 md:p-12">
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-bold text-purple-400 mb-2">Your Cosmic Blueprint: Sarah Smith</h3>
            <p className="text-white/60">Born May 15th, 1992 • 2:34 PM • Los Angeles, CA</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-slate-900/50 rounded-xl p-6 border border-amber-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">☀️</div>
                  <div>
                    <h4 className="text-lg font-bold text-amber-400">Sun Sign</h4>
                    <p className="text-2xl font-bold text-white">Taurus ♉</p>
                  </div>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  Your core identity embodies the essential qualities of stability, sensuality, and determination. You possess a strong sense of self and an innate desire for security and comfort.
                </p>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-purple-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">🌙</div>
                  <div>
                    <h4 className="text-lg font-bold text-purple-400">Moon Sign</h4>
                    <p className="text-2xl font-bold text-white">Cancer ♋</p>
                  </div>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  Your emotional nature and subconscious need are deeply influenced by Cancer. This lunar placement indicates a profound connection to feelings and a strong desire for emotional security.
                </p>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-pink-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">⬆️</div>
                  <div>
                    <h4 className="text-lg font-bold text-pink-400">Rising Sign</h4>
                    <p className="text-2xl font-bold text-white">Scorpio ♏</p>
                  </div>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  Your Scorpio Rising means others perceive you as intense, mysterious, and magnetic. This asc endant reveals how others initially see you and the energies that shape your approach to new experiences.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl p-6 border border-purple-400/30 flex flex-col justify-center">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">♉</div>
                <h3 className="text-2xl font-bold text-white mb-2">At a Glance</h3>
              </div>
              <div className="space-y-3 text-white/90">
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-white/60">Element:</span>
                  <span className="font-semibold">Earth</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-white/60">Quality:</span>
                  <span className="font-semibold">Fixed</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-white/60">Ruling Planet:</span>
                  <span className="font-semibold">Venus</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-white/60">Life Theme:</span>
                  <span className="font-semibold">Building Beauty</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-white/60 text-sm italic border-t border-white/10 pt-6">
            "This is a condensed version of your full astrological profile. Your complete cosmic blueprint contains critical layers of wisdom waiting to be discovered."
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">What Our Customers Say</h2>
          <p className="text-xl text-white/70">Join thousands who've discovered their Cosmic Blueprint</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: 'Sarah M.',
              location: 'London, UK',
              rating: 5,
              text: '"Incredibly accurate and insightful! The career guidance section was spot-on and finally helped me understand why certain jobs energize me."'
            },
            {
              name: 'Carlos R.',
              location: 'São Paulo, BR',
              rating: 5,
              text: '"I was skeptical at first, but the relationship section blew my mind. It perfectly articulated things I\'ve known but couldn\'t explain. Highly recommended!"'
            },
            {
              name: 'Emma K.',
              location: 'New York, USA',
              rating: 5,
              text: '"The birth chart analysis revealed personality traits I never knew I had. It\'s given me clarity and peace of mind. Worth every penny!"'
            },
            {
              name: 'David P.',
              location: 'Madrid, ES',
              rating: 5,
              text: '"Best investment I\'ve made for personal growth. The report is comprehensive, beautifully designed, and incredibly helpful."'
            },
            {
              name: 'Lisa T.',
              location: 'Sydney, AU',
              rating: 5,
              text: '"The timing couldn\'t have been better. My life purpose section really struck a chord, and I finally understand my deeper calling."'
            },
            {
              name: 'James L.',
              location: 'Toronto, CA',
              rating: 5,
              text: '"Detailed, professional, and surprisingly accurate. The planetary influences section helped me understand my behavioral patterns."'
            }
          ].map((testimonial, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-amber-400">★</span>
                ))}
              </div>
              <p className="text-white/80 mb-4 leading-relaxed italic">{testimonial.text}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-white/50 text-sm">{testimonial.location}</p>
                </div>
                <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-semibold">
                  Verified
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/60">
          <div className="flex items-center gap-2">
            <span className="text-amber-400">●</span>
            <span>3,000+ Reports Generated</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-400">●</span>
            <span>4.9+ Average Rating</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-400">●</span>
            <span>30-Day Guarantee</span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-lg font-semibold text-white">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-white/60 transition-transform ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-4">
                    <p className="text-white/70 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose CelestiZen */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Why Choose CelestiZen?</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              icon: '✓',
              title: 'Certified',
              desc: 'Professional astronomical calculations using NASA ephemeris data',
              color: 'from-green-500 to-emerald-500'
            },
            {
              icon: '⚡',
              title: 'Instant',
              desc: 'Get your complete report within minutes of placing your order',
              color: 'from-purple-500 to-pink-500'
            },
            {
              icon: '🌍',
              title: 'Global',
              desc: 'Accurate for any location worldwide with timezone support',
              color: 'from-blue-500 to-cyan-500'
            },
            {
              icon: '👑',
              title: 'Premium',
              desc: 'High-quality PDF report you can save, print, and share',
              color: 'from-amber-500 to-orange-500'
            }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center hover:bg-white/10 transition-all">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center text-3xl`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-white/70">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-amber-600/20 backdrop-blur-sm rounded-2xl p-12 border-2 border-purple-400/50">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Discover Your Cosmic Blueprint?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Start with a free mini-chart preview. Upgrade to the full report for just $1.02.
          </p>
          <button
            onClick={() => navigate('/chart/new')}
            className="px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-xl"
          >
            Start Your Journey Now
          </button>
          <p className="mt-6 text-white/60">
            <Shield className="w-4 h-4 inline mr-2" />
            30-Day Money-Back Guarantee • Instant Delivery
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="w-6 h-6 text-purple-400" />
                <span className="text-xl font-bold text-white">CelestiZen</span>
              </div>
              <p className="text-white/60 mb-4">
                Discover your cosmic blueprint with ancient wisdom and modern technology.
              </p>
              <div className="flex items-center gap-2 text-white/60 mb-3">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@celestizen.com" className="hover:text-purple-400 transition-colors">
                  info@celestizen.com
                </a>
              </div>
              <div className="flex gap-3">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-purple-600 transition-all">
                  <Facebook className="w-4 h-4 text-white" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-purple-600 transition-all">
                  <Twitter className="w-4 h-4 text-white" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-purple-600 transition-all">
                  <Instagram className="w-4 h-4 text-white" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-purple-600 transition-all">
                  <Youtube className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Zodiac Signs</h3>
              <ul className="grid grid-cols-2 gap-2 text-sm text-white/60">
                <li>
                  <button onClick={() => navigate('/signs/aries')} className="hover:text-purple-400 transition-colors">
                    ♈ Aries
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/signs/taurus')} className="hover:text-purple-400 transition-colors">
                    ♉ Taurus
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/signs/gemini')} className="hover:text-purple-400 transition-colors">
                    ♊ Gemini
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/signs/cancer')} className="hover:text-purple-400 transition-colors">
                    ♋ Cancer
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/signs/leo')} className="hover:text-purple-400 transition-colors">
                    ♌ Leo
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/signs/virgo')} className="hover:text-purple-400 transition-colors">
                    ♍ Virgo
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/signs/libra')} className="hover:text-purple-400 transition-colors">
                    ♎ Libra
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/signs/scorpio')} className="hover:text-purple-400 transition-colors">
                    ♏ Scorpio
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/signs/sagittarius')} className="hover:text-purple-400 transition-colors">
                    ♐ Sagittarius
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/signs/capricorn')} className="hover:text-purple-400 transition-colors">
                    ♑ Capricorn
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/signs/aquarius')} className="hover:text-purple-400 transition-colors">
                    ♒ Aquarius
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/signs/pisces')} className="hover:text-purple-400 transition-colors">
                    ♓ Pisces
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-white/60">
                <li>
                  <button onClick={() => navigate('/about')} className="hover:text-purple-400 transition-colors">
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/blog')} className="hover:text-purple-400 transition-colors">
                    Blog
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/contact')} className="hover:text-purple-400 transition-colors">
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-white/60">
                <li>
                  <button onClick={() => navigate('/terms')} className="hover:text-purple-400 transition-colors">
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/privacy')} className="hover:text-purple-400 transition-colors">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/refund')} className="hover:text-purple-400 transition-colors">
                    Refund Policy
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center text-white/40 text-sm pt-8 border-t border-white/10">
            <p>© 2025 CelestiZen. All rights reserved. Made with cosmic energy and ancient wisdom.</p>
            <p className="mt-2 text-xs">For entertainment and self-reflection purposes only.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}