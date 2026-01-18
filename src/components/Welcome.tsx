import { useState } from 'react';
import './Welcome.css';

interface WelcomeProps {
  onCreate: (name: string, goalAmount: number) => void;
}

export function Welcome({ onCreate }: WelcomeProps) {
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const goalAmount = parseFloat(goal.replace(/,/g, ''));
    if (name.trim() && !isNaN(goalAmount) && goalAmount > 0) {
      onCreate(name.trim(), goalAmount);
    }
  };

  const formatNumber = (value: string) => {
    const num = value.replace(/[^\d]/g, '');
    if (num === '') return '';
    return parseInt(num, 10).toLocaleString();
  };

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <div className="welcome-icon">🌳</div>
        <h1>金のなる木</h1>
        <p className="welcome-subtitle">
          資産形成を楽しく可視化
        </p>
        
        <div className="welcome-description">
          <p>目標金額を設定して、<br />資産が増えるごとに木が成長します</p>
        </div>

        <form onSubmit={handleSubmit} className="welcome-form">
          <div className="form-field">
            <label>木の名前を決めよう</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例: 老後資金、投資口座"
              autoFocus
            />
          </div>

          <div className="form-field">
            <label>目標金額は？</label>
            <div className="goal-wrapper">
              <span className="yen">¥</span>
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(formatNumber(e.target.value))}
                placeholder="10,000,000"
                inputMode="numeric"
              />
            </div>
          </div>

          <button type="submit" className="start-button">
            🌱 木を植える
          </button>
        </form>

        <div className="growth-preview">
          <p>成長段階</p>
          <div className="stages">
            <span>🌰 種</span>
            <span>→</span>
            <span>🌱 芽</span>
            <span>→</span>
            <span>🌿 苗木</span>
            <span>→</span>
            <span>🌲 木</span>
            <span>→</span>
            <span>🌸 花</span>
            <span>→</span>
            <span>💰 実</span>
          </div>
        </div>
      </div>
    </div>
  );
}
