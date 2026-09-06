import { useState } from 'react';
import css from './App.module.css';
import VoteStats from '../VoteStats/VoteStats';
import type { Votes, VoteType } from '../../types/votes';

function Notification() {
  return <p>No votes yet. Please cast your first vote.</p>;
}

function CafeInfo() {
  return (
    <div>
      <h1>Cafe Feedback</h1>
      <p>Please leave your feedback about our service.</p>
    </div>
  );
}

function VoteOptions({
  onVote,
  onReset,
  canReset,
}: {
  onVote: (type: VoteType) => void;
  onReset: () => void;
  canReset: boolean;
}) {
  return (
    <div>
      <button type="button" onClick={() => onVote('good')}>
        Good
      </button>
      <button type="button" onClick={() => onVote('neutral')}>
        Neutral
      </button>
      <button type="button" onClick={() => onVote('bad')}>
        Bad
      </button>
      <button type="button" onClick={onReset} disabled={!canReset}>
        Reset
      </button>
    </div>
  );
}

export default function App() {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const totalVotes = votes.good + votes.neutral + votes.bad;
  const positiveRate = totalVotes > 0 ? Math.round((votes.good / totalVotes) * 100) : 0;

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

  return (
    <div className={css.container}>
      <CafeInfo />

      <VoteOptions
        onVote={handleVote}
        onReset={handleReset}
        canReset={totalVotes > 0}
      />

      {totalVotes > 0 ? (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}