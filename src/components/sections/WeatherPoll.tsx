import {
  Cloud,
  CloudRain,
  CloudSun,
  Droplets,
  MapPin,
  Wind,
} from "lucide-react";
import { weatherPollAds } from "@/data/ads";
import { AdSlot } from "@/components/ui/AdSlot";
import { SectionHeader } from "@/components/ui/SectionHeader";
import styles from "./sections.module.css";

const forecast = [
  { day: "आज", Icon: CloudSun, high: "31°", low: "25°", rain: "40%" },
  { day: "सोम", Icon: CloudRain, high: "29°", low: "24°", rain: "70%" },
  { day: "मंगल", Icon: CloudRain, high: "28°", low: "24°", rain: "85%" },
  { day: "बुध", Icon: Cloud, high: "30°", low: "24°", rain: "25%" },
  { day: "गुरु", Icon: CloudSun, high: "32°", low: "25°", rain: "10%" },
];

const pollOptions = [
  { label: "कांजुरमार्ग से हवाईअड्डा रूट", percent: 45 },
  { label: "मुंबई से नवी मुंबई लिंक", percent: 34 },
  { label: "दहिसर से ठाणे कॉरिडोर", percent: 21 },
];

export function WeatherPoll() {
  return (
    <section className={styles.weatherPoll} aria-label="मौसम और आज का सवाल">
      <div className={styles.weatherColumn}>
        <SectionHeader title="मौसम" action="विस्तृत पूर्वानुमान →" />
        <div className={styles.weatherBody}>
          <article className={styles.weatherCurrent}>
            <div className={styles.weatherLocation}>
              <h3>
                <MapPin size={17} aria-hidden="true" /> मुंबई
              </h3>
              <span className={styles.weatherUpdated}>आज सुबह ८:००</span>
            </div>

            <div className={styles.weatherNow}>
              <CloudSun
                className={styles.weatherSky}
                size={44}
                strokeWidth={1.7}
                aria-hidden="true"
              />
              <strong className={styles.weatherTemperature}>29°</strong>
              <div className={styles.weatherCondition}>
                <strong>आंशिक बादल</strong>
                <span>
                  <b className={styles.forecastHigh}>↑ 31°</b> ·{" "}
                  <b className={styles.forecastLow}>↓ 25°</b>
                </span>
                <span>महसूस 33°</span>
              </div>
            </div>

            <div className={styles.weatherStats}>
              <div className={styles.weatherStat}>
                <Droplets size={16} aria-hidden="true" />
                <span>नमी</span>
                <strong>78%</strong>
              </div>
              <div className={styles.weatherStat}>
                <Wind size={16} aria-hidden="true" />
                <span>हवा</span>
                <strong>१४ किमी/घंटा · पश्चिम</strong>
              </div>
              <div className={styles.weatherStat}>
                <Droplets size={16} aria-hidden="true" />
                <span>बारिश की संभावना</span>
                <strong>40%</strong>
              </div>
            </div>

            <div
              className={styles.forecast}
              aria-label="पांच दिनों का मौसम पूर्वानुमान"
            >
              {forecast.map(({ day, Icon, high, low, rain }) => (
                <div className={styles.forecastRow} key={day}>
                  <strong>{day}</strong>
                  <Icon size={19} aria-hidden="true" />
                  <span className={styles.forecastHigh}>{high}</span>
                  <span className={styles.forecastLow}>{low}</span>
                  <span className={styles.forecastRain}>{rain}</span>
                </div>
              ))}
            </div>
          </article>

          <aside className={styles.weatherAside}>
            <article className={styles.weatherPeek}>
              <h3>आपका स्थानीय मौसम</h3>
              <div className={styles.weatherPeekLocation}>
                <MapPin size={16} aria-hidden="true" />
                <span>नागपुर</span>
              </div>
              <span className={styles.weatherUpdated}>आपके स्थान से</span>
              <div className={styles.weatherPeekCondition}>
                <strong className={styles.weatherPeekTemperature}>33°</strong>
                <div className={styles.weatherCondition}>
                  <strong>साफ़ मौसम</strong>
                  <span>↑35° · ↓26°</span>
                </div>
              </div>
            </article>
            <div className={styles.weatherAd}>
              <AdSlot ad={weatherPollAds[0]} />
            </div>
          </aside>
        </div>
      </div>

      <div className={styles.pollColumn}>
        <SectionHeader title="आज का सवाल" action="पुराने सर्वेक्षण" />
        <div className={styles.pollContent}>
          <div className={styles.pollQuestion}>
            <h3>
              मेट्रो और नए बुनियादी ढांचे के विस्तार से किस क्षेत्र को सबसे ज्यादा लाभ होगा?
            </h3>
            <p>नवीनतम जनमत सर्वेक्षण के अनुसार।</p>
            <div className={styles.pollMeta}>केवल एक विकल्प चुनें</div>
          </div>

          <div>
            <ol className={styles.pollResults} aria-label="सर्वेक्षण के परिणाम">
              {pollOptions.map((option, index) => (
                <li className={styles.pollOption} key={option.label}>
                  <div className={styles.pollOptionLabel}>
                    <span>{option.label}</span>
                    <span className={styles.pollPercent}>
                      {option.percent}%
                    </span>
                  </div>
                  <div className={styles.pollTrack} aria-hidden="true">
                    <span
                      className={styles.pollFill}
                      style={{ width: `${option.percent}%` }}
                    />
                  </div>
                  {index === 0 ? (
                    <span className="srOnly">सर्वाधिक वोट</span>
                  ) : null}
                </li>
              ))}
            </ol>
            <p className={styles.pollVotes}>कुल १२,४५० वोट दर्ज</p>
          </div>
        </div>
        <div className={styles.pollAd}>
          <AdSlot ad={weatherPollAds[1]} />
        </div>
      </div>
    </section>
  );
}
