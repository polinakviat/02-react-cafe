import React, { useState, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import css from "index.css"; // Ensure this matches your CSS module filename

type VoteType = "good" | "neutral" | "bad";

interface FeedbackState {
  good: number;
  neutral: number;
  bad: number;
}

export default function App() {
  const [votes, setVotes] = useState<FeedbackState>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleVote = (type: VoteType) => {
    setVotes((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  const resetVotes = () => {
    setVotes({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  const totalVotes = votes.good + votes.neutral + votes.bad;

  return (
    <div className={css.app}>
      <div className={css.container}>
        <h1 className={css.title}>Sip Happens Café</h1>
        <p className={css.description}>
          Please rate our service by selecting one of the options below.
        </p>

        <div className={css.buttonGroup}>
          <button className={css.button} onClick={() => handleVote("good")}>
            Good ({votes.good})
          </button>
          <button className={css.button} onClick={() => handleVote("neutral")}>
            Neutral ({votes.neutral})
          </button>
          <button className={css.button} onClick={() => handleVote("bad")}>
            Bad ({votes.bad})
          </button>

          {totalVotes > 0 && (
            <button
              className={`${css.button} ${css.reset}`}
              onClick={resetVotes}
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement as HTMLElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

import styles from './VoteStats.module.css';

export default function VoteStats({ good = 0, neutral = 0, bad = 0 }) {
  const total = good + neutral + bad;
  const positivePercentage = total > 0 ? Math.round((good / total) * 100) : 0;

  return (
    <div className={styles.container}>
      <p className={styles.stat}>Good: <strong>{good}</strong></p>
      <p className={styles.stat}>Neutral: <strong>{neutral}</strong></p>
      <p className={styles.stat}>Bad: <strong>{bad}</strong></p>
      <p className={styles.stat}>Total: <strong>{total}</strong></p>
      <p className={styles.stat}>Positive: <strong>{positivePercentage}%</strong></p>
    </div>
  );
}

<p className={css.message}>No feedback yet</p>