// 木の成長段階
export type TreeStage =
  | 'seed'      // 種
  | 'sprout'    // 芽
  | 'seedling'  // 苗木
  | 'small'     // 小さな木
  | 'medium'    // 大きな木
  | 'flowering' // 花が咲く
  | 'fruiting'; // 実がなる

// 成長段階の情報
export interface StageInfo {
  stage: TreeStage;
  name: string;
  minPercent: number;
  maxPercent: number;
}

// 入力履歴
export interface HistoryEntry {
  id: string;
  date: string;
  amount: number;
  memo?: string;
}

// 木のデータ
export interface TreeData {
  id: string;
  name: string;
  goalAmount: number;
  currentAmount: number;
  createdAt: string;
  updatedAt: string;
  history: HistoryEntry[];
}

// アプリ全体の状態
export interface AppState {
  trees: TreeData[];
  activeTreeId: string | null;
}

// 成長段階の定義
export const STAGES: StageInfo[] = [
  { stage: 'seed', name: '種', minPercent: 0, maxPercent: 5 },
  { stage: 'sprout', name: '芽', minPercent: 5, maxPercent: 15 },
  { stage: 'seedling', name: '苗木', minPercent: 15, maxPercent: 30 },
  { stage: 'small', name: '小さな木', minPercent: 30, maxPercent: 50 },
  { stage: 'medium', name: '大きな木', minPercent: 50, maxPercent: 75 },
  { stage: 'flowering', name: '花が咲く', minPercent: 75, maxPercent: 95 },
  { stage: 'fruiting', name: '実がなる', minPercent: 95, maxPercent: 100 },
];

// 段階を取得する関数
export function getStageFromPercent(percent: number): StageInfo {
  const clampedPercent = Math.min(100, Math.max(0, percent));
  for (let i = STAGES.length - 1; i >= 0; i--) {
    if (clampedPercent >= STAGES[i].minPercent) {
      return STAGES[i];
    }
  }
  return STAGES[0];
}
