import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export function RefundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => navigate('/')} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-6">Refund Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: October 1, 2025</p>

          <div className="prose max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">30-Day Money-Back Guarantee</h2>
              <p className="text-gray-700 leading-relaxed">
                At Cosmic Chart, we stand behind the quality of our birth chart reports. We offer a
                full 30-day money-back guarantee on all purchases. If you are not completely
                satisfied with your personalized astrology report, you can request a full refund
                within 30 days of your purchase date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">How to Request a Refund</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                To request a refund, please follow these steps:
              </p>
              <ol className="list-decimal pl-6 text-gray-700 space-y-2">
                <li>Email us at support@cosmichart.com with your order details</li>
                <li>Include your full name and the email address used for the purchase</li>
                <li>Briefly explain why you're requesting a refund (optional but appreciated)</li>
                <li>We will process your refund within 3-5 business days</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Refund Processing Time</h2>
              <p className="text-gray-700 leading-relaxed">
                Once your refund is approved, it will be processed and a credit will automatically be
                applied to your original method of payment within 5-10 business days, depending on
                your card issuer's policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">What Happens After a Refund</h2>
              <p className="text-gray-700 leading-relaxed">
                After a refund is issued, your access to the birth chart report will be revoked. You
                will receive a confirmation email once the refund has been processed.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Exceptions</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Our refund policy applies to all purchases with the following conditions:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Refund requests must be made within 30 days of purchase</li>
                <li>We reserve the right to deny refunds for suspected fraudulent activity</li>
                <li>Each customer is eligible for one refund per calendar year</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Quality Guarantee</h2>
              <p className="text-gray-700 leading-relaxed">
                If you experience any technical issues with accessing your report or notice any
                errors in your birth chart calculations, please contact us immediately. We will work
                to resolve any issues promptly and ensure you receive an accurate, high-quality
                report.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about our refund policy or need assistance with a refund
                request, please don't hesitate to contact us:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> support@cosmichart.com
                </p>
                <p className="text-gray-700 mt-2">
                  <strong>Response Time:</strong> Within 24 hours (Monday-Friday)
                </p>
              </div>
            </section>

            <section className="mt-8 p-6 bg-indigo-50 rounded-lg border border-indigo-200">
              <h3 className="text-xl font-bold text-indigo-900 mb-3">
                Our Commitment to You
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We are committed to providing you with valuable insights through our birth chart
                reports. Your satisfaction is our priority, and we want you to feel confident in your
                purchase. If the report doesn't meet your expectations, we'll make it right with a
                full refund, no questions asked.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
