import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import css from "./App.module.css";

export type VoteType = 'good' | 'neutral' | 'bad';

export interface Votes {
  good: number;
  neutral: number;
  bad: number;
}

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
    <App />
  );
}
