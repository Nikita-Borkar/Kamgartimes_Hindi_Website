"use client";

import { useState, useId } from "react";
import Link from "next/link";
import { CheckCircle2, Award, Search, MessageSquarePlus, BarChart3, HelpCircle } from "lucide-react";
import { activePoll, pastPolls, pollCategories, Poll } from "@/data/polls";
import styles from "./polls.module.css";

export function PollsPage() {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [currentPoll, setCurrentPoll] = useState<Poll>(activePoll);
  const [selectedCategory, setSelectedCategory] = useState<string>("सभी");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const searchInputId = useId();

  const handleVoteSubmit = () => {
    if (!selectedOption) return;

    const updatedOptions = currentPoll.options.map((opt) => {
      if (opt.id === selectedOption) {
        return { ...opt, votes: opt.votes + 1 };
      }
      return opt;
    });

    const newTotal = currentPoll.totalVotes + 1;
    const finalOptions = updatedOptions.map((opt) => ({
      ...opt,
      percent: Math.round((opt.votes / newTotal) * 100),
    }));

    setCurrentPoll({
      ...currentPoll,
      totalVotes: newTotal,
      options: finalOptions,
    });
    setHasVoted(true);
  };

  // Filter past polls based on category and search query
  const filteredPastPolls = pastPolls.filter((poll) => {
    const matchesCategory =
      selectedCategory === "सभी" || poll.category === selectedCategory;
    const matchesSearch =
      poll.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      poll.options.some((opt) =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

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
          जनमत व सर्वेक्षण संग्रह
        </span>
      </nav>

      {/* Header Banner */}
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <span className={styles.titleBar} aria-hidden="true" />
          <h1 className={styles.title}>कामगार टाइम्स जनमत व सर्वेक्षण संग्रह</h1>
        </div>
        <p className={styles.lede}>
          राज्य, देश, अर्थव्यवस्था, बुनियादी ढांचा और जनहित के ज्वलंत मुद्दों पर
          महाराष्ट्र के पाठकों का निष्पक्ष जनमत और ऐतिहासिक सर्वेक्षण अभिलेखागार।
        </p>
        <div className={styles.statsBar}>
          <span className={styles.statBadge}>
            <span className={styles.liveDot} />
            सक्रिय जनमत सर्वेक्षण
          </span>
          <span className={styles.statBadge}>
            <BarChart3 size={15} />
            कुल अभिलेख: {pastPolls.length + 1} सर्वेक्षण
          </span>
          <span className={styles.statBadge}>
            <HelpCircle size={15} />
            १००% निष्पक्ष व पारदर्शी राय
          </span>
        </div>
      </header>

      <div className={styles.layout}>
        <div className={styles.contentCol}>
          {/* Active Poll Section (आज का सवाल) */}
          <section aria-label="आज का सक्रिय सवाल" className={styles.activeCard}>
            <div className={styles.activeHeader}>
              <span className={styles.badgeActive}>
                <span className={styles.liveDot} />
                आज का सवाल (सक्रिय जनमत)
              </span>
              <span className={styles.activeDate}>
                {currentPoll.date} • {currentPoll.category}
              </span>
            </div>

            <h2 className={styles.activeQuestion}>{currentPoll.question}</h2>
            {currentPoll.description && (
              <p className={styles.activeDesc}>{currentPoll.description}</p>
            )}

            {!hasVoted ? (
              <div>
                <ul className={styles.optionsList}>
                  {currentPoll.options.map((opt) => (
                    <li key={opt.id}>
                      <label
                        className={`${styles.optionItem} ${
                          selectedOption === opt.id ? styles.optionItemActive : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="activePollRadio"
                          value={opt.id}
                          checked={selectedOption === opt.id}
                          onChange={() => setSelectedOption(opt.id)}
                          className={styles.radioInput}
                        />
                        <span className={styles.optionLabel}>{opt.label}</span>
                      </label>
                    </li>
                  ))}
                </ul>

                <div className={styles.voteActionRow}>
                  <button
                    type="button"
                    onClick={handleVoteSubmit}
                    disabled={!selectedOption}
                    className={styles.voteButton}
                  >
                    अपना वोट दर्ज करें
                  </button>
                  <span className={styles.activeDate}>
                    केवल एक विकल्प चुनें • कोई व्यक्तिगत डेटा संग्रह नहीं
                  </span>
                </div>
              </div>
            ) : (
              <div>
                <ul className={styles.resultsList}>
                  {currentPoll.options.map((opt, index) => {
                    const isSelected = selectedOption === opt.id;
                    const isHighest = index === 0;
                    return (
                      <li key={opt.id} className={styles.resultItem}>
                        <div className={styles.resultInfo}>
                          <span>
                            {opt.label}{" "}
                            {isSelected && (
                              <strong style={{ color: "var(--brand)" }}>
                                (आपका वोट)
                              </strong>
                            )}
                          </span>
                          <span className={styles.resultPercent}>
                            {opt.percent}%
                            {isHighest && (
                              <span className={styles.winnerTag}>
                                <Award size={12} /> सर्वाधिक
                              </span>
                            )}
                          </span>
                        </div>
                        <div className={styles.progressBar}>
                          <div
                            className={`${styles.progressFill} ${
                              !isHighest && !isSelected
                                ? styles.progressFillDefault
                                : ""
                            }`}
                            style={{ width: `${opt.percent}%` }}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className={styles.voteActionRow}>
                  <span className={styles.voteSuccessMsg}>
                    <CheckCircle2 size={16} style={{ verticalAlign: "middle", marginRight: 4 }} />
                    धन्यवाद! आपका वोट सफलतापूर्वक दर्ज कर लिया गया है।
                  </span>
                </div>
              </div>
            )}

            <div className={styles.pollFooterMeta}>
              <span>
                कुल दर्ज वोट: <strong>{currentPoll.totalVotes.toLocaleString("hi-IN")}</strong>
              </span>
              <span>अंतिम तिथि: {currentPoll.endDate}</span>
            </div>
          </section>

          {/* Past Surveys Section (पुराने सर्वेक्षण अभिलेखागार) */}
          <section
            aria-label="पुराने सर्वेक्षण अभिलेखागार"
            className={styles.archiveSection}
          >
            <div className={styles.sectionHeading}>
              <h2>
                <span className={styles.sectionBar} aria-hidden="true" />
                पुराने सर्वेक्षण (प्रश्न व उत्तर अभिलेखागार)
              </h2>
              <p>
                विगत दिनों में पूछे गए सभी सवाल, विकल्प और पाठकों द्वारा दर्ज किए गए
                विस्तृत परिणाम।
              </p>
            </div>

            {/* Filter and Search Bar */}
            <div className={styles.filtersBar}>
              <div className={styles.searchRow}>
                <label htmlFor={searchInputId} className="srOnly">
                  सर्वेक्षण प्रश्न खोजें
                </label>
                <input
                  id={searchInputId}
                  type="text"
                  placeholder="पुराने सवाल या विकल्प में खोजें..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>

              <div className={styles.categoryPills}>
                {pollCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`${styles.pillBtn} ${
                      selectedCategory === cat ? styles.pillBtnActive : ""
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Past Polls Cards List */}
            <div className={styles.pastList}>
              {filteredPastPolls.length > 0 ? (
                filteredPastPolls.map((poll) => {
                  return (
                    <article key={poll.id} className={styles.pastCard}>
                      <div className={styles.pastTop}>
                        <span className={styles.pastCategory}>
                          {poll.category}
                        </span>
                        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                          <span className={styles.activeDate}>{poll.date}</span>
                          <span className={styles.pastStatus}>सर्वेक्षण संपन्न</span>
                        </div>
                      </div>

                      <h3 className={styles.pastQuestion}>{poll.question}</h3>
                      {poll.description && (
                        <p className={styles.pastDesc}>{poll.description}</p>
                      )}

                      <ul className={styles.resultsList}>
                        {poll.options.map((opt) => {
                          const isWinner = opt.id === poll.winningOptionId;
                          return (
                            <li key={opt.id} className={styles.resultItem}>
                              <div className={styles.resultInfo}>
                                <span>{opt.label}</span>
                                <span className={styles.resultPercent}>
                                  {opt.percent}%{" "}
                                  <span style={{ fontSize: "12px", color: "var(--muted)", fontWeight: "normal" }}>
                                    ({opt.votes.toLocaleString("hi-IN")} वोट)
                                  </span>
                                  {isWinner && (
                                    <span className={styles.winnerTag}>
                                      <Award size={12} /> बहुमत
                                    </span>
                                  )}
                                </span>
                              </div>
                              <div className={styles.progressBar}>
                                <div
                                  className={`${styles.progressFill} ${
                                    !isWinner ? styles.progressFillDefault : ""
                                  }`}
                                  style={{ width: `${opt.percent}%` }}
                                />
                              </div>
                            </li>
                          );
                        })}
                      </ul>

                      <div className={styles.pollFooterMeta}>
                        <span>
                          कुल वोट दर्ज:{" "}
                          <strong>{poll.totalVotes.toLocaleString("hi-IN")}</strong>
                        </span>
                        <span>प्रकार: जनमत संग्रह</span>
                      </div>
                    </article>
                  );
                })
              ) : (
                <div style={{ padding: "32px", textAlign: "center", color: "var(--muted)" }}>
                  <Search size={32} style={{ margin: "0 auto 12px", opacity: 0.5 }} />
                  <p>आपके द्वारा खोजे गए विषय पर कोई पुराना सर्वेक्षण नहीं मिला।</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sideBox}>
            <h3 className={styles.sideBoxTitle}>जनमत सर्वेक्षण नीति</h3>
            <p className={styles.sideBoxText}>
              कामगार टाइम्स दैनिक जनमत सर्वेक्षण का मुख्य उद्देश्य लोकतान्त्रिक चर्चा को बढ़ावा देना और जनभावनाओं को प्रतिबिंबित करना है।
            </p>
            <ul className={styles.sideList}>
              <li>प्रत्येक पाठक एक प्रश्न पर एक बार वोट कर सकता है।</li>
              <li>सर्वेक्षण पूर्णतः पारदर्शी और स्वतंत्र होते हैं।</li>
              <li>परिणामों का विश्लेषण हमारे संपादकीय पृष्ठ पर भी प्रकाशित होता है।</li>
            </ul>
          </div>

          <div className={styles.sideBox}>
            <h3 className={styles.sideBoxTitle}>अपना सवाल सुझाएं</h3>
            <p className={styles.sideBoxText}>
              क्या आपके पास कोई महत्वपूर्ण जनमुद्दा या सवाल है जिसे आप कामगार टाइम्स के आगामी सर्वेक्षण में देखना चाहते हैं?
            </p>
            <Link href="/send-news" className={styles.suggestBtn}>
              <MessageSquarePlus size={16} />
              सवाल भेजें (Suggest Poll)
            </Link>
          </div>

          <div className={styles.sideBox}>
            <h3 className={styles.sideBoxTitle}>दैनिक ई-पेपर पढ़ें</h3>
            <p className={styles.sideBoxText}>
              आज के विस्तृत समाचार और संपादकीय विश्लेषण के लिए हमारा डिजिटल ई-पेपर देखें।
            </p>
            <Link
              href="/e-paper"
              style={{
                color: "var(--brand)",
                fontWeight: "var(--fw-bold)",
                fontSize: "var(--fs-meta)",
                textDecoration: "none",
              }}
            >
              आज का ई-पेपर पढ़ें →
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
