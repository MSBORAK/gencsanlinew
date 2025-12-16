export const estimateTime = (base: number) => {
  const randomOffset = Math.floor(Math.random() * 3); // 0–2 dk
  return base + randomOffset;
};

// İki nokta arasındaki mesafeyi hesaplayan fonksiyon (Haversine formülü)
// Returns distance in km
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const toRad = (deg: number) => {
  return deg * (Math.PI / 180);
};

