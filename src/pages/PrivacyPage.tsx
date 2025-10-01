import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export function PrivacyPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => navigate('/')} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: October 1, 2025</p>

          <div className="prose max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 leading-relaxed">
                We collect information you provide directly to us when creating your birth chart,
                including your name, email address, birth date, birth time, and birth location. This
                information is necessary to calculate and generate your personalized astrology
                report.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Generate your personalized birth chart and astrology report</li>
                <li>Process your payment and deliver your purchase</li>
                <li>Send you important updates about your order</li>
                <li>Respond to your questions and provide customer support</li>
                <li>Send you marketing communications if you've subscribed to our newsletter</li>
                <li>Improve our services and develop new features</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Information Sharing</h2>
              <p className="text-gray-700 leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may
                share your information with trusted service providers who assist us in operating our
                website and conducting our business, such as payment processors and email service
                providers. These parties are obligated to keep your information confidential.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate security measures to protect your personal information
                against unauthorized access, alteration, disclosure, or destruction. Your payment
                information is processed securely through Stripe and is never stored on our servers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Your Rights</h2>
              <p className="text-gray-700 leading-relaxed">
                You have the right to access, correct, or delete your personal information at any
                time. You may also unsubscribe from marketing emails by clicking the unsubscribe
                link in any email we send you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Cookies</h2>
              <p className="text-gray-700 leading-relaxed">
                We use cookies and similar tracking technologies to enhance your experience on our
                website, analyze site traffic, and understand user behavior. You can control cookies
                through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at
                support@cosmichart.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
