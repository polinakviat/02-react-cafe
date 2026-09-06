import type { Votes } from '../../types/votes';
import css from './VoteStats.module.css';

interface VoteStatsProps {
  votes: Votes;
}

export default function VoteStats({ votes: { good, neutral, bad } }: VoteStatsProps) {
  const total = good + neutral + bad;
  const positive = total > 0 ? Math.round((good / total) * 100) : 0;

  return (
    <div className={css.container}>
      <p className={css.stat}>
        Good: <strong>{good}</strong>
      </p>
      <p className={css.stat}>
        Neutral: <strong>{neutral}</strong>
      </p>
      <p className={css.stat}>
        Bad: <strong>{bad}</strong>
      </p>
      <p className={css.stat}>
        Total: <strong>{total}</strong>
      </p>
      <p className={css.stat}>
        Positive: <strong>{positive}%</strong>
      </p>
    </div>
  );
}