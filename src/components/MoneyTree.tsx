import { useMemo, useState, useEffect } from 'react';
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
  { stage: 'seed', name: '種', minPercent: 0, maxPercent: 5, image: '/trees/stage1-seed.png' },
  { stage: 'sprout', name: '芽', minPercent: 5, maxPercent: 15, image: '/trees/stage2-sprout.png' },
  { stage: 'seedling', name: '苗木', minPercent: 15, maxPercent: 30, image: '/trees/stage3-seedling.png' },
  { stage: 'small', name: '小さな木', minPercent: 30, maxPercent: 50, image: '/trees/stage4-small.png' },
  { stage: 'medium', name: '大きな木', minPercent: 50, maxPercent: 75, image: '/trees/stage5-medium.png' },
  { stage: 'flowering', name: '花が咲く', minPercent: 75, maxPercent: 95, image: '/trees/stage6-flower.png' },
  { stage: 'fruiting', name: '実がなる', minPercent: 95, maxPercent: 100, image: '/trees/stage7-fruit.png' },
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
  
  // 成長アニメーション用の状態
  const [isGrowing, setIsGrowing] = useState(false);
  const [prevStage, setPrevStage] = useState(stageInfo.stage);
  
  // 段階が変わったらアニメーションを発火
  useEffect(() => {
    if (stageInfo.stage !== prevStage) {
      setIsGrowing(true);
      setPrevStage(stageInfo.stage);
      const timer = setTimeout(() => setIsGrowing(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [stageInfo.stage, prevStage]);

  return (
    <div className="money-tree-container">
      {/* 木の画像表示エリア */}
      <div className="tree-image-area">
        {/* キラキラエフェクト */}
        {isGrowing && (
          <div className="sparkle-container">
            <span className="sparkle">✨</span>
            <span className="sparkle">✨</span>
            <span className="sparkle">✨</span>
            <span className="sparkle">✨</span>
            <span className="sparkle">✨</span>
          </div>
        )}
        <img 
          src={stageInfo.image} 
          alt={stageInfo.name}
          className={`tree-image ${isGrowing ? 'growing' : ''}`}
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
