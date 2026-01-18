import { useState } from 'react';
import type { TreeData } from '../hooks/useMoneyTree';
import './AmountInput.css';

interface AmountInputProps {
  tree: TreeData;
  onAdd: (amount: number, memo?: string) => void;
}

export function AmountInput({ tree, onAdd }: AmountInputProps) {
  const [amount, setAmount] = useState('');
  const [isNegative, setIsNegative] = useState(false);
  const [memo, setMemo] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount.replace(/,/g, ''));
    if (!isNaN(numAmount) && numAmount > 0) {
      setShowConfirm(true);
    }
  };

  const confirmAdd = () => {
    const numAmount = parseFloat(amount.replace(/,/g, ''));
    const finalAmount = isNegative ? -numAmount : numAmount;
    onAdd(finalAmount, memo || undefined);
    setAmount('');
    setMemo('');
    setIsNegative(false);
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

  const getNewTotal = () => {
    const numAmount = parseFloat(amount.replace(/,/g, '')) || 0;
    const change = isNegative ? -numAmount : numAmount;
    return Math.max(0, tree.currentAmount + change);
  };

  return (
    <div className="amount-input-container">
      {/* 現在の資産表示 */}
      <div className="current-amount-display">
        <span className="label">現在の資産</span>
        <span className="value">¥{tree.currentAmount.toLocaleString()}</span>
      </div>

      <form onSubmit={handleSubmit}>
        {/* プラス/マイナス切り替え */}
        <div className="sign-toggle">
          <button
            type="button"
            className={`sign-btn ${!isNegative ? 'active plus' : ''}`}
            onClick={() => setIsNegative(false)}
          >
            ＋ 増やす
          </button>
          <button
            type="button"
            className={`sign-btn ${isNegative ? 'active minus' : ''}`}
            onClick={() => setIsNegative(true)}
          >
            － 減らす
          </button>
        </div>

        <div className="input-group">
          <label htmlFor="amount">{isNegative ? '減らす金額' : '増やす金額'}</label>
          <div className={`amount-wrapper ${isNegative ? 'negative' : 'positive'}`}>
            <span className="currency">{isNegative ? '−¥' : '+¥'}</span>
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
            placeholder={isNegative ? "例: 出費" : "例: 配当金、給料"}
          />
        </div>

        <button type="submit" className={`update-button ${isNegative ? 'negative' : ''}`}>
          {isNegative ? '💸 支出を記録' : '💰 入金を記録'}
        </button>
      </form>

      {/* 確認ダイアログ */}
      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-dialog">
            <h3>{isNegative ? '支出を記録しますか？' : '入金を記録しますか？'}</h3>
            <p className={`confirm-amount ${isNegative ? 'negative' : 'positive'}`}>
              {isNegative ? '−' : '+'}¥{parseFloat(amount.replace(/,/g, '')).toLocaleString()}
            </p>
            <p className="confirm-new-total">
              更新後: ¥{getNewTotal().toLocaleString()}
            </p>
            {memo && <p className="confirm-memo">メモ: {memo}</p>}
            <div className="confirm-buttons">
              <button onClick={() => setShowConfirm(false)} className="cancel-btn">
                キャンセル
              </button>
              <button onClick={confirmAdd} className={`confirm-btn ${isNegative ? 'negative' : ''}`}>
                記録する
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
