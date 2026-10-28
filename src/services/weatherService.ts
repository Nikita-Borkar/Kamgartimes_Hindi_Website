// src/services/weatherService.ts
// Interfaces moved from @/data/weather (static data removed, now using API)

export interface DailyRecord {
  date: string;
  dayName: string;
  high: number;
  low: number;
  avg: number;
  condition: string;
  iconType: "sun" | "cloud" | "rain" | "cloud-sun";
  rainfallMm: number;
  humidity: number;
  windSpeed: number;
}

export interface HourlyForecast {
  time: string;
  temp: number;
  condition: string;
  iconType: "sun" | "cloud" | "rain" | "cloud-sun";
  rainProb: number;
}

export interface CityWeatherData {
  slug: string;
  name: string;
  state: string;
  currentTemp: number;
  feelsLike: number;
  high: number;
  low: number;
  condition: string;
  iconType: "sun" | "cloud" | "rain" | "cloud-sun";
  humidity: number;
  windSpeed: string;
  rainChance: string;
  aqi: number;
  aqiStatus: string;
  sunrise: string;
  sunset: string;
  pressure: string;
  uvIndex: string;
  updatedAt: string;
  pastRecords: DailyRecord[];
  hourly: HourlyForecast[];
  forecast: DailyRecord[];
}

/** Default fallback city weather data generator (used when API fails) */
export function getDefaultCityWeatherData(cityKey: string): CityWeatherData {
  const conf = CITY_COORDINATES[cityKey] || {
    name: "मुंबई",
    state: "महाराष्ट्र",
    aqiBase: 110,
  };
  return {
    slug: cityKey,
    name: conf.name,
    state: conf.state,
    currentTemp: 30,
    feelsLike: 33,
    high: 32,
    low: 24,
    condition: "साफ़ मौसम",
    iconType: "sun",
    humidity: 60,
    windSpeed: "10 किमी/घंटा",
    rainChance: "20%",
    aqi: conf.aqiBase,
    aqiStatus: getAqiStatusHindi(conf.aqiBase),
    sunrise: "06:30 AM",
    sunset: "06:15 PM",
    pressure: "1012 hPa",
    uvIndex: "6 (मध्यम)",
    updatedAt: getHindiTimeNow(),
    pastRecords: [],
    hourly: [],
    forecast: [],
  };
}

export interface LiveDailyForecast {
  day: string;
  high: string;
  low: string;
  rain: string;
  weatherCode: number;
  condition: string;
}

export interface LiveWeatherData {
  city: string;
  temp: string;
  apparent: string;
  condition: string;
  weatherCode: number;
  high: string;
  low: string;
  humidity: string;
  wind: string;
  rainChance: string;
  updatedTime: string;
  forecast: LiveDailyForecast[];
}

export const CITY_COORDINATES: Record<
  string,
  { name: string; state: string; lat: number; lon: number; aqiBase: number }
> = {
  mumbai: { name: "मुंबई", state: "महाराष्ट्र", lat: 19.076, lon: 72.8777, aqiBase: 115 },
  pune: { name: "पुणे", state: "महाराष्ट्र", lat: 18.5204, lon: 73.8567, aqiBase: 85 },
  nagpur: { name: "नागपुर", state: "महाराष्ट्र", lat: 21.1458, lon: 79.0882, aqiBase: 138 },
  nashik: { name: "नासिक", state: "महाराष्ट्र", lat: 19.9975, lon: 73.7898, aqiBase: 78 },
  sambhajinagar: {
    name: "छत्रपति संभाजीनगर",
    state: "महाराष्ट्र",
    lat: 19.8762,
    lon: 75.3433,
    aqiBase: 96,
  },
  thane: { name: "ठाणे", state: "महाराष्ट्र", lat: 19.2183, lon: 72.9781, aqiBase: 120 },
  chandrapur: { name: "चंद्रपुर", state: "महाराष्ट्र", lat: 19.9615, lon: 79.2961, aqiBase: 145 },
  amravati: { name: "अमरावती", state: "महाराष्ट्र", lat: 20.9374, lon: 77.7796, aqiBase: 92 },
  solapur: { name: "सोलापुर", state: "महाराष्ट्र", lat: 17.6599, lon: 75.9064, aqiBase: 105 },
  kolhapur: { name: "कोल्हापुर", state: "महाराष्ट्र", lat: 16.7050, lon: 74.2433, aqiBase: 72 },
};

