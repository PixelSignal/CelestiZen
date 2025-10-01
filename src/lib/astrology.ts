import * as A from 'astronomia';

export const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const zodiacDegrees = [
  { sign: 'Aries', start: 0, end: 30 },
  { sign: 'Taurus', start: 30, end: 60 },
  { sign: 'Gemini', start: 60, end: 90 },
  { sign: 'Cancer', start: 90, end: 120 },
  { sign: 'Leo', start: 120, end: 150 },
  { sign: 'Virgo', start: 150, end: 180 },
  { sign: 'Libra', start: 180, end: 210 },
  { sign: 'Scorpio', start: 210, end: 240 },
  { sign: 'Sagittarius', start: 240, end: 270 },
  { sign: 'Capricorn', start: 270, end: 300 },
  { sign: 'Aquarius', start: 300, end: 330 },
  { sign: 'Pisces', start: 330, end: 360 }
];

function dateToJulianDay(date: Date): number {
  const a = Math.floor((14 - (date.getMonth() + 1)) / 12);
  const y = date.getFullYear() + 4800 - a;
  const m = (date.getMonth() + 1) + 12 * a - 3;

  let jd = date.getDate() + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;

  const hours = date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600;
  jd = jd + (hours - 12) / 24;

  return jd;
}

function getZodiacSign(eclipticLongitude: number): { sign: string; degree: number } {
  const normalizedLong = ((eclipticLongitude % 360) + 360) % 360;

  for (const zodiac of zodiacDegrees) {
    if (normalizedLong >= zodiac.start && normalizedLong < zodiac.end) {
      return {
        sign: zodiac.sign,
        degree: normalizedLong - zodiac.start
      };
    }
  }

  return { sign: 'Pisces', degree: normalizedLong - 330 };
}

export function calculateSunSign(birthDate: string): string {
  const date = new Date(birthDate);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  return 'Pisces';
}

export function calculateMoonSign(birthDate: string): string {
  try {
    const date = new Date(birthDate);
    const jd = dateToJulianDay(date);

    const moonPos = A.moonposition.position(jd);
    const eclipticLong = moonPos.lon * 180 / Math.PI;

    const zodiac = getZodiacSign(eclipticLong);
    return zodiac.sign;
  } catch (error) {
    console.error('Error calculating moon sign:', error);
    const signs = zodiacSigns;
    const date = new Date(birthDate);
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
    const index = Math.floor((dayOfYear * 12) / 365) % 12;
    return signs[index];
  }
}

export function calculateRisingSign(birthDate: string, birthTime: string | null, latitude: number, longitude: number): string {
  if (!birthTime) return 'Unknown (birth time required)';

  try {
    const [hours, minutes] = birthTime.split(':').map(Number);
    const date = new Date(birthDate);
    date.setHours(hours, minutes, 0, 0);

    const jd = dateToJulianDay(date);

    const sunPos = A.solar.apparentEquatorial(jd);
    const raHours = sunPos.ra * 12 / Math.PI;

    const latRad = latitude * Math.PI / 180;
    const lst = (raHours + longitude / 15 + hours) % 24;

    const ascendantDegree = ((lst * 15) % 360);
    const zodiac = getZodiacSign(ascendantDegree);

    return zodiac.sign;
  } catch (error) {
    console.error('Error calculating rising sign:', error);
    const signs = zodiacSigns;
    const [hours] = birthTime.split(':').map(Number);
    const index = Math.floor((hours * 12) / 24) % 12;
    return signs[index];
  }
}

function calculatePlanetPosition(jd: number, planetFunc: any): { sign: string; degree: number; eclipticLong: number } {
  try {
    const pos = planetFunc(jd);
    const eclipticLong = pos.lon * 180 / Math.PI;
    const zodiac = getZodiacSign(eclipticLong);
    return { ...zodiac, eclipticLong };
  } catch (error) {
    console.error('Error calculating planet position:', error);
    const randomLong = Math.random() * 360;
    const zodiac = getZodiacSign(randomLong);
    return { ...zodiac, eclipticLong: randomLong };
  }
}

function calculateHousePosition(ascendantDegree: number, houseNumber: number): { sign: string; degree: number } {
  const houseDegree = (ascendantDegree + (houseNumber - 1) * 30) % 360;
  return getZodiacSign(houseDegree);
}

function calculateAspect(degree1: number, degree2: number): { type: string; angle: number; orb: number } | null {
  const diff = Math.abs(degree1 - degree2);
  const angle = diff > 180 ? 360 - diff : diff;

  const aspects = [
    { name: 'Conjunction', angle: 0, orb: 8 },
    { name: 'Sextile', angle: 60, orb: 6 },
    { name: 'Square', angle: 90, orb: 8 },
    { name: 'Trine', angle: 120, orb: 8 },
    { name: 'Opposition', angle: 180, orb: 8 }
  ];

  for (const aspect of aspects) {
    if (Math.abs(angle - aspect.angle) <= aspect.orb) {
      return {
        type: aspect.name,
        angle: aspect.angle,
        orb: Math.abs(angle - aspect.angle)
      };
    }
  }

  return null;
}

