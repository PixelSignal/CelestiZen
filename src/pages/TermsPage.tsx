import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export function TermsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => navigate('/')} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: October 1, 2025</p>

          <div className="prose max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using Cosmic Chart's services, you accept and agree to be bound by
                the terms and provisions of this agreement. If you do not agree to these terms,
                please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Service Description</h2>
              <p className="text-gray-700 leading-relaxed">
                Cosmic Chart provides personalized astrology birth chart reports based on information
                you provide. Our reports are for entertainment and self-discovery purposes and should
                not be considered as professional advice for medical, legal, financial, or
                psychological matters.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. User Responsibilities</h2>
              <p className="text-gray-700 leading-relaxed mb-3">You agree to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide accurate and complete information when creating your birth chart</li>
                <li>Maintain the confidentiality of your account information</li>
                <li>Not use our services for any illegal or unauthorized purpose</li>
                <li>Not reproduce, distribute, or commercially exploit our content without permission</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Payment and Pricing</h2>
              <p className="text-gray-700 leading-relaxed">
                Our birth chart reports are available for a one-time payment of $49.99. All payments
                are processed securely through Stripe. Prices are subject to change, but any changes
                will not affect orders already placed.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Refund Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We offer a 30-day money-back guarantee. If you are not satisfied with your birth
                chart report, you may request a full refund within 30 days of purchase. Please see
                our Refund Policy for complete details.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                All content, including but not limited to text, graphics, logos, and software, is the
                property of Cosmic Chart and is protected by copyright and other intellectual
                property laws. Your birth chart report is for your personal use only.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                Cosmic Chart shall not be liable for any indirect, incidental, special, or
                consequential damages resulting from the use or inability to use our services. Our
                reports are provided "as is" without warranties of any kind.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Disclaimer</h2>
              <p className="text-gray-700 leading-relaxed">
                Astrology is not a science and should be used for entertainment purposes only. Our
                reports should not be used as a substitute for professional advice. You are
                responsible for your own decisions and actions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify users of any
                material changes via email or through our website. Your continued use of our services
                after such changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                For questions about these Terms of Service, please contact us at
                support@cosmichart.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