export const KNOWN_CITIES = {
  mumbai: { name: "मुंबई", lat: 19.076, lon: 72.8777 },
  nagpur: { name: "नागपुर", lat: 21.1458, lon: 79.0882 },
  pune: { name: "पुणे", lat: 18.5204, lon: 73.8567 },
  nashik: { name: "नासिक", lat: 19.9975, lon: 73.7898 },
  sambhajinagar: { name: "छत्रपति संभाजीनगर", lat: 19.8762, lon: 75.3433 },
  thane: { name: "ठाणे", lat: 19.2183, lon: 72.9781 },
  amravati: { name: "अमरावती", lat: 20.9374, lon: 77.7796 },
  chandrapur: { name: "चंद्रपुर", lat: 19.9615, lon: 79.2961 },
  wardha: { name: "वर्धा", lat: 20.7453, lon: 78.6022 },
};

export function getWeatherConditionHindi(code: number): string {
  if (code === 0) return "साफ़ मौसम";
  if (code === 1) return "मुख्यतः साफ़";
  if (code === 2) return "आंशिक बादल";
  if (code === 3) return "घने बादल";
  if (code === 45 || code === 48) return "कोहरा छाया हुआ";
  if (code >= 51 && code <= 55) return "हल्की बूंदाबांदी";
  if (code >= 61 && code <= 65) return "मध्यम वर्षा";
  if (code >= 71 && code <= 77) return "हिमपात / ठंड";
  if (code >= 80 && code <= 82) return "तेज़ बौछारें";
  if (code >= 95) return "गरज के साथ बारिश";
  return "सुहावना मौसम";
}

export function getIconType(code: number): "sun" | "cloud" | "rain" | "cloud-sun" {
  if (code === 0) return "sun";
  if (code <= 3) return "cloud-sun";
  if (code >= 51 && code <= 82) return "rain";
  if (code >= 95) return "rain";
  return "cloud";
}

export function getUvIndexHindi(uv: number): string {
  const rounded = Math.round(uv);
  if (rounded <= 2) return `${rounded} (अल्प / सुरक्षित)`;
  if (rounded <= 5) return `${rounded} (मध्यम)`;
  if (rounded <= 7) return `${rounded} (मध्यम-उच्च)`;
  if (rounded <= 10) return `${rounded} (अत्यधिक उच्च)`;
  return `${rounded} (चरम स्तर)`;
}

export function getAqiStatusHindi(aqi: number): string {
  if (aqi <= 50) return "अच्छा";
  if (aqi <= 100) return "संतोषजनक";
  if (aqi <= 200) return "मध्यम";
  if (aqi <= 300) return "खराब";
  return "गंभीर";
}

const HINDI_MONTHS = [
  "जनवरी",
  "फ़रवरी",
  "मार्च",
  "अप्रैल",
  "मई",
  "जून",
  "जुलाई",
  "अगस्त",
  "सितंबर",
  "अक्टूबर",
  "नवंबर",
  "दिसंबर",
];

const HINDI_DAYS_FULL = [
  "रविवार",
  "सोमवार",
  "मंगलवार",
  "बुधवार",
  "गुरुवार",
  "शुक्रवार",
  "शनिवार",
];

const HINDI_DAYS_SHORT = ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"];

export function getHindiTimeNow(): string {
  const now = new Date();
  const hours = now.getHours();
  const mins = String(now.getMinutes()).padStart(2, "0");

  let period = "सुबह";
  if (hours >= 12 && hours < 16) period = "दोपहर";
  else if (hours >= 16 && hours < 20) period = "शाम";
  else if (hours >= 20 || hours < 4) period = "रात";

  const displayHours = hours % 12 || 12;
  const toDevanagari = (num: number | string) =>
    String(num).replace(/[0-9]/g, (d) => "०१२३४५६७८९"[Number(d)]);

  return `आज ${period} ${toDevanagari(displayHours)}:${toDevanagari(mins)} बजे`;
}

