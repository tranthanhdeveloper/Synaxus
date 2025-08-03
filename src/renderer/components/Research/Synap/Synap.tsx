import React from 'react';

interface SynapProps {
  title: string;
  color?: string;
  children?: React.ReactNode;
}

export default function Synap({ title, color = '#4F8A8B', children }: SynapProps) {
  return (
    <div
      style={{
        borderRadius: 8,
        padding: '16px',
        background: color,
        color: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        minWidth: 180,
        maxWidth: 320,
      }}
    >
      <div style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>{title}</div>
      <div>{children}</div>
    </div>
  );
}
