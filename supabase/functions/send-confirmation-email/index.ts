import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { chartId } = await req.json();

    if (!chartId) {
      return new Response(
        JSON.stringify({ error: 'Missing chartId' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: chart, error } = await supabase
      .from('birth_charts')
      .select('*')
      .eq('id', chartId)
      .single();

    if (error || !chart) {
      return new Response(
        JSON.stringify({ error: 'Chart not found' }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #4F46E5 0%, #9333EA 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .chart-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .button { display: inline-block; background: linear-gradient(to right, #F59E0B, #F97316); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: bold; }
          .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✨ Your Birth Chart is Ready!</h1>
          </div>
          <div class="content">
            <p>Hello ${chart.first_name},</p>
            <p>Thank you for your purchase! Your personalized astrology birth chart report is now available.</p>
            
            <div class="chart-info">
              <h3>Your Chart Details:</h3>
              <p><strong>Name:</strong> ${chart.first_name} ${chart.last_name}</p>
              <p><strong>Birth Date:</strong> ${new Date(chart.birth_date).toLocaleDateString()}</p>
              ${chart.birth_time ? `<p><strong>Birth Time:</strong> ${chart.birth_time}</p>` : ''}
              <p><strong>Birth Place:</strong> ${chart.birth_place}</p>
            </div>

            <p>Your complete birth chart includes:</p>
            <ul>
              <li>Sun, Moon, and Rising sign interpretations</li>
              <li>Complete planetary positions</li>
              <li>House placements and aspects</li>
              <li>Personality insights and life path guidance</li>
              <li>Relationship compatibility overview</li>
              <li>Career and purpose analysis</li>
            </ul>

            <center>
              <a href="${supabaseUrl.replace('/v1', '')}/success?chartId=${chartId}" class="button">
                View Your Birth Chart
              </a>
            </center>

            <p>If you have any questions or need support, please don't hesitate to reach out to us at support@cosmichart.com</p>

            <div class="footer">
              <p>© 2025 Cosmic Chart. All rights reserved.</p>
              <p>Protected by our 30-day money-back guarantee</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    console.log('Email would be sent to:', chart.user_email);
    console.log('Email content generated successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email notification prepared',
        recipient: chart.user_email 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Email notification error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to send email' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});