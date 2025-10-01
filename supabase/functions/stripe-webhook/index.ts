import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey, Stripe-Signature',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const signature = req.headers.get('stripe-signature');
    const body = await req.text();
    let event;

    try {
      event = JSON.parse(body);
    } catch (err) {
      console.error('Invalid JSON:', err);
      return new Response(
        JSON.stringify({ error: 'Invalid payload' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('Received Stripe event:', event.type);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const reportId = session.client_reference_id;

      if (!reportId) {
        console.error('No client_reference_id found');
        return new Response(
          JSON.stringify({ error: 'Missing report ID' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      const { data: report, error: reportError } = await supabase
        .from('reports')
        .select('user_id, chart_input_id')
        .eq('id', reportId)
        .single();

      if (reportError || !report) {
        console.error('Report not found:', reportError);
        return new Response(
          JSON.stringify({ error: 'Report not found' }),
          {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      const { error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: report.user_id,
          price_paid_cents: 102,
          currency: 'USD',
          stripe_checkout_session_id: session.id,
          status: 'paid'
        });

      if (orderError) {
        console.error('Error creating order:', orderError);
      }

      const { error: reportUpdateError } = await supabase
        .from('reports')
        .update({
          report_type: 'full_report'
        })
        .eq('id', reportId);

      if (reportUpdateError) {
        console.error('Error updating report:', reportUpdateError);
      }

      console.log('Payment processed successfully for report:', reportId);
    }

    return new Response(
      JSON.stringify({ received: true }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});