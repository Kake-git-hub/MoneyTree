import type { TreeData } from '../hooks/useMoneyTree';
import './TreeInfo.css';

interface TreeInfoProps {
  tree: TreeData;
}

export function TreeInfo({ tree }: TreeInfoProps) {
  const percent = tree.goalAmount > 0 
    ? (tree.currentAmount / tree.goalAmount) * 100 
    : 0;
  
  const remaining = Math.max(0, tree.goalAmount - tree.currentAmount);

  return (
    <div className="tree-info">
      <div className="info-row">
        <div className="info-card">
          <span className="info-label">現在の資産</span>
          <span className="info-value current">¥{tree.currentAmount.toLocaleString()}</span>
        </div>
        <div className="info-card">
          <span className="info-label">目標金額</span>
          <span className="info-value goal">¥{tree.goalAmount.toLocaleString()}</span>
        </div>
      </div>
      <div className="info-row">
        <div className="info-card full-width">
          <span className="info-label">目標まであと</span>
          <span className="info-value remaining">¥{remaining.toLocaleString()}</span>
          <span className="info-sub">（達成率: {percent.toFixed(1)}%）</span>
        </div>
      </div>
    </div>
  );
}
