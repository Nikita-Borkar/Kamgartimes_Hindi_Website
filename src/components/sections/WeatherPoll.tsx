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
}

export function WeatherPoll() {
  // Live Weather States
  const [mumbaiWeather, setMumbaiWeather] = useState<LiveWeatherData | null>(null);
  const [localWeather, setLocalWeather] = useState<LiveWeatherData | null>(null);

  // Poll States: Question & Options only
  const [pollTitle, setPollTitle] = useState<string>(
    "क्या आपको लगता है कि जनहित नीतियों का सीधा लाभ कामगारों तक पहुँच रहा है?"
  );
  const [options, setOptions] = useState<PollOptionState[]>([
    { id: "opt-1", label: "हाँ, पूरी तरह से" },
    { id: "opt-2", label: "नहीं, अभी और सुधार की आवश्यकता है" },
    { id: "opt-3", label: "कह नहीं सकते" },
  ]);
  const [selectedOptId, setSelectedOptId] = useState<string>("");
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pollId, setPollId] = useState<string>("");
  const [isPollType, setIsPollType] = useState<boolean>(true);

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
        }
      } catch (err) {}
    }

    loadWeather();

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

  // 2. Fetch Active Poll / Question from API
  useEffect(() => {
    kamgarApi
      .getActivePoll()
      .then((poll) => {
        if (poll && poll.question && Array.isArray(poll.options) && poll.options.length > 0) {
          setPollId(poll._id);
          setIsPollType(true);
          setPollTitle(poll.question);
          setOptions(
            poll.options.map((opt) => ({
              id: opt._id,
              label: opt.text,
            }))
          );

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

        fetchQotdFallback();
      })
      .catch(() => {
        fetchQotdFallback();
      });

    function fetchQotdFallback() {
      kamgarApi
        .getTodayQuestion()
        .then((data) => {
          if (data && data.question && Array.isArray(data.options) && data.options.length > 0) {
            setPollId(data._id);
            setIsPollType(false);
            setPollTitle(data.question);
            setOptions(
              data.options.map((opt, i) => ({
                id: `opt-${i}`,
                label: opt,
              }))
            );

            if (typeof window !== "undefined" && data._id) {
              const savedVote = localStorage.getItem(`kt_voted_qotd_${data._id}`);
              if (savedVote) {
                try {
                  const parsed = JSON.parse(savedVote);
                  setSelectedOptId(parsed.selectedOptId);
                  setHasVoted(true);
                } catch {}
              }
            }
          }
        })
        .catch(() => {});
    }
  }, []);

  // 3. Handle Voting
  const handleVote = async () => {
    if (!selectedOptId || hasVoted || isSubmitting) return;

    setIsSubmitting(true);

    try {
      if (isPollType && pollId) {
        await kamgarApi.votePoll(pollId, selectedOptId);
        if (typeof window !== "undefined") {
          localStorage.setItem(
            `kt_voted_poll_${pollId}`,
            JSON.stringify({ selectedOptId })
          );
        }
      } else if (!isPollType && pollId) {
        const chosenIndex = options.findIndex((o) => o.id === selectedOptId);
        const chosenOpt = options.find((o) => o.id === selectedOptId);
        await kamgarApi.voteQuestion({
          questionId: pollId,
          optionIndex: chosenIndex >= 0 ? chosenIndex : 0,
          optionLabel: chosenOpt?.label || selectedOptId,
        });
        if (typeof window !== "undefined") {
          localStorage.setItem(
            `kt_voted_qotd_${pollId}`,
            JSON.stringify({ selectedOptId })
          );
        }
      } else {
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "kt_voted_poll_default",
            JSON.stringify({ selectedOptId })
          );
        }
      }
    } catch {}

    setHasVoted(true);
    setIsSubmitting(false);
  };

  return (
    <section className={styles.weatherPoll} aria-label="लाइव मौसम और आज का सवाल">
      {/* -------------------- Weather Column -------------------- */}
      <div className={styles.weatherColumn}>
        <SectionHeader title="मौसम" action="विस्तृत पूर्वानुमान" href="/मौसम" />
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

      {/* -------------------- Question of the Day / Poll Column (Question & Options only) -------------------- */}
      <div className={styles.pollColumn}>
        <SectionHeader title="आज का सवाल" action={null} />
        <div className={styles.pollContent}>
          <div className={styles.pollQuestion}>
            <h3>{pollTitle}</h3>
            {hasVoted && (
              <div className={styles.pollVotedBadge}>
                <CheckCircle size={14} aria-hidden="true" />
                <span>आपका मत दर्ज हो चुका है</span>
              </div>
            )}
          </div>

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
                      onChange={() => !hasVoted && setSelectedOptId(option.id)}
                      disabled={hasVoted}
                      className={styles.pollRadioInput}
                    />
                    <span>{option.label}</span>
                  </label>
                </li>
              ))}
            </ol>

            {!hasVoted && (
              <button
                type="button"
                onClick={handleVote}
                disabled={!selectedOptId || isSubmitting}
                className={styles.pollVoteBtn}
              >
                {isSubmitting ? "मत दर्ज हो रहा है..." : "वोट दें"}
              </button>
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
