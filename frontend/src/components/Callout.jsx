const CALLOUT_STYLES = {
  note: { border: '#448aff', bg: 'rgba(68,130,255,0.08)', icon: 'ℹ️', color: '#448aff' },
  abstract: { border: '#00bcd4', bg: 'rgba(0,188,212,0.08)', icon: '📋', color: '#00bcd4' },
  summary: { border: '#00bcd4', bg: 'rgba(0,188,212,0.08)', icon: '📋', color: '#00bcd4' },
  tldr: { border: '#00bcd4', bg: 'rgba(0,188,212,0.08)', icon: '📋', color: '#00bcd4' },
  info: { border: '#2196f3', bg: 'rgba(33,150,243,0.08)', icon: 'ℹ️', color: '#2196f3' },
  todo: { border: '#2196f3', bg: 'rgba(33,150,243,0.08)', icon: '☑️', color: '#2196f3' },
  tip: { border: '#4caf50', bg: 'rgba(76,175,80,0.08)', icon: '🔥', color: '#4caf50' },
  hint: { border: '#4caf50', bg: 'rgba(76,175,80,0.08)', icon: '🔥', color: '#4caf50' },
  important: { border: '#4caf50', bg: 'rgba(76,175,80,0.08)', icon: '🔥', color: '#4caf50' },
  success: { border: '#4caf50', bg: 'rgba(76,175,80,0.08)', icon: '✅', color: '#4caf50' },
  check: { border: '#4caf50', bg: 'rgba(76,175,80,0.08)', icon: '✅', color: '#4caf50' },
  done: { border: '#4caf50', bg: 'rgba(76,175,80,0.08)', icon: '✅', color: '#4caf50' },
  question: { border: '#ff9800', bg: 'rgba(255,152,0,0.08)', icon: '❓', color: '#ff9800' },
  help: { border: '#ff9800', bg: 'rgba(255,152,0,0.08)', icon: '❓', color: '#ff9800' },
  faq: { border: '#ff9800', bg: 'rgba(255,152,0,0.08)', icon: '❓', color: '#ff9800' },
  warning: { border: '#ff9800', bg: 'rgba(255,152,0,0.08)', icon: '⚠️', color: '#ff9800' },
  caution: { border: '#ff9800', bg: 'rgba(255,152,0,0.08)', icon: '⚠️', color: '#ff9800' },
  attention: { border: '#ff9800', bg: 'rgba(255,152,0,0.08)', icon: '⚠️', color: '#ff9800' },
  failure: { border: '#f44336', bg: 'rgba(244,67,54,0.08)', icon: '❌', color: '#f44336' },
  fail: { border: '#f44336', bg: 'rgba(244,67,54,0.08)', icon: '❌', color: '#f44336' },
  missing: { border: '#f44336', bg: 'rgba(244,67,54,0.08)', icon: '❌', color: '#f44336' },
  danger: { border: '#f44336', bg: 'rgba(244,67,54,0.08)', icon: '⚡', color: '#f44336' },
  error: { border: '#f44336', bg: 'rgba(244,67,54,0.08)', icon: '⚡', color: '#f44336' },
  bug: { border: '#f44336', bg: 'rgba(244,67,54,0.08)', icon: '🐛', color: '#f44336' },
  example: { border: '#9c27b0', bg: 'rgba(156,39,176,0.08)', icon: '📝', color: '#9c27b0' },
  quote: { border: '#9e9e9e', bg: 'rgba(158,158,158,0.08)', icon: '💬', color: '#9e9e9e' },
  cite: { border: '#9e9e9e', bg: 'rgba(158,158,158,0.08)', icon: '💬', color: '#9e9e9e' },
};

export default function Callout({ type, children }) {
  const s = CALLOUT_STYLES[type] || CALLOUT_STYLES.note;

  return (
    <div
      style={{
        borderLeft: `3px solid ${s.border}`,
        backgroundColor: s.bg,
        borderRadius: '8px',
        padding: '12px 16px',
        margin: '16px 0',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
        <span style={{ color: s.color, fontWeight: 700, flexShrink: 0, lineHeight: 1.6 }}>
          {s.icon}
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
