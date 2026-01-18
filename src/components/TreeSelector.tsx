import { useState } from 'react';
import type { TreeData } from '../hooks/useMoneyTree';
import './TreeSelector.css';

interface TreeSelectorProps {
  trees: TreeData[];
  activeTreeId: string | null;
  onSelect: (id: string) => void;
  onCreate: (name: string, goalAmount: number) => void;
  onDelete: (id: string) => void;
  onReset: (id: string) => void;
  onUpdateGoal: (id: string, goalAmount: number) => void;
  onUpdateName: (id: string, name: string) => void;
}

export function TreeSelector({
  trees,
  activeTreeId,
  onSelect,
  onCreate,
  onDelete,
  onReset,
  onUpdateGoal,
  onUpdateName,
}: TreeSelectorProps) {
  const [showCreate, setShowCreate] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [newName, setNewName] = useState('');
  const [newGoal, setNewGoal] = useState('');
  
  // 設定編集用
  const [editName, setEditName] = useState('');
  const [editGoal, setEditGoal] = useState('');

  const activeTree = trees.find(t => t.id === activeTreeId);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const goal = parseFloat(newGoal.replace(/,/g, ''));
    if (newName.trim() && !isNaN(goal) && goal > 0) {
      onCreate(newName.trim(), goal);
      setNewName('');
      setNewGoal('');
      setShowCreate(false);
    }
  };

  const handleOpenSettings = () => {
    if (activeTree) {
      setEditName(activeTree.name);
      setEditGoal(activeTree.goalAmount.toLocaleString());
      setShowSettings(true);
    }
  };

  const handleSaveSettings = () => {
    if (activeTree) {
      const goal = parseFloat(editGoal.replace(/,/g, ''));
      if (editName.trim()) {
        onUpdateName(activeTree.id, editName.trim());
      }
      if (!isNaN(goal) && goal > 0) {
        onUpdateGoal(activeTree.id, goal);
      }
      setShowSettings(false);
    }
  };

  const handleDelete = () => {
    if (activeTree && confirm(`「${activeTree.name}」を削除しますか？この操作は取り消せません。`)) {
      onDelete(activeTree.id);
      setShowSettings(false);
    }
  };

  const handleReset = () => {
    if (activeTree && confirm(`「${activeTree.name}」の履歴と現在額をリセットしますか？`)) {
      onReset(activeTree.id);
      setShowSettings(false);
    }
  };

  const formatNumber = (value: string) => {
    const num = value.replace(/[^\d]/g, '');
    if (num === '') return '';
    return parseInt(num, 10).toLocaleString();
  };

  return (
    <div className="tree-selector">
      {/* 木の選択タブ */}
      <div className="tree-tabs">
        {trees.map(tree => (
          <button
            key={tree.id}
            className={`tree-tab ${tree.id === activeTreeId ? 'active' : ''}`}
            onClick={() => onSelect(tree.id)}
          >
            🌳 {tree.name}
          </button>
        ))}
        <button className="tree-tab add-tab" onClick={() => setShowCreate(true)}>
          ＋
        </button>
      </div>

      {/* 設定ボタン */}
      {activeTree && (
        <button className="settings-button" onClick={handleOpenSettings}>
          ⚙️
        </button>
      )}

      {/* 新規作成ダイアログ */}
      {showCreate && (
        <div className="dialog-overlay">
          <div className="dialog">
            <h3>🌱 新しい木を植える</h3>
            <form onSubmit={handleCreate}>
              <div className="dialog-field">
                <label>木の名前</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="例: 老後資金"
                  autoFocus
                />
              </div>
              <div className="dialog-field">
                <label>目標金額</label>
                <div className="goal-input-wrapper">
                  <span>¥</span>
                  <input
                    type="text"
                    value={newGoal}
                    onChange={(e) => setNewGoal(formatNumber(e.target.value))}
                    placeholder="10,000,000"
                    inputMode="numeric"
                  />
                </div>
              </div>
              <div className="dialog-buttons">
                <button type="button" onClick={() => setShowCreate(false)}>
                  キャンセル
                </button>
                <button type="submit" className="primary">
                  作成
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 設定ダイアログ */}
      {showSettings && activeTree && (
        <div className="dialog-overlay">
          <div className="dialog">
            <h3>⚙️ 木の設定</h3>
            <div className="dialog-field">
              <label>木の名前</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            <div className="dialog-field">
              <label>目標金額</label>
              <div className="goal-input-wrapper">
                <span>¥</span>
                <input
                  type="text"
                  value={editGoal}
                  onChange={(e) => setEditGoal(formatNumber(e.target.value))}
                  inputMode="numeric"
                />
              </div>
            </div>
            <div className="dialog-buttons">
              <button type="button" onClick={() => setShowSettings(false)}>
                キャンセル
              </button>
              <button type="button" className="primary" onClick={handleSaveSettings}>
                保存
              </button>
            </div>
            <div className="danger-zone">
              <button type="button" className="danger-btn" onClick={handleReset}>
                🔄 リセット
              </button>
              <button type="button" className="danger-btn delete" onClick={handleDelete}>
                🗑️ 削除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
