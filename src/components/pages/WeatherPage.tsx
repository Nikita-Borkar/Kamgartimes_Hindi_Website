"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Cloud,
  CloudRain,
  CloudSun,
  Sun,
  Droplets,
  Wind,
  MapPin,
  Calendar,
  History,
  TrendingUp,
  Compass,
  Gauge,
  Eye,
  Clock,
} from "lucide-react";
import { maharashtraWeatherData, CityWeatherData } from "@/data/weather";
import {
  fetchFullCityWeather,
  fetchAllCitiesOverview,
  CityOverviewData,
  CITY_COORDINATES,
} from "@/services/weatherService";
import styles from "./weather.module.css";

function WeatherIcon({
  type,
  size = 24,
}: {
  type: "sun" | "cloud" | "rain" | "cloud-sun";
  size?: number;
}) {
  switch (type) {
    case "sun":
      return <Sun size={size} color="#eab308" />;
    case "cloud-sun":
      return <CloudSun size={size} color="#f59e0b" />;
    case "cloud":
      return <Cloud size={size} color="#64748b" />;
    case "rain":
      return <CloudRain size={size} color="#3b82f6" />;
    default:
      return <CloudSun size={size} color="#f59e0b" />;
  }
}

const INITIAL_OVERVIEW: CityOverviewData[] = Object.entries(CITY_COORDINATES).map(
  ([slug, conf]) => ({
    slug,
    name: conf.name,
    state: conf.state,
    currentTemp: maharashtraWeatherData[slug]?.currentTemp ?? 30,
    condition: maharashtraWeatherData[slug]?.condition ?? "साफ़ मौसम",
    iconType: maharashtraWeatherData[slug]?.iconType ?? "cloud-sun",
    high: maharashtraWeatherData[slug]?.high ?? 32,
    low: maharashtraWeatherData[slug]?.low ?? 24,
    aqi: conf.aqiBase,
    aqiStatus: "मध्यम",
  })
);

