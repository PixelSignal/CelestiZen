import { useEffect } from 'react';
import { supabase } from '../lib/supabase';

function getDeviceType(): string {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
}

function getBrowser(): string {
  const ua = navigator.userAgent;
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Safari')) return 'Safari';
  if (ua.includes('Edge')) return 'Edge';
  return 'Other';
}

function getSessionId(): string {
  let sessionId = sessionStorage.getItem('cosmic_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem('cosmic_session_id', sessionId);
  }
  return sessionId;
}

function getUtmParams(): { source?: string; medium?: string; campaign?: string } {
  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get('utm_source') || undefined,
    medium: params.get('utm_medium') || undefined,
    campaign: params.get('utm_campaign') || undefined,
  };
}

export function useSessionTracking() {
  useEffect(() => {
    const trackSession = async () => {
      const sessionId = getSessionId();
      const existingSession = sessionStorage.getItem('cosmic_session_tracked');

      if (existingSession) return;

      const { source, medium, campaign } = getUtmParams();

      try {
        await supabase.from('user_sessions').insert({
          session_id: sessionId,
          device_type: getDeviceType(),
          browser: getBrowser(),
          utm_source: source,
          utm_medium: medium,
          utm_campaign: campaign,
          converted: false,
        });

        sessionStorage.setItem('cosmic_session_tracked', 'true');
      } catch (error) {
        console.error('Error tracking session:', error);
      }
    };

    trackSession();
  }, []);
}

export async function markSessionConverted() {
  const sessionId = getSessionId();
  try {
    await supabase
      .from('user_sessions')
      .update({ converted: true })
      .eq('session_id', sessionId);
  } catch (error) {
    console.error('Error marking conversion:', error);
  }
}
