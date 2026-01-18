import { useState } from 'react';
import { useMoneyTree } from './hooks/useMoneyTree';
import {
  MoneyTree,
  AmountInput,
  TreeInfo,
  History,
  TreeSelector,
  Welcome,
} from './components';
import './App.css';

type Tab = 'tree' | 'input' | 'history';

function App() {
  const {
    state,
    activeTree,
    createTree,
    selectTree,
    addAmount,
    updateGoal,
    updateTreeName,
    deleteTree,
    resetTree,
  } = useMoneyTree();

  const [activeTab, setActiveTab] = useState<Tab>('tree');

  // 木がない場合はウェルカム画面を表示
  if (state.trees.length === 0) {
    return <Welcome onCreate={createTree} />;
  }

  // アクティブな木がない場合（念のため）
  if (!activeTree) {
    return <Welcome onCreate={createTree} />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌳 金のなる木</h1>
      </header>

      <main className="app-main">
        <TreeSelector
          trees={state.trees}
          activeTreeId={state.activeTreeId}
          onSelect={selectTree}
          onCreate={createTree}
          onDelete={deleteTree}
          onReset={resetTree}
          onUpdateGoal={updateGoal}
          onUpdateName={updateTreeName}
        />

        <div className="tree-name-display">
          <h2>{activeTree.name}</h2>
        </div>

        {activeTab === 'tree' && (
          <div className="tab-content">
            <MoneyTree tree={activeTree} />
            <TreeInfo tree={activeTree} />
          </div>
        )}

        {activeTab === 'input' && (
          <div className="tab-content">
            <AmountInput
              tree={activeTree}
              onAdd={(amount, memo) => addAmount(activeTree.id, amount, memo)}
            />
          </div>
        )}

        {activeTab === 'history' && (
          <div className="tab-content">
            <History tree={activeTree} />
          </div>
        )}
      </main>

      {/* 下部ナビゲーション */}
      <nav className="bottom-nav">
        <button
          className={`nav-item ${activeTab === 'tree' ? 'active' : ''}`}
          onClick={() => setActiveTab('tree')}
        >
          <span className="nav-icon">🌳</span>
          <span className="nav-label">木を見る</span>
        </button>
        <button
          className={`nav-item ${activeTab === 'input' ? 'active' : ''}`}
          onClick={() => setActiveTab('input')}
        >
          <span className="nav-icon">💰</span>
          <span className="nav-label">金額入力</span>
        </button>
        <button
          className={`nav-item ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <span className="nav-icon">📊</span>
          <span className="nav-label">履歴</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
