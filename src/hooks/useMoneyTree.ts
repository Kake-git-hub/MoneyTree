import { useState, useEffect, useCallback } from 'react';

// 型定義
export interface HistoryEntry {
  id: string;
  date: string;
  amount: number;
  change?: number;  // 増減額
  memo?: string;
}

export interface TreeData {
  id: string;
  name: string;
  goalAmount: number;
  currentAmount: number;
  createdAt: string;
  updatedAt: string;
  history: HistoryEntry[];
}

export interface AppState {
  trees: TreeData[];
  activeTreeId: string | null;
}

const STORAGE_KEY = 'money-tree-data';

const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const getInitialState = (): AppState => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load saved data:', e);
  }
  return { trees: [], activeTreeId: null };
};

export function useMoneyTree() {
  const [state, setState] = useState<AppState>(getInitialState);

  // 状態が変わるたびにローカルストレージに保存
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // アクティブな木を取得
  const activeTree = state.trees.find(t => t.id === state.activeTreeId) || null;

  // 新しい木を作成
  const createTree = useCallback((name: string, goalAmount: number) => {
    const newTree: TreeData = {
      id: generateId(),
      name,
      goalAmount,
      currentAmount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      history: [],
    };
    setState(prev => ({
      trees: [...prev.trees, newTree],
      activeTreeId: newTree.id,
    }));
    return newTree.id;
  }, []);

  // 木を選択
  const selectTree = useCallback((id: string) => {
    setState(prev => ({ ...prev, activeTreeId: id }));
  }, []);

  // 金額を加算/減算（投稿形式）
  const addAmount = useCallback((treeId: string, change: number, memo?: string) => {
    setState(prev => {
      const tree = prev.trees.find(t => t.id === treeId);
      if (!tree) return prev;
      
      const newAmount = Math.max(0, tree.currentAmount + change);
      const entry: HistoryEntry = {
        id: generateId(),
        date: new Date().toISOString(),
        amount: newAmount,
        change: change,
        memo,
      };
      
      return {
        ...prev,
        trees: prev.trees.map(t =>
          t.id === treeId
            ? {
                ...t,
                currentAmount: newAmount,
                updatedAt: new Date().toISOString(),
                history: [...t.history, entry],
              }
            : t
        ),
      };
    });
  }, []);

  // 目標金額を更新
  const updateGoal = useCallback((treeId: string, goalAmount: number) => {
    setState(prev => ({
      ...prev,
      trees: prev.trees.map(tree =>
        tree.id === treeId
          ? {
              ...tree,
              goalAmount,
              updatedAt: new Date().toISOString(),
            }
          : tree
      ),
    }));
  }, []);

  // 木の名前を更新
  const updateTreeName = useCallback((treeId: string, name: string) => {
    setState(prev => ({
      ...prev,
      trees: prev.trees.map(tree =>
        tree.id === treeId
          ? {
              ...tree,
              name,
              updatedAt: new Date().toISOString(),
            }
          : tree
      ),
    }));
  }, []);

  // 木を削除
  const deleteTree = useCallback((treeId: string) => {
    setState(prev => {
      const newTrees = prev.trees.filter(t => t.id !== treeId);
      return {
        trees: newTrees,
        activeTreeId: prev.activeTreeId === treeId 
          ? (newTrees[0]?.id || null)
          : prev.activeTreeId,
      };
    });
  }, []);

  // 木をリセット（履歴と現在額をクリア）
  const resetTree = useCallback((treeId: string) => {
    setState(prev => ({
      ...prev,
      trees: prev.trees.map(tree =>
        tree.id === treeId
          ? {
              ...tree,
              currentAmount: 0,
              history: [],
              updatedAt: new Date().toISOString(),
            }
          : tree
      ),
    }));
  }, []);

  return {
    state,
    activeTree,
    createTree,
    selectTree,
    addAmount,
    updateGoal,
    updateTreeName,
    deleteTree,
    resetTree,
  };
}
