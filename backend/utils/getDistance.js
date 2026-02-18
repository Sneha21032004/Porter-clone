import axios from 'axios';

export default async function getDistanceKm(pickup, drop) {
  console.log
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.error('❌ GOOGLE_MAPS_API_KEY is missing in .env');
    throw new Error('Missing Google Maps API key');
  }

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    pickup
  )}&destinations=${encodeURIComponent(drop)}&key=${apiKey}`;

  console.log('🌍 Distance Matrix API Request:', url);

  const response = await axios.get(url);
  const data = response.data;

  console.log('📨 Distance Matrix Response:', JSON.stringify(data, null, 2));

  if (
    data.status === 'OK' &&
    data.rows &&
    data.rows[0] &&
    data.rows[0].elements &&
    data.rows[0].elements[0].status === 'OK'
  ) {
    const distanceMeters = data.rows[0].elements[0].distance.value;
    return distanceMeters / 1000; // Convert to km
  }

  const errorStatus = data.rows?.[0]?.elements?.[0]?.status || 'Unknown';
  throw new Error(`Google API failed with status: ${errorStatus}`);
}