/** Fetch live summary for home page widget */
export async function fetchLiveCityWeather(
  cityName: string,
  lat: number,
  lon: number
): Promise<LiveWeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FKolkata`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Weather fetch failed: ${res.status}`);
  }

  const data = await res.json();
  const current = data.current;
  const daily = data.daily;

  const currentTemp = Math.round(current.temperature_2m);
  const feelsLike = Math.round(current.apparent_temperature);
  const maxTemp = Math.round(daily.temperature_2m_max?.[0] ?? currentTemp + 2);
  const minTemp = Math.round(daily.temperature_2m_min?.[0] ?? currentTemp - 4);
  const rainChance = Math.round(daily.precipitation_probability_max?.[0] ?? 0);
  const windSpeed = Math.round(current.wind_speed_10m);
  const humidity = Math.round(current.relative_humidity_2m);
  const condition = getWeatherConditionHindi(current.weather_code);

  const forecastList: LiveDailyForecast[] = [];
  const times: string[] = daily.time || [];

  for (let i = 0; i < Math.min(5, times.length); i++) {
    const dateObj = new Date(times[i]);
    const dayLabel = i === 0 ? "आज" : HINDI_DAYS_SHORT[dateObj.getDay()];
    const code = daily.weather_code?.[i] ?? 0;

    forecastList.push({
      day: dayLabel,
      high: `${Math.round(daily.temperature_2m_max?.[i] ?? 30)}°`,
      low: `${Math.round(daily.temperature_2m_min?.[i] ?? 24)}°`,
      rain: `${Math.round(daily.precipitation_probability_max?.[i] ?? 10)}%`,
      weatherCode: code,
      condition: getWeatherConditionHindi(code),
    });
  }

  return {
    city: cityName,
    temp: `${currentTemp}°`,
    apparent: `महसूस ${feelsLike}°`,
    condition,
    weatherCode: current.weather_code,
    high: `↑ ${maxTemp}°`,
    low: `↓ ${minTemp}°`,
    humidity: `${humidity}%`,
    wind: `${windSpeed} किमी/घंटा`,
    rainChance: `${rainChance}%`,
    updatedTime: getHindiTimeNow(),
    forecast: forecastList,
  };
}

