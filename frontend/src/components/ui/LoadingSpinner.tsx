interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message = 'Завантаження...' }: LoadingSpinnerProps) {
  return (
    <div className="card" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-md)',
      padding: 'var(--space-2xl)',
    }}>
      <div className="spinner" />
      <p style={{ color: 'var(--text-muted)' }}>{message}</p>
    </div>
  );
}

