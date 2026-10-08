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
  { day: "मंगळ", Icon: CloudRain, high: "28°", low: "24°", rain: "85%" },
  { day: "बुध", Icon: Cloud, high: "30°", low: "24°", rain: "25%" },
  { day: "गुरु", Icon: CloudSun, high: "32°", low: "25°", rain: "10%" },
];

const pollOptions = [
  { label: "कांजूरमार्ग ते विमानतळ", percent: 45 },
  { label: "मुंबई ते नवी मुंबई", percent: 34 },
  { label: "दहिसर ते ठाणे", percent: 21 },
];

export function WeatherPoll() {
  return (
    <section className={styles.weatherPoll} aria-label="हवामान आणि आजचा प्रश्न">
      <div className={styles.weatherColumn}>
        <SectionHeader title="हवामान" action="पुढील अंदाज →" />
        <div className={styles.weatherBody}>
          <article className={styles.weatherCurrent}>
            <div className={styles.weatherLocation}>
              <h3>
                <MapPin size={17} aria-hidden="true" /> मुंबई
              </h3>
              <span className={styles.weatherUpdated}>आज सकाळी ८:००</span>
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
                <strong>भाग बदललेले</strong>
                <span>
                  <b className={styles.forecastHigh}>↑ 31°</b> ·{" "}
                  <b className={styles.forecastLow}>↓ 25°</b>
                </span>
                <span>जाणवणारे 33°</span>
              </div>
            </div>

            <div className={styles.weatherStats}>
              <div className={styles.weatherStat}>
                <Droplets size={16} aria-hidden="true" />
                <span>आर्द्रता</span>
                <strong>78%</strong>
              </div>
              <div className={styles.weatherStat}>
                <Wind size={16} aria-hidden="true" />
                <span>वारा</span>
                <strong>१४ किमी/तास · पश्चिम</strong>
              </div>
              <div className={styles.weatherStat}>
                <Droplets size={16} aria-hidden="true" />
                <span>पावसाची शक्यता</span>
                <strong>40%</strong>
              </div>
            </div>

            <div
              className={styles.forecast}
              aria-label="पाच दिवसांचा हवामान अंदाज"
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
              <h3>तुमचे हवामान</h3>
              <div className={styles.weatherPeekLocation}>
                <MapPin size={16} aria-hidden="true" />
                <span>नागपूर</span>
              </div>
              <span className={styles.weatherUpdated}>तुमच्या स्थानावरून</span>
              <div className={styles.weatherPeekCondition}>
                <strong className={styles.weatherPeekTemperature}>33°</strong>
                <div className={styles.weatherCondition}>
                  <strong>स्वच्छ</strong>
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
        <SectionHeader title="आजचा प्रश्न" action="मागील सर्वेक्षण" />
        <div className={styles.pollContent}>
          <div className={styles.pollQuestion}>
            <h3>
              मुंबई मेट्रोच्या विस्तारामुळे कोणत्या भागाला सर्वाधिक फायदा होईल?
            </h3>
            <p>पुढील टप्प्यातील निविदांनुसार.</p>
            <div className={styles.pollMeta}>एकच पर्याय निवडा</div>
          </div>

          <div>
            <ol className={styles.pollResults} aria-label="सर्वेक्षणाचे निकाल">
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
                  {index === 0 ?
                    <span className="srOnly">सर्वाधिक मते</span>
                  : null}
                </li>
              ))}
            </ol>
            <p className={styles.pollVotes}>एकूण १२,४५० मते</p>
          </div>
        </div>
        <div className={styles.pollAd}>
          <AdSlot ad={weatherPollAds[1]} />
        </div>
      </div>
    </section>
  );
}