export function WeatherPage() {
  const [selectedCityKey, setSelectedCityKey] = useState<string>("mumbai");
  const defaultCityData: CityWeatherData =
    maharashtraWeatherData[selectedCityKey] || maharashtraWeatherData.mumbai;
  const [cityData, setCityData] = useState<CityWeatherData>(defaultCityData);
  const [overviewCities, setOverviewCities] =
    useState<CityOverviewData[]>(INITIAL_OVERVIEW);
  const [loading, setLoading] = useState<boolean>(true);

  // 1. Fetch live overview and temperatures for all cities
  useEffect(() => {
    fetchAllCitiesOverview()
      .then((cities) => {
        if (cities && cities.length > 0) {
          setOverviewCities(cities);
        }
      })
      .catch(() => {});
  }, []);

  // 2. Fetch full detailed weather for selected city
  useEffect(() => {
    setLoading(true);
    const fallback =
      maharashtraWeatherData[selectedCityKey] || maharashtraWeatherData.mumbai;
    fetchFullCityWeather(selectedCityKey, fallback)
      .then((fullData) => {
        setCityData(fullData);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [selectedCityKey]);

  return (
    <main className={styles.main}>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className={styles.crumbs}>
        <Link href="/" className={styles.crumbLink}>
          होम
        </Link>
        <span className={styles.crumbSep} aria-hidden="true">
          /
        </span>
        <span className={styles.crumbCurrent} aria-current="page">
          मौसम विस्तृत रिपोर्ट व तापमान अभिलेख
        </span>
      </nav>

      {/* Header Banner */}
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <span className={styles.titleBar} aria-hidden="true" />
          <h1 className={styles.title}>
            महाराष्ट्र मौसम पूर्वानुमान व तापमान रिकॉर्ड
          </h1>
        </div>
        <p className={styles.lede}>
          राज्य के प्रमुख शहरों का लाइव मौसम अपडेट, 24 घंटे का पूर्वानुमान और बीते दिनों
          का दर्ज तापमान रिकॉर्ड (अधिकतम, न्यूनतम, औसत तापमान व वर्षा रिपोर्ट)।
        </p>

        {/* City Switcher Tabs */}
        <div className={styles.cityTabs} role="tablist" aria-label="शहर चुनें">
          {overviewCities.map((c) => {
            return (
              <button
                key={c.slug}
                role="tab"
                aria-selected={selectedCityKey === c.slug}
                type="button"
                onClick={() => setSelectedCityKey(c.slug)}
                className={`${styles.cityBtn} ${
                  selectedCityKey === c.slug ? styles.cityBtnActive : ""
                }`}
              >
                <MapPin size={15} />
                <span>{c.name}</span>
                <span className={styles.cityBtnTemp}>{c.currentTemp}°C</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Hero Live Weather Grid */}
      <div className={styles.heroGrid}>
        {/* Current Live Card */}
        <article className={styles.currentCard}>
          <div className={styles.currentTop}>
            <div className={styles.cityNameArea}>
              <h2>
                <MapPin size={24} style={{ color: "var(--brand)" }} />
                {cityData.name}, {cityData.state}
              </h2>
              <p>अपडेट: {cityData.updatedAt} • लाइव उपग्रह डेटा</p>
            </div>
            <div className={styles.aqiBadge}>
              <span className={styles.aqiTag}>AQI {cityData.aqi}</span>
              <span style={{ fontSize: "12px", color: "var(--muted)" }}>
                वायु गुणवत्ता: {cityData.aqiStatus}
              </span>
            </div>
          </div>

          <div className={styles.tempRow}>
            <WeatherIcon type={cityData.iconType} size={70} />
            <div className={styles.mainTemp}>{cityData.currentTemp}°C</div>
            <div className={styles.tempMeta}>
              <span className={styles.conditionText}>{cityData.condition}</span>
              <span className={styles.highLowText}>
                अधिकतम: <strong className={styles.highVal}>↑ {cityData.high}°C</strong> ·
                न्यूनतम: <strong className={styles.lowVal}>↓ {cityData.low}°C</strong>
              </span>
              <span className={styles.feelsText}>
                महसूस हो रहा तापमान: {cityData.feelsLike}°C
              </span>
            </div>
          </div>

          {/* Metric Badges */}
          <div className={styles.metricsGrid}>
            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>
                <Droplets size={14} /> नमी (आर्द्रता)
              </span>
              <span className={styles.metricVal}>{cityData.humidity}%</span>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>
                <Wind size={14} /> हवा की गति
              </span>
              <span className={styles.metricVal}>{cityData.windSpeed}</span>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>
                <CloudRain size={14} /> बारिश की संभावना
              </span>
              <span className={styles.metricVal}>{cityData.rainChance}</span>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>
                <Gauge size={14} /> वायुदाब
              </span>
              <span className={styles.metricVal}>{cityData.pressure}</span>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>
                <Sun size={14} /> सूर्योदय / सूर्यास्त
              </span>
              <span className={styles.metricVal}>
                {cityData.sunrise} / {cityData.sunset}
              </span>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>
                <Compass size={14} /> यूवी इंडेक्स
              </span>
              <span className={styles.metricVal}>{cityData.uvIndex}</span>
            </div>
          </div>
        </article>

        {/* 24-Hour Forecast Timeline */}
        <aside className={styles.hourlyCard}>
          <h3>
            <Clock size={18} style={{ color: "var(--brand)" }} />
            आज 24 घंटे का तापमान (Hourly)
          </h3>
          <ul className={styles.hourlyList}>
            {cityData.hourly.map((h) => (
              <li key={h.time} className={styles.hourlyRow}>
                <span className={styles.hourlyTime}>{h.time}</span>
                <WeatherIcon type={h.iconType} size={20} />
                <span style={{ color: "var(--muted)" }}>{h.condition}</span>
                <span className={styles.hourlyTemp}>{h.temp}°C</span>
                <span style={{ fontSize: "12px", color: "var(--brand)" }}>
                  {h.rainProb > 0 ? `🌧️ ${h.rainProb}%` : "—"}
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {/* =========================================================================
          CORE REQUIREMENT: PAST TEMPERATURES (बीते दिनों का तापमान और मौसम रिकॉर्ड)
          Satisfies: "detail page mai purane sab temperature dikhne chiaye the"
          ========================================================================= */}
      <section className={styles.sectionBlock} aria-label="बीते दिनों का तापमान रिकॉर्ड">
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>
            <History size={24} style={{ color: "var(--brand)" }} />
            बीते 7 दिनों का तापमान और मौसम रिकॉर्ड ({cityData.name})
          </h2>
          <p className={styles.sectionSubtitle}>
            विगत दिनों में दर्ज किया गया अधिकतम व न्यूनतम तापमान, वर्षा और आर्द्रता का
            सटीक ऐतिहासिक विवरण।
          </p>
        </div>

        {/* Visual Cards for Past Days */}
        <div className={styles.pastGrid}>
          {cityData.pastRecords.map((record) => (
            <article key={record.date} className={styles.pastDayCard}>
              <div className={styles.pastDayHead}>
                <span className={styles.pastDayName}>{record.dayName}</span>
                <span className={styles.pastDate}>{record.date}</span>
              </div>

              <div className={styles.pastTempsRow}>
                <div className={styles.pastMax}>
                  <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                    अधिकतम तापमान
                  </span>
                  <strong>{record.high}°C</strong>
                </div>
                <WeatherIcon type={record.iconType} size={36} />
                <div className={styles.pastMin}>
                  <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                    न्यूनतम तापमान
                  </span>
                  <strong>{record.low}°C</strong>
                </div>
              </div>

              <div className={styles.pastDetailsList}>
                <div className={styles.pastDetailRow}>
                  <span>मौसम स्थिति:</span>
                  <strong style={{ color: "var(--text)" }}>{record.condition}</strong>
                </div>
                <div className={styles.pastDetailRow}>
                  <span>औसत तापमान:</span>
                  <strong style={{ color: "var(--text)" }}>{record.avg}°C</strong>
                </div>
                <div className={styles.pastDetailRow}>
                  <span>दर्ज वर्षा:</span>
                  <strong
                    style={{
                      color: record.rainfallMm > 0 ? "var(--brand)" : "var(--text)",
                    }}
                  >
                    {record.rainfallMm} mm
                  </strong>
                </div>
                <div className={styles.pastDetailRow}>
                  <span>औसत आर्द्रता:</span>
                  <strong style={{ color: "var(--text)" }}>{record.humidity}%</strong>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Detailed Table View for Past Temperatures */}
        <div className={styles.tableWrapper}>
          <table className={styles.historyTable} aria-label="बीते तापमान की तालिका">
            <thead>
              <tr>
                <th>दिनांक</th>
                <th>वार</th>
                <th>मौसम स्थिति</th>
                <th>अधिकतम तापमान (Max)</th>
                <th>न्यूनतम तापमान (Min)</th>
                <th>औसत तापमान</th>
                <th>दर्ज वर्षा</th>
                <th>आर्द्रता (नमी)</th>
              </tr>
            </thead>
            <tbody>
              {cityData.pastRecords.map((r) => (
                <tr key={r.date}>
                  <td>
                    <strong>{r.date}</strong>
                  </td>
                  <td>{r.dayName}</td>
                  <td>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <WeatherIcon type={r.iconType} size={18} />
                      {r.condition}
                    </span>
                  </td>
                  <td style={{ color: "var(--market-up, #10b981)", fontWeight: "bold" }}>
                    ↑ {r.high}°C
                  </td>
                  <td style={{ color: "var(--brand)", fontWeight: "bold" }}>
                    ↓ {r.low}°C
                  </td>
                  <td>{r.avg}°C</td>
                  <td>
                    {r.rainfallMm > 0 ? (
                      <span style={{ color: "#3b82f6", fontWeight: "bold" }}>
                        {r.rainfallMm} मिमी
                      </span>
                    ) : (
                      "0.0 मिमी"
                    )}
                  </td>
                  <td>{r.humidity}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Upcoming 7-Day Forecast */}
      <section
        className={styles.sectionBlock}
        aria-label="आगामी 7 दिनों का मौसम पूर्वानुमान"
      >
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>
            <Calendar size={24} style={{ color: "var(--brand)" }} />
            आगामी दिनों का विस्तृत मौसम पूर्वानुमान ({cityData.name})
          </h2>
          <p className={styles.sectionSubtitle}>
            मौसम विभाग (IMD) के अनुसार आगामी दिनों का संभावित तापमान और वर्षा की चेतावनी।
          </p>
        </div>

        <div className={styles.forecastGrid}>
          {cityData.forecast.map((f) => (
            <div key={f.date} className={styles.forecastCard}>
              <span className={styles.forecastDay}>{f.dayName}</span>
              <span className={styles.pastDate}>{f.date}</span>
              <WeatherIcon type={f.iconType} size={38} />
              <span className={styles.forecastCondition}>{f.condition}</span>
              <div className={styles.forecastTemps}>
                <span className={styles.highVal}>↑ {f.high}°</span>
                <span className={styles.lowVal}>↓ {f.low}°</span>
              </div>
              <span style={{ fontSize: "12px", color: "var(--muted)" }}>
                संभावित वर्षा: {f.rainfallMm} mm
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Maharashtra Multi-city Comparative Overview */}
      <section className={styles.stateOverviewCard} aria-label="महाराष्ट्र के प्रमुख शहरों का तापमान">
        <h3 style={{ margin: 0, font: "var(--fw-bold) var(--fs-h-s) / 1 var(--font-serif)" }}>
          महाराष्ट्र के अन्य प्रमुख शहरों का तापमान
        </h3>
        <div className={styles.tableWrapper}>
          <table className={styles.historyTable}>
            <thead>
              <tr>
                <th>शहर</th>
                <th>वर्तमान तापमान</th>
                <th>मौसम</th>
                <th>आज का उच्चतम / न्यूनतम</th>
                <th>AQI गुणवत्ता</th>
                <th>विस्तृत देखें</th>
              </tr>
            </thead>
            <tbody>
              {overviewCities.map((c) => (
                <tr key={c.slug}>
                  <td>
                    <strong>{c.name}</strong>
                  </td>
                  <td style={{ fontWeight: "bold", fontSize: "16px" }}>
                    {c.currentTemp}°C
                  </td>
                  <td>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <WeatherIcon type={c.iconType} size={18} />
                      {c.condition}
                    </span>
                  </td>
                  <td>
                    <span className={styles.highVal}>↑ {c.high}°</span> /{" "}
                    <span className={styles.lowVal}>↓ {c.low}°</span>
                  </td>
                  <td>
                    <span className={styles.aqiTag} style={{ fontSize: "11px" }}>
                      AQI {c.aqi} ({c.aqiStatus})
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCityKey(c.slug);
                        window.scrollTo({ top: 120, behavior: "smooth" });
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--brand)",
                        fontWeight: "bold",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      तापमान रिकॉर्ड देखें →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
