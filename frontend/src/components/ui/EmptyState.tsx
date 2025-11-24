interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
}

export function EmptyState({ icon = '📭', title, description }: EmptyStateProps) {
  return (
    <div className="card" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-md)',
      padding: 'var(--space-2xl)',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: '3rem' }}>{icon}</div>
      <h3>{title}</h3>
      {description && <p style={{ color: 'var(--text-muted)' }}>{description}</p>}
    </div>
  );
}