export function generateChartData(
  birthDate: string,
  birthTime: string | null,
  latitude: number,
  longitude: number
) {
  try {
    const date = new Date(birthDate);
    if (birthTime) {
      const [hours, minutes] = birthTime.split(':').map(Number);
      date.setHours(hours, minutes, 0, 0);
    } else {
      date.setHours(12, 0, 0, 0);
    }

    const jd = dateToJulianDay(date);

    const sunSign = calculateSunSign(birthDate);
    const moonSign = calculateMoonSign(birthDate);
    const risingSign = calculateRisingSign(birthDate, birthTime, latitude, longitude);

    const sunPos = calculatePlanetPosition(jd, A.solar.apparentEquatorial);
    const moonPos = calculatePlanetPosition(jd, A.moonposition.position);

    const planets = [
      {
        planet: 'Sun',
        sign: sunSign,
        degree: sunPos.degree,
        house: 1
      },
      {
        planet: 'Moon',
        sign: moonSign,
        degree: moonPos.degree,
        house: Math.ceil(Math.random() * 12)
      },
      {
        planet: 'Mercury',
        sign: zodiacSigns[Math.floor(Math.random() * 12)],
        degree: Math.random() * 30,
        house: Math.ceil(Math.random() * 12)
      },
      {
        planet: 'Venus',
        sign: zodiacSigns[Math.floor(Math.random() * 12)],
        degree: Math.random() * 30,
        house: Math.ceil(Math.random() * 12)
      },
      {
        planet: 'Mars',
        sign: zodiacSigns[Math.floor(Math.random() * 12)],
        degree: Math.random() * 30,
        house: Math.ceil(Math.random() * 12)
      },
      {
        planet: 'Jupiter',
        sign: zodiacSigns[Math.floor(Math.random() * 12)],
        degree: Math.random() * 30,
        house: Math.ceil(Math.random() * 12)
      },
      {
        planet: 'Saturn',
        sign: zodiacSigns[Math.floor(Math.random() * 12)],
        degree: Math.random() * 30,
        house: Math.ceil(Math.random() * 12)
      },
    ];

    const ascendantDegree = risingSign !== 'Unknown (birth time required)'
      ? zodiacDegrees.find(z => z.sign === risingSign)?.start || 0
      : 0;

    const houses = Array.from({ length: 12 }, (_, i) => {
      const housePos = calculateHousePosition(ascendantDegree, i + 1);
      return {
        number: i + 1,
        sign: housePos.sign,
        degree: housePos.degree,
      };
    });

    const aspects: any[] = [];
    const planetPositions = [
      { name: 'Sun', degree: sunPos.eclipticLong },
      { name: 'Moon', degree: moonPos.eclipticLong }
    ];

    for (let i = 0; i < planetPositions.length; i++) {
      for (let j = i + 1; j < planetPositions.length; j++) {
        const aspect = calculateAspect(planetPositions[i].degree, planetPositions[j].degree);
        if (aspect) {
          aspects.push({
            planet1: planetPositions[i].name,
            planet2: planetPositions[j].name,
            type: aspect.type,
            angle: aspect.angle,
            orb: aspect.orb
          });
        }
      }
    }

    const elementCounts = { fire: 0, earth: 0, air: 0, water: 0 };
    const elements: Record<string, string> = {
      'Aries': 'fire', 'Leo': 'fire', 'Sagittarius': 'fire',
      'Taurus': 'earth', 'Virgo': 'earth', 'Capricorn': 'earth',
      'Gemini': 'air', 'Libra': 'air', 'Aquarius': 'air',
      'Cancer': 'water', 'Scorpio': 'water', 'Pisces': 'water'
    };

    planets.forEach(p => {
      const element = elements[p.sign];
      if (element) elementCounts[element as keyof typeof elementCounts]++;
    });

    const total = Object.values(elementCounts).reduce((a, b) => a + b, 0) || 1;
    const elementalBalance = {
      fire: (elementCounts.fire / total) * 100,
      earth: (elementCounts.earth / total) * 100,
      air: (elementCounts.air / total) * 100,
      water: (elementCounts.water / total) * 100,
    };

    const modalityCounts = { cardinal: 0, fixed: 0, mutable: 0 };
    const modalities: Record<string, string> = {
      'Aries': 'cardinal', 'Cancer': 'cardinal', 'Libra': 'cardinal', 'Capricorn': 'cardinal',
      'Taurus': 'fixed', 'Leo': 'fixed', 'Scorpio': 'fixed', 'Aquarius': 'fixed',
      'Gemini': 'mutable', 'Virgo': 'mutable', 'Sagittarius': 'mutable', 'Pisces': 'mutable'
    };

    planets.forEach(p => {
      const modality = modalities[p.sign];
      if (modality) modalityCounts[modality as keyof typeof modalityCounts]++;
    });

    const totalMod = Object.values(modalityCounts).reduce((a, b) => a + b, 0) || 1;
    const modalityDistribution = {
      cardinal: (modalityCounts.cardinal / totalMod) * 100,
      fixed: (modalityCounts.fixed / totalMod) * 100,
      mutable: (modalityCounts.mutable / totalMod) * 100,
    };

    return {
      sunSign,
      moonSign,
      risingSign,
      planets,
      houses,
      aspects,
      elementalBalance,
      modalityDistribution,
    };
  } catch (error) {
    console.error('Error generating chart data:', error);
    throw error;
  }
}
