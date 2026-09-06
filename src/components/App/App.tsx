import { useState } from 'react';
import css from './App.module.css';
import VoteStats from '../VoteStats/VoteStats';

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
    setVotes((prevVotes) => ({
      ...prevVotes,
      [type]: prevVotes[type] + 1,
    }));
  };

  const handleReset = () => {
    setVotes({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  const totalVotes = votes.good + votes.neutral + votes.bad;
  const positiveRate = totalVotes > 0 ? Math.round((votes.good / totalVotes) * 100) : 0;

  return (
    <div className={css.app}>
      <div className={css.container}>
        <h1 className={css.title}>Sip Happens Café</h1>
        <p className={css.description}>
          Please rate our service by selecting one of the options below.
        </p>

        <div className={css.buttonGroup}>
          <button className={css.button} onClick={() => handleVote('good')}>
            Good ({votes.good})
          </button>
          <button className={css.button} onClick={() => handleVote('neutral')}>
            Neutral ({votes.neutral})
          </button>
          <button className={css.button} onClick={() => handleVote('bad')}>
            Bad ({votes.bad})
          </button>

          {totalVotes > 0 && (
            <button className={`${css.button} ${css.reset}`} onClick={handleReset}>
              Reset
            </button>
          )}

          {totalVotes > 0 && (
            <VoteStats
              votes={votes}
              totalVotes={totalVotes}
              positiveRate={positiveRate}
            />
          )}
        </div>
      </div>
    </div>
  );
}