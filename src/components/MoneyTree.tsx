import { useMemo } from 'react';
import type { TreeData } from '../hooks/useMoneyTree';
import './MoneyTree.css';

// 成長段階の型
type TreeStage = 'seed' | 'sprout' | 'seedling' | 'small' | 'medium' | 'flowering' | 'fruiting';

interface StageInfo {
  stage: TreeStage;
  name: string;
  minPercent: number;
  maxPercent: number;
  image: string;
}

const STAGES: StageInfo[] = [
  { stage: 'seed', name: '種', minPercent: 0, maxPercent: 5, image: '/trees/種.png' },
  { stage: 'sprout', name: '芽', minPercent: 5, maxPercent: 15, image: '/trees/芽.png' },
  { stage: 'seedling', name: '苗木', minPercent: 15, maxPercent: 30, image: '/trees/苗木.png' },
  { stage: 'small', name: '小さな木', minPercent: 30, maxPercent: 50, image: '/trees/小さな木.png' },
  { stage: 'medium', name: '大きな木', minPercent: 50, maxPercent: 75, image: '/trees/大きな木.png' },
  { stage: 'flowering', name: '花が咲く', minPercent: 75, maxPercent: 95, image: '/trees/花が咲く.png' },
  { stage: 'fruiting', name: '実がなる', minPercent: 95, maxPercent: 100, image: '/trees/身がなる.png' },
];

function getStageFromPercent(percent: number): StageInfo {
  const clampedPercent = Math.min(100, Math.max(0, percent));
  for (let i = STAGES.length - 1; i >= 0; i--) {
    if (clampedPercent >= STAGES[i].minPercent) {
      return STAGES[i];
    }
  }
  return STAGES[0];
}

interface MoneyTreeProps {
  tree: TreeData;
}

export function MoneyTree({ tree }: MoneyTreeProps) {
  const percent = tree.goalAmount > 0 
    ? (tree.currentAmount / tree.goalAmount) * 100 
    : 0;
  
  const stageInfo = useMemo(() => getStageFromPercent(percent), [percent]);

  return (
    <div className="money-tree-container">
      {/* 木の画像表示エリア */}
      <div className="tree-image-area">
        <img 
          src={stageInfo.image} 
          alt={stageInfo.name}
          className="tree-image"
        />
      </div>

      {/* 進捗表示 */}
      <div className="progress-section">
        <div className="stage-name">{stageInfo.name}</div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${Math.min(percent, 100)}%` }}
          />
        </div>
        <div className="progress-text">
          {percent.toFixed(1)}% 達成
        </div>
        
        {/* 段階インジケーター */}
        <div className="stage-indicators">
          {STAGES.map((stage, index) => (
            <div 
              key={stage.stage}
              className={`stage-dot ${percent >= stage.minPercent ? 'active' : ''}`}
              title={stage.name}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
