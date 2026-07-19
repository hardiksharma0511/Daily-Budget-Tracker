import React, { useState } from 'react';

// Soft, modern color palette
const colors = {
  bg: '#f8fafc', // Very pale blue/white background
  cardBg: '#ffffff', // Clean white card
  textPrimary: '#1e293b', // Dark slate for titles
  textSecondary: '#64748b', // Lighter slate for descriptions
  border: '#e2e8f0', // Soft grey border
  accent: '#6366f1', // Indigo accent for link styling
  income: '#10b981', // Crisp green
  expense: '#ef4444', // Gentle red
};

export default function App() {
  // 1. Fresh Data State - Starts completely empty (0 items)
  const [transactions, setTransactions] = useState([]);

  // Form State
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');

  // 2. Calculation Logic
  const income = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income + expenses;

  // 3. User Actions
  const handleAdd = (type) => {
    if (!text || !amount) {
      alert("Please fill in both the label and the amount.");
      return;
    }

    let parsedAmount = parseFloat(amount);
    
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
        alert("Please enter a valid, positive number for the amount.");
        return;
    }

    // Handles negative sign generation automatically based on button choice
    const transactionAmount = type === 'expense' ? -parsedAmount : parsedAmount;

    const newTransaction = {
      id: Date.now(),
      text: text,
      amount: transactionAmount
    };

    setTransactions([...transactions, newTransaction]);
    setText('');
    setAmount('');
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: colors.bg,
      color: colors.textPrimary,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '500px',
        margin: '40px auto',
        padding: '30px',
        backgroundColor: colors.cardBg,
        borderRadius: '16px',
        border: `1px solid ${colors.border}`,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
      }}>
        
        {/* Header and Balance */}
        <header style={{ marginBottom: '30px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 10px 0' }}>Daily Budget Tracker</h1>
          <p style={{ color: colors.textSecondary, margin: '0 0 20px 0', fontSize: '15px' }}>Simple overview of your 'Money In' and 'Money Out'.</p>
          
          <div style={{
            display: 'inline-block',
            padding: '10px 20px',
            background: colors.bg,
            borderRadius: '99px',
            border: `1px solid ${colors.border}`
          }}>
            <span style={{ color: colors.textSecondary, fontSize: '14px', fontWeight: '500' }}>Current Balance: </span>
            <span style={{ fontSize: '20px', fontWeight: '700', color: colors.textPrimary }}>
              ${balance.toFixed(2)}
            </span>
          </div>
        </header>

        {/* Overview Summary Dashboard */}
        <section style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
          {/* Income Display */}
          <div style={{
            flex: 1,
            padding: '20px',
            background: '#ecfdf5',
            borderRadius: '12px',
            textAlign: 'center',
            border: `1px solid #a7f3d0`
          }}>
            <strong style={{ display: 'block', color: colors.income, fontSize: '14px', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Income</strong>
            <div style={{ fontSize: '24px', fontWeight: '700', color: colors.income }}>+${income.toFixed(2)}</div>
          </div>

          {/* Expense Display */}
          <div style={{
            flex: 1,
            padding: '20px',
            background: '#fef2f2',
            borderRadius: '12px',
            textAlign: 'center',
            border: `1px solid #fecaca`
          }}>
            <strong style={{ display: 'block', color: colors.expense, fontSize: '14px', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Expenses</strong>
            <div style={{ fontSize: '24px', fontWeight: '700', color: colors.expense }}>-${Math.abs(expenses).toFixed(2)}</div>
          </div>
        </section>

        {/* Input Interface */}
        <section style={{
          padding: '20px',
          background: colors.bg,
          borderRadius: '12px',
          border: `1px solid ${colors.border}`,
          marginBottom: '30px'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 15px 0', textAlign: 'center' }}>Add a New Entry</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input 
              type="text" 
              placeholder="e.g., Weekly Groceries or Salary" 
              value={text} 
              onChange={(e) => setText(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 15px',
                borderRadius: '8px',
                border: `1px solid ${colors.border}`,
                boxSizing: 'border-box',
                fontSize: '15px'
              }}
            />
            <input 
              type="number" 
              placeholder="Enter amount (e.g., 50.00)" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 15px',
                borderRadius: '8px',
                border: `1px solid ${colors.border}`,
                boxSizing: 'border-box',
                fontSize: '15px'
              }}
            />
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => handleAdd('income')} 
                style={{
                  flex: 1,
                  padding: '12px',
                  background: colors.income,
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '15px'
                }}
              >
                + Add Income
              </button>
              <button 
                onClick={() => handleAdd('expense')} 
                style={{
                  flex: 1,
                  padding: '12px',
                  background: colors.expense,
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '15px'
                }}
              >
                - Add Expense
              </button>
            </div>
          </div>
        </section>

        {/* Activity Feed Log */}
        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 15px 0', color: colors.textSecondary }}>Recent Activity</h3>
          {transactions.length === 0 ? (
            <p style={{ textAlign: 'center', color: colors.textSecondary, fontSize: '14px', fontStyle: 'italic', margin: '20px 0' }}>
              No transactions logged yet. Add your first transaction above!
            </p>
          ) : (
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {transactions.map((t) => {
                const isIncome = t.amount > 0;
                return (
                  <li 
                    key={t.id} 
                    style={{
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      padding: '12px 15px', 
                      background: colors.cardBg,
                      border: `1px solid ${colors.border}`,
                      borderRadius: '8px',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '4px',
                      background: isIncome ? colors.income : colors.expense
                    }} />
                    
                    <span style={{ fontSize: '15px', fontWeight: '500', color: colors.textPrimary, paddingLeft: '8px' }}>{t.text}</span>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ 
                        fontSize: '15px', 
                        fontWeight: '600', 
                        color: isIncome ? colors.income : colors.expense 
                      }}>
                        {isIncome ? '+' : '-'}${Math.abs(t.amount).toFixed(2)}
                      </span>
                      <button 
                        onClick={() => handleDelete(t.id)} 
                        style={{ 
                          background: 'none', 
                          color: colors.textSecondary, 
                          border: `1px solid ${colors.border}`, 
                          borderRadius: '4px', 
                          cursor: 'pointer',
                          padding: '2px 6px',
                          fontSize: '11px'
                        }}
                      >
                        &#x2715;
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* Custom Application Footer Profile Wrapper */}
        <footer style={{
          marginTop: '40px',
          paddingTop: '20px',
          borderTop: `1px solid ${colors.border}`,
          textAlign: 'center',
          fontSize: '13px',
          color: colors.textSecondary
        }}>
          <p style={{ margin: '0 0 5px 0' }}>Created by <strong>Hardik Sharma</strong></p>
          <a 
            href="https://github.com/hardiksharma0511" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              color: colors.accent, 
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            github.com/hardiksharma0511
          </a>
        </footer>

      </div>
    </div>
  );
}