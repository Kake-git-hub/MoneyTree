import { useState } from 'react';
import type { TreeData } from '../hooks/useMoneyTree';
import './AmountInput.css';

interface AmountInputProps {
  tree: TreeData;
  onUpdate: (amount: number, memo?: string) => void;
}

export function AmountInput({ tree, onUpdate }: AmountInputProps) {
  const [amount, setAmount] = useState(tree.currentAmount.toString());
  const [memo, setMemo] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount.replace(/,/g, ''));
    if (!isNaN(numAmount) && numAmount >= 0) {
      setShowConfirm(true);
    }
  };

  const confirmUpdate = () => {
    const numAmount = parseFloat(amount.replace(/,/g, ''));
    onUpdate(numAmount, memo || undefined);
    setMemo('');
    setShowConfirm(false);
  };

  const formatNumber = (value: string) => {
    const num = value.replace(/[^\d]/g, '');
    if (num === '') return '';
    return parseInt(num, 10).toLocaleString();
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(formatNumber(e.target.value));
  };

  return (
    <div className="amount-input-container">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="amount">現在の資産額</label>
          <div className="amount-wrapper">
            <span className="currency">¥</span>
            <input
              type="text"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              placeholder="0"
              inputMode="numeric"
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="memo">メモ（任意）</label>
          <input
            type="text"
            id="memo"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="例: 配当金入金"
          />
        </div>

        <button type="submit" className="update-button">
          金額を更新
        </button>
      </form>

      {/* 確認ダイアログ */}
      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-dialog">
            <h3>金額を更新しますか？</h3>
            <p className="confirm-amount">
              ¥{parseFloat(amount.replace(/,/g, '')).toLocaleString()}
            </p>
            {memo && <p className="confirm-memo">メモ: {memo}</p>}
            <div className="confirm-buttons">
              <button onClick={() => setShowConfirm(false)} className="cancel-btn">
                キャンセル
              </button>
              <button onClick={confirmUpdate} className="confirm-btn">
                更新する
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
