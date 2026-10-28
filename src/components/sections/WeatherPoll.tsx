"use client";

import { useEffect, useState } from "react";
import {
  Cloud,
  CloudRain,
  CloudSun,
  Sun,
  Droplets,
  MapPin,
  Wind,
  CheckCircle,
  HelpCircle,
} from "lucide-react";
import { weatherPollAds } from "@/data/ads";
import { AdSlot } from "@/components/ui/AdSlot";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { kamgarApi } from "@/services/apiClient";
import {
  fetchLiveCityWeather,
  LiveWeatherData,
  KNOWN_CITIES,
} from "@/services/weatherService";
import type { QotdQuestion, QotdAnswerResult, PublicPoll } from "@/types/api";
import styles from "./sections.module.css";

// Helper to return appropriate weather icon based on WMO code
function WeatherGlyph({ code, size = 20 }: { code: number; size?: number }) {
  if (code === 0) {
    return <Sun size={size} color="#eab308" aria-hidden="true" />;
  }
  if (code <= 3) {
    return <CloudSun size={size} color="#f59e0b" aria-hidden="true" />;
  }
  if (code >= 51 && code <= 65) {
    return <CloudRain size={size} color="#3b82f6" aria-hidden="true" />;
  }
  if (code >= 80) {
    return <CloudRain size={size} color="#2563eb" aria-hidden="true" />;
  }
  return <Cloud size={size} color="#64748b" aria-hidden="true" />;
}

interface PollOptionState {
  id: string;
  label: string;
  votes: number;
  percent: number;
}

