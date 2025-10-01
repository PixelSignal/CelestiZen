export interface GeocodingResult {
  latitude: number;
  longitude: number;
  displayName: string;
}

export async function geocodeLocation(location: string): Promise<GeocodingResult> {
  try {
    const encodedLocation = encodeURIComponent(location);
    const url = `https://nominatim.openstreetmap.org/search?q=${encodedLocation}&format=json&limit=1`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'CelestiZen/1.0 (Astrology App)'
      }
    });

    if (!response.ok) {
      throw new Error(`Geocoding failed: ${response.status}`);
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      throw new Error('Location not found');
    }

    const result = data[0];

    return {
      latitude: parseFloat(result.lat),
      longitude: parseFloat(result.lon),
      displayName: result.display_name
    };
  } catch (error) {
    console.error('Geocoding error:', error);
    throw new Error('Failed to geocode location. Please check the location name and try again.');
  }
}

export async function reverseGeocode(latitude: number, longitude: number): Promise<string> {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'CelestiZen/1.0 (Astrology App)'
      }
    });

    if (!response.ok) {
      throw new Error(`Reverse geocoding failed: ${response.status}`);
    }

    const data = await response.json();

    return data.display_name || `${latitude}, ${longitude}`;
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return `${latitude}, ${longitude}`;
  }
}
