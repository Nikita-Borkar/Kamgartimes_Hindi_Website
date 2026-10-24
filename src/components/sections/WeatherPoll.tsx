"use client";

import { useState } from "react";
import {
  Cloud,
  CloudRain,
  CloudSun,
  Droplets,
  MapPin,
  Wind,
  CheckCircle,
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

const initialPollOptions = [
  { id: "opt-1", label: "कांजुरमार्ग से हवाईअड्डा रूट", votes: 5602, percent: 45 },
  { id: "opt-2", label: "मुंबई से नवी मुंबई लिंक", votes: 4233, percent: 34 },
  { id: "opt-3", label: "दहिसर से ठाणे कॉरिडोर", votes: 2615, percent: 21 },
];

export function WeatherPoll() {
  const [options, setOptions] = useState(initialPollOptions);
  const [selectedOptId, setSelectedOptId] = useState<string>("");
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [totalVotes, setTotalVotes] = useState<number>(12450);

  const handleVote = () => {
    if (!selectedOptId || hasVoted) return;

    const newTotal = totalVotes + 1;
    const updated = options.map((opt) => {
      const v = opt.id === selectedOptId ? opt.votes + 1 : opt.votes;
      return {
        ...opt,
        votes: v,
        percent: Math.round((v / newTotal) * 100),
      };
    });

    setOptions(updated);
    setTotalVotes(newTotal);
    setHasVoted(true);
  };

  return (
    <section className={styles.weatherPoll} aria-label="मौसम और आज का सवाल">
      <div className={styles.weatherColumn}>
        <SectionHeader title="मौसम" action="विस्तृत पूर्वानुमान" href="/weather" />
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
        <SectionHeader title="आज का सवाल" action="पुराने सर्वेक्षण" href="/polls" />
        <div className={styles.pollContent}>
          <div className={styles.pollQuestion}>
            <h3>
              मेट्रो और नए बुनियादी ढांचे के विस्तार से किस क्षेत्र को सबसे ज्यादा लाभ होगा?
            </h3>
            <p>नवीनतम जनमत सर्वेक्षण के अनुसार।</p>
            <div className={styles.pollMeta}>
              {hasVoted ? "आपका मत दर्ज हो चुका है" : "अपना विकल्प चुनें और वोट दें"}
            </div>
          </div>

          <div>
            {!hasVoted ? (
              <div>
                <ol className={styles.pollResults} aria-label="सर्वेक्षण के विकल्प">
                  {options.map((option) => (
                    <li className={styles.pollOption} key={option.id}>
                      <label className={styles.pollRadioLabel}>
                        <input
                          type="radio"
                          name="homePollRadio"
                          value={option.id}
                          checked={selectedOptId === option.id}
                          onChange={() => setSelectedOptId(option.id)}
                          className={styles.pollRadioInput}
                        />
                        <span>{option.label}</span>
                      </label>
                    </li>
                  ))}
                </ol>
                <button
                  type="button"
                  onClick={handleVote}
                  disabled={!selectedOptId}
                  className={styles.pollVoteBtn}
                >
                  वोट दें
                </button>
              </div>
            ) : (
              <ol className={styles.pollResults} aria-label="सर्वेक्षण के परिणाम">
                {options.map((option, index) => (
                  <li className={styles.pollOption} key={option.id}>
                    <div className={styles.pollOptionLabel}>
                      <span>
                        {option.label}{" "}
                        {selectedOptId === option.id && (
                          <span style={{ color: "var(--brand)", fontSize: "12px", fontWeight: "bold" }}>
                            (आपका वोट)
                          </span>
                        )}
                      </span>
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
            )}

            <p className={styles.pollVotes}>
              कुल {totalVotes.toLocaleString("hi-IN")} वोट दर्ज
              {hasVoted && (
                <span style={{ color: "#10b981", marginLeft: "10px", fontWeight: "bold" }}>
                  <CheckCircle size={14} style={{ display: "inline", verticalAlign: "middle" }} /> धन्यवाद!
                </span>
              )}
            </p>
          </div>
        </div>
        <div className={styles.pollAd}>
          <AdSlot ad={weatherPollAds[1]} />
        </div>
      </div>
    </section>
  );
}