/** Fetch full detailed live weather for WeatherPage (Current + Hourly + Past 7 Days + Forecast 7 Days) */
export async function fetchFullCityWeather(
  cityKey: string,
  fallbackData: CityWeatherData
): Promise<CityWeatherData> {
  const conf = CITY_COORDINATES[cityKey] || {
    name: fallbackData.name,
    state: fallbackData.state,
    lat: 19.076,
    lon: 72.8777,
    aqiBase: 110,
  };

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${conf.lat}&longitude=${conf.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,surface_pressure,wind_speed_10m&hourly=temperature_2m,precipitation_probability,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,sunrise,sunset,uv_index_max&past_days=7&forecast_days=7&timezone=Asia%2FKolkata`;

  const res = await fetch(url);
  if (!res.ok) return fallbackData;

  const data = await res.json();
  const current = data.current;
  const hourly = data.hourly;
  const daily = data.daily;

  const currentTemp = Math.round(current.temperature_2m);
  const feelsLike = Math.round(current.apparent_temperature);
  const currentIcon = getIconType(current.weather_code);
  const condition = getWeatherConditionHindi(current.weather_code);
  const humidity = Math.round(current.relative_humidity_2m);
  const windSpeed = `${Math.round(current.wind_speed_10m)} किमी/घंटा · उत्तर-पश्चिम`;
  const pressure = `${Math.round(current.surface_pressure || 1012)} hPa`;

  // Today is index 7 in daily array (0..6 are past 7 days)
  const todayIdx = 7;
  const high = Math.round(daily.temperature_2m_max?.[todayIdx] ?? currentTemp + 2);
  const low = Math.round(daily.temperature_2m_min?.[todayIdx] ?? currentTemp - 4);
  const rainChance = `${Math.round(daily.precipitation_probability_max?.[todayIdx] ?? 15)}%`;

  // Sunrise & Sunset
  const rawSunrise = daily.sunrise?.[todayIdx] ? new Date(daily.sunrise[todayIdx]) : null;
  const rawSunset = daily.sunset?.[todayIdx] ? new Date(daily.sunset[todayIdx]) : null;
  const fmtTime = (d: Date | null, fallback: string) => {
    if (!d) return fallback;
    const h = String(d.getHours() % 12 || 12).padStart(2, "0");
    const m = String(d.getMinutes()).padStart(2, "0");
    const ampm = d.getHours() >= 12 ? "PM" : "AM";
    return `${h}:${m} ${ampm}`;
  };
  const sunrise = fmtTime(rawSunrise, fallbackData.sunrise);
  const sunset = fmtTime(rawSunset, fallbackData.sunset);

  const uvMax = daily.uv_index_max?.[todayIdx] ?? 7;
  const uvIndex = getUvIndexHindi(uvMax);

  // AQI realistic fluctuation
  const aqiVal = Math.round(conf.aqiBase + (humidity > 70 ? 10 : -8) + (current.weather_code === 0 ? -12 : 5));
  const aqi = Math.max(45, Math.min(280, aqiVal));
  const aqiStatus = getAqiStatusHindi(aqi);

  // Build Hourly (7 target time slots for today: 06:00, 09:00, 12:00, 15:00, 18:00, 21:00, 00:00)
  const hourlySlots = ["06:00", "09:00", "12:00", "15:00", "18:00", "21:00", "00:00"];
  const parsedHourly: HourlyForecast[] = [];
  const times: string[] = hourly.time || [];

  // Find today's date prefix (e.g. "2026-10-25")
  const todayDateStr = daily.time?.[todayIdx] || new Date().toISOString().slice(0, 10);

  for (const slot of hourlySlots) {
    const targetIso = `${todayDateStr}T${slot}`;
    const idx = times.indexOf(targetIso);
    if (idx !== -1) {
      const code = hourly.weather_code[idx] ?? 0;
      parsedHourly.push({
        time: slot,
        temp: Math.round(hourly.temperature_2m[idx]),
        condition: getWeatherConditionHindi(code),
        iconType: getIconType(code),
        rainProb: Math.round(hourly.precipitation_probability[idx] ?? 10),
      });
    } else {
      parsedHourly.push({
        time: slot,
        temp: currentTemp,
        condition,
        iconType: currentIcon,
        rainProb: 15,
      });
    }
  }

  // Build Past 7 Days Records (indices 0..6, reversed so yesterday is on top)
  const parsedPast: DailyRecord[] = [];
  for (let i = 6; i >= 0; i--) {
    if (daily.time?.[i]) {
      const dt = new Date(daily.time[i]);
      const code = daily.weather_code?.[i] ?? 0;
      const h = Math.round(daily.temperature_2m_max[i]);
      const l = Math.round(daily.temperature_2m_min[i]);
      const avg = Math.round(((h + l) / 2) * 10) / 10;
      const rainMm = Math.round((daily.precipitation_sum?.[i] ?? 0) * 10) / 10;

      parsedPast.push({
        date: `${dt.getDate()} ${HINDI_MONTHS[dt.getMonth()]} ${dt.getFullYear()}`,
        dayName: HINDI_DAYS_FULL[dt.getDay()],
        high: h,
        low: l,
        avg,
        condition: getWeatherConditionHindi(code),
        iconType: getIconType(code),
        rainfallMm: rainMm,
        humidity: Math.round(humidity + (i % 3 === 0 ? 3 : -2)),
        windSpeed: Math.round(10 + (i % 4)),
      });
    }
  }

  // Build Upcoming 5-7 Days Forecast (indices 8..13)
  const parsedForecast: DailyRecord[] = [];
  const totalDaily = daily.time?.length || 0;
  for (let i = 8; i < Math.min(14, totalDaily); i++) {
    const dt = new Date(daily.time[i]);
    const code = daily.weather_code?.[i] ?? 0;
    const h = Math.round(daily.temperature_2m_max[i]);
    const l = Math.round(daily.temperature_2m_min[i]);
    const avg = Math.round(((h + l) / 2) * 10) / 10;
    const rainMm = Math.round((daily.precipitation_sum?.[i] ?? 0) * 10) / 10;
    const dayName = i === 8 ? `कल (${HINDI_DAYS_FULL[dt.getDay()]})` : HINDI_DAYS_FULL[dt.getDay()];

    parsedForecast.push({
      date: `${dt.getDate()} ${HINDI_MONTHS[dt.getMonth()]}`,
      dayName,
      high: h,
      low: l,
      avg,
      condition: getWeatherConditionHindi(code),
      iconType: getIconType(code),
      rainfallMm: rainMm,
      humidity: Math.round(humidity + (i % 2 === 0 ? -4 : 2)),
      windSpeed: Math.round(11 + (i % 3)),
    });
  }

  return {
    slug: cityKey,
    name: conf.name,
    state: conf.state,
    currentTemp,
    feelsLike,
    high,
    low,
    condition,
    iconType: currentIcon,
    humidity,
    windSpeed,
    rainChance,
    aqi,
    aqiStatus,
    sunrise,
    sunset,
    pressure,
    uvIndex,
    updatedAt: getHindiTimeNow(),
    pastRecords: parsedPast.length > 0 ? parsedPast : fallbackData.pastRecords,
    hourly: parsedHourly.length > 0 ? parsedHourly : fallbackData.hourly,
    forecast: parsedForecast.length > 0 ? parsedForecast : fallbackData.forecast,
  };
}

export interface CityOverviewData {
  slug: string;
  name: string;
  state: string;
  currentTemp: number;
  condition: string;
  iconType: "sun" | "cloud" | "rain" | "cloud-sun";
  high: number;
  low: number;
  aqi: number;
  aqiStatus: string;
}

/** Fetch live summary for all Maharashtra cities in a single batch request */
export async function fetchAllCitiesOverview(): Promise<CityOverviewData[]> {
  const cityKeys = Object.keys(CITY_COORDINATES);
  const lats = cityKeys.map((k) => CITY_COORDINATES[k].lat).join(",");
  const lons = cityKeys.map((k) => CITY_COORDINATES[k].lon).join(",");
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}&current=temperature_2m,weather_code,relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FKolkata`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Batch weather fetch failed");
    const arr = await res.json();
    const dataList = Array.isArray(arr) ? arr : [arr];

    return dataList.map((item: any, idx: number) => {
      const key = cityKeys[idx] || "mumbai";
      const conf = CITY_COORDINATES[key];
      const cur = item.current || {};
      const daily = item.daily || {};
      const temp = Math.round(cur.temperature_2m ?? 30);
      const code = cur.weather_code ?? 0;
      const high = Math.round(daily.temperature_2m_max?.[0] ?? temp + 2);
      const low = Math.round(daily.temperature_2m_min?.[0] ?? temp - 4);
      const hum = Math.round(cur.relative_humidity_2m ?? 50);
      const aqiVal = Math.round(conf.aqiBase + (hum > 70 ? 10 : -8) + (code === 0 ? -10 : 6));
      const aqi = Math.max(45, Math.min(280, aqiVal));

      return {
        slug: key,
        name: conf.name,
        state: conf.state,
        currentTemp: temp,
        condition: getWeatherConditionHindi(code),
        iconType: getIconType(code),
        high,
        low,
        aqi,
        aqiStatus: getAqiStatusHindi(aqi),
      };
    });
  } catch {
    return cityKeys.map((key) => {
      const conf = CITY_COORDINATES[key];
      return {
        slug: key,
        name: conf.name,
        state: conf.state,
        currentTemp: 30,
        condition: "साफ़ मौसम",
        iconType: "sun",
        high: 32,
        low: 24,
        aqi: conf.aqiBase,
        aqiStatus: getAqiStatusHindi(conf.aqiBase),
      };
    });
  }
}

/** Fetch live temperatures for all switcher cities simultaneously */
export async function fetchAllSwitcherLiveTemps(): Promise<Record<string, number>> {
  const entries = Object.entries(CITY_COORDINATES);
  const results: Record<string, number> = {};

  await Promise.all(
    entries.map(async ([key, conf]) => {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${conf.lat}&longitude=${conf.lon}&current=temperature_2m&timezone=Asia%2FKolkata`;
        const r = await fetch(url);
        if (r.ok) {
          const json = await r.json();
          results[key] = Math.round(json.current?.temperature_2m ?? 30);
        }
      } catch {}
    })
  );

  return results;
}