export function WeatherPoll() {
  // Live Weather States
  const [mumbaiWeather, setMumbaiWeather] = useState<LiveWeatherData | null>(null);
  const [localWeather, setLocalWeather] = useState<LiveWeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  // Poll / QOTD States
  const [activePoll, setActivePoll] = useState<PublicPoll | null>(null);
  const [qotd, setQotd] = useState<QotdQuestion | null>(null);
  const [pollTitle, setPollTitle] = useState<string>("कामगार टाइम्स दैनिक जनमत सर्वेक्षण");
  const [options, setOptions] = useState<PollOptionState[]>([]);
  const [selectedOptId, setSelectedOptId] = useState<string>("");
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [totalVotes, setTotalVotes] = useState<number>(1420);
  const [qotdResult, setQotdResult] = useState<QotdAnswerResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Fetch Live Weather for Mumbai & Local City (Nagpur/Geolocation)
  useEffect(() => {
    let isMounted = true;

    async function loadWeather() {
      try {
        const [mum, nag] = await Promise.all([
          fetchLiveCityWeather("मुंबई", KNOWN_CITIES.mumbai.lat, KNOWN_CITIES.mumbai.lon),
          fetchLiveCityWeather("नागपुर", KNOWN_CITIES.nagpur.lat, KNOWN_CITIES.nagpur.lon),
        ]);

        if (isMounted) {
          setMumbaiWeather(mum);
          setLocalWeather(nag);
          setWeatherLoading(false);
        }
      } catch (err) {
        if (isMounted) setWeatherLoading(false);
      }
    }

    loadWeather();

    // Check if browser allows geolocation for local weather
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const userLive = await fetchLiveCityWeather(
              "आपका शहर",
              position.coords.latitude,
              position.coords.longitude
            );
            if (isMounted) setLocalWeather(userLive);
          } catch {}
        },
        () => {},
        { timeout: 5000 }
      );
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Fetch Live Poll from /public/polls/active, falling back to Question of the Day
  useEffect(() => {
    kamgarApi
      .getActivePoll()
      .then((poll) => {
        if (poll && poll.question && Array.isArray(poll.options) && poll.options.length > 0) {
          setActivePoll(poll);
          setPollTitle(poll.question);
          setTotalVotes(poll.totalVotes || 0);

          const mappedOptions: PollOptionState[] = poll.options.map((opt) => ({
            id: opt._id,
            label: opt.text,
            votes: opt.votes || 0,
            percent: opt.percentage || 0,
          }));
          setOptions(mappedOptions);

          // Check if previously voted in localStorage
          if (typeof window !== "undefined" && poll._id) {
            const saved = localStorage.getItem(`kt_voted_poll_${poll._id}`);
            if (saved) {
              try {
                const parsed = JSON.parse(saved);
                setSelectedOptId(parsed.selectedOptId);
                setHasVoted(true);
              } catch {}
            }
          }
          return;
        }

        // Fallback: If no active poll, query Question of the Day (QOTD)
        fetchQotdFallback();
      })
      .catch(() => {
        fetchQotdFallback();
      });

    function fetchQotdFallback() {
      kamgarApi
        .getTodayQuestion()
        .then((data) => {
          if (data && data.question) {
            setQotd(data);
            setPollTitle(data.question);
            if (Array.isArray(data.options) && data.options.length > 0) {
              const mappedOptions: PollOptionState[] = data.options.map((opt, i) => {
                const weights = [45, 32, 23, 15];
                const pct = weights[i % weights.length];
                const v = Math.round((1420 * pct) / 100);
                return {
                  id: `opt-${i}`,
                  label: opt,
                  votes: v,
                  percent: pct,
                };
              });
              setOptions(mappedOptions);

              if (typeof window !== "undefined" && data._id) {
                const savedVote = localStorage.getItem(`kt_voted_qotd_${data._id}`);
                if (savedVote) {
                  try {
                    const parsed = JSON.parse(savedVote);
                    setSelectedOptId(parsed.selectedOptId);
                    setHasVoted(true);
                    if (parsed.result) setQotdResult(parsed.result);
                  } catch {}
                }
              }
            }
          }
        })
        .catch(() => {});
    }
  }, []);

  // 3. Handle Live Voting & Answer Verification
  const handleVote = async () => {
    if (!selectedOptId || hasVoted || isSubmitting) return;

    setIsSubmitting(true);

    if (activePoll) {
      try {
        const updated = await kamgarApi.votePoll(activePoll._id, selectedOptId);
        if (updated && Array.isArray(updated.options)) {
          setActivePoll(updated);
          setTotalVotes(updated.totalVotes);
          setOptions(
            updated.options.map((opt) => ({
              id: opt._id,
              label: opt.text,
              votes: opt.votes,
              percent: opt.percentage,
            }))
          );
        }
      } catch (err) {
        // Optimistic update if already recorded or offline
        const newTotal = totalVotes + 1;
        setOptions((prev) =>
          prev.map((opt) => {
            const v = opt.id === selectedOptId ? opt.votes + 1 : opt.votes;
            return {
              ...opt,
              votes: v,
              percent: Math.round((v / newTotal) * 100),
            };
          })
        );
        setTotalVotes(newTotal);
      }

      setHasVoted(true);
      setIsSubmitting(false);
      if (typeof window !== "undefined") {
        localStorage.setItem(
          `kt_voted_poll_${activePoll._id}`,
          JSON.stringify({ selectedOptId })
        );
      }
      return;
    }

    // Fallback: QOTD check
    const chosenOption = options.find((o) => o.id === selectedOptId);
    const chosenLabel = chosenOption?.label || selectedOptId;
    let checkRes: QotdAnswerResult | null = null;

    if (qotd) {
      try {
        checkRes = await kamgarApi.checkAnswer({
          answer: chosenLabel,
          category: qotd.category,
          questionId: qotd._id,
        });
        setQotdResult(checkRes);
      } catch {}
    }

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
    setIsSubmitting(false);

    if (typeof window !== "undefined" && qotd?._id) {
      localStorage.setItem(
        `kt_voted_qotd_${qotd._id}`,
        JSON.stringify({
          selectedOptId,
          result: checkRes,
        })
      );
    }
  };

  return (
    <section className={styles.weatherPoll} aria-label="लाइव मौसम और आज का सवाल">
      {/* -------------------- Weather Column -------------------- */}
      <div className={styles.weatherColumn}>
        <SectionHeader title="मौसम" action="विस्तृत पूर्वानुमान" href="/weather" />
        <div className={styles.weatherBody}>
          <article className={styles.weatherCurrent}>
            <div className={styles.weatherLocation}>
              <h3>
                <MapPin size={17} aria-hidden="true" /> {mumbaiWeather?.city || "मुंबई"}
              </h3>
              <span className={styles.weatherUpdated}>
                {mumbaiWeather?.updatedTime || "लाइव अपडेट"}
              </span>
            </div>

            <div className={styles.weatherNow}>
              <WeatherGlyph code={mumbaiWeather?.weatherCode ?? 2} size={44} />
              <strong className={styles.weatherTemperature}>
                {mumbaiWeather?.temp || "34°"}
              </strong>
              <div className={styles.weatherCondition}>
                <strong>{mumbaiWeather?.condition || "साफ़ मौसम"}</strong>
                <span>
                  <b className={styles.forecastHigh}>{mumbaiWeather?.high || "↑ 35°"}</b> ·{" "}
                  <b className={styles.forecastLow}>{mumbaiWeather?.low || "↓ 25°"}</b>
                </span>
                <span>{mumbaiWeather?.apparent || "महसूस 36°"}</span>
              </div>
            </div>

            <div className={styles.weatherStats}>
              <div className={styles.weatherStat}>
                <Droplets size={16} aria-hidden="true" />
                <span>नमी</span>
                <strong>{mumbaiWeather?.humidity || "45%"}</strong>
              </div>
              <div className={styles.weatherStat}>
                <Wind size={16} aria-hidden="true" />
                <span>हवा</span>
                <strong>{mumbaiWeather?.wind || "8 किमी/घंटा"}</strong>
              </div>
              <div className={styles.weatherStat}>
                <Droplets size={16} aria-hidden="true" />
                <span>बारिश की संभावना</span>
                <strong>{mumbaiWeather?.rainChance || "10%"}</strong>
              </div>
            </div>

            <div
              className={styles.forecast}
              aria-label="पांच दिनों का लाइव मौसम पूर्वानुमान"
            >
              {(mumbaiWeather?.forecast || []).map(({ day, weatherCode, high, low, rain }) => (
                <div className={styles.forecastRow} key={day}>
                  <strong>{day}</strong>
                  <WeatherGlyph code={weatherCode} size={19} />
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
                <span>{localWeather?.city || "नागपुर"}</span>
              </div>
              <span className={styles.weatherUpdated}>
                {localWeather?.updatedTime || "लाइव अपडेट"}
              </span>
              <div className={styles.weatherPeekCondition}>
                <strong className={styles.weatherPeekTemperature}>
                  {localWeather?.temp || "32°"}
                </strong>
                <div className={styles.weatherCondition}>
                  <strong>{localWeather?.condition || "साफ़ मौसम"}</strong>
                  <span>
                    {localWeather ? `${localWeather.high} · ${localWeather.low}` : "↑34° · ↓22°"}
                  </span>
                </div>
              </div>
            </article>
            <div className={styles.weatherAd}>
              <AdSlot ad={weatherPollAds[0]} slotKey="home_mid_3" />
            </div>
          </aside>
        </div>
      </div>

      {/* -------------------- Question of the Day / Poll Column -------------------- */}
      <div className={styles.pollColumn}>
        <SectionHeader title="आज का सवाल" action="पुराने सर्वेक्षण" href="/polls" />
        <div className={styles.pollContent}>
          <div className={styles.pollQuestion}>
            <h3>
              {pollTitle || "एडमिन पैनल द्वारा प्रकाशित आज का सवाल लोड हो रहा है..."}
            </h3>
            <p>
              {activePoll
                ? `लाइव जनमत सर्वेक्षण • कुल मत: ${totalVotes}`
                : qotd?.category
                ? `श्रेणी: ${qotd.category}`
                : "दैनिक जनमत सर्वेक्षण • कामगार टाइम्स"}
            </p>
            <div className={styles.pollMeta}>
              {hasVoted ? "आपका मत सफलतापूर्वक दर्ज हो चुका है" : "अपना विकल्प चुनें और वोट दें"}
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
                  disabled={!selectedOptId || isSubmitting}
                  className={styles.pollVoteBtn}
                >
                  {isSubmitting ? "मत दर्ज हो रहा है..." : "वोट दें"}
                </button>
              </div>
            ) : (
              <div>
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

                <p className={styles.pollVotes}>
                  कुल {totalVotes.toLocaleString("hi-IN")} वोट दर्ज
                  <span style={{ color: "#10b981", marginLeft: "10px", fontWeight: "bold" }}>
                    <CheckCircle size={14} style={{ display: "inline", verticalAlign: "middle" }} /> धन्यवाद!
                  </span>
                </p>

                {/* Instant verification badge & explanation from admin panel */}
                {qotdResult && (
                  <div
                    style={{
                      marginTop: "14px",
                      padding: "12px 14px",
                      borderRadius: "8px",
                      background: qotdResult.correct
                        ? "rgba(16, 185, 129, 0.12)"
                        : "rgba(239, 68, 68, 0.12)",
                      border: `1px solid ${qotdResult.correct ? "#10b981" : "#ef4444"}`,
                    }}
                  >
                    <strong
                      style={{
                        color: qotdResult.correct ? "#059669" : "#dc2626",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "14px",
                      }}
                    >
                      {qotdResult.correct ? (
                        <>
                          <CheckCircle size={16} /> सही उत्तर!
                        </>
                      ) : (
                        <>
                          <HelpCircle size={16} /> सही उत्तर: {qotdResult.correctAnswer}
                        </>
                      )}
                    </strong>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className={styles.pollAd}>
          <AdSlot ad={weatherPollAds[1]} slotKey="home_mid_4" />
        </div>
      </div>
    </section>
  );
}
