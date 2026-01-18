import type { TreeData } from '../hooks/useMoneyTree';
import './History.css';

interface HistoryProps {
  tree: TreeData;
}

export function History({ tree }: HistoryProps) {
  const sortedHistory = [...tree.history].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (sortedHistory.length === 0) {
    return (
      <div className="history-container">
        <h3>📊 入力履歴</h3>
        <div className="history-empty">
          <p>まだ履歴がありません</p>
          <p className="hint">金額を入力すると履歴が記録されます</p>
        </div>
      </div>
    );
  }

  return (
    <div className="history-container">
      <h3>📊 入力履歴</h3>
      <div className="history-list">
        {sortedHistory.map((entry) => {
          const change = entry.change ?? 0;
          const isPositive = change >= 0;

          return (
            <div key={entry.id} className="history-item">
              <div className="history-date">{formatDate(entry.date)}</div>
              <div className="history-content">
                <span className="history-amount">
                  ¥{entry.amount.toLocaleString()}
                </span>
                {change !== 0 && (
                  <span className={`history-diff ${isPositive ? 'positive' : 'negative'}`}>
                    {isPositive ? '+' : ''}¥{change.toLocaleString()}
                  </span>
                )}
              </div>
              {entry.memo && (
                <div className="history-memo">{entry.memo}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
