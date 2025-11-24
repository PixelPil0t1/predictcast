import { useUserPredictions } from '@hooks/usePredictions';
import { useUserStats } from '@hooks/useStats';
import { LoadingSpinner } from '@components/ui/LoadingSpinner';
import { EmptyState } from '@components/ui/EmptyState';
import { formatDateTime } from '@utils/formatters';

export function MyPredictionsPage() {
  const userAddress = 'user:demo'; // З гаманця
  const { data: predictions, isLoading } = useUserPredictions(userAddress);
  const { data: stats } = useUserStats(userAddress);

  if (isLoading) return <LoadingSpinner message="Завантаження прогнозів..." />;
  
  if (!predictions || predictions.length === 0) {
    return (
      <EmptyState
        icon="🎯"
        title="У вас ще немає прогнозів"
        description="Перейдіть на вкладку 'Події' щоб зробити перший прогноз!"
      />
    );
  }

  return (
    <div className="fade-in">
      {stats && (
        <div className="card" style={{marginBottom:'var(--space-lg)'}}>
          <h3 style={{marginBottom:'var(--space-md)'}}>📊 Ваша статистика</h3>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))',gap:'var(--space-md)'}}>
            <div>
              <p style={{fontSize:'0.75rem',color:'var(--text-muted)',marginBottom:'var(--space-xs)'}}>Всього прогнозів</p>
              <p style={{fontSize:'1.5rem',fontWeight:'bold'}}>{stats.totalPredictions}</p>
            </div>
            <div>
              <p style={{fontSize:'0.75rem',color:'var(--text-muted)',marginBottom:'var(--space-xs)'}}>Правильних</p>
              <p style={{fontSize:'1.5rem',fontWeight:'bold',color:'var(--accent-secondary)'}}>{stats.correctPredictions}</p>
            </div>
            <div>
              <p style={{fontSize:'0.75rem',color:'var(--text-muted)',marginBottom:'var(--space-xs)'}}>Точність</p>
              <p style={{fontSize:'1.5rem',fontWeight:'bold',color:stats.accuracy >= 50 ? 'var(--accent-secondary)' : 'var(--accent-warning)'}}>
                {stats.accuracy}%
              </p>
            </div>
          </div>
        </div>
      )}

      <h2 style={{marginBottom:'var(--space-lg)'}}>Мої прогнози</h2>
      
      <div style={{display:'flex',flexDirection:'column',gap:'var(--space-md)'}}>
        {predictions.map(pred => {
          const isCorrect = pred.finalResult && pred.finalResult === pred.selectedOption;
          const isWrong = pred.finalResult && pred.finalResult !== pred.selectedOption;
          
          return (
            <div key={pred.eventId} className="card">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'start',marginBottom:'var(--space-sm)'}}>
                <h3 style={{margin:0,flex:1}}>{pred.title}</h3>
                <span className={`badge ${pred.isActive ? 'badge-success' : 'badge-neutral'}`}>
                  {pred.isActive ? 'Активна' : 'Завершено'}
                </span>
              </div>

              <div style={{display:'flex',gap:'var(--space-md)',flexWrap:'wrap',fontSize:'0.875rem',color:'var(--text-muted)'}}>
                <span>🔮 Прогноз: <b style={{color:'var(--text-primary)'}}>{pred.selectedOption}</b></span>
                <span>📅 {formatDateTime(pred.predictedAt)}</span>
              </div>

              {!pred.isActive && pred.finalResult && (
                <div style={{
                  marginTop:'var(--space-md)',
                  padding:'var(--space-md)',
                  background:'var(--bg-secondary)',
                  borderRadius:'var(--radius-md)',
                  border:`1px solid ${isCorrect ? 'var(--accent-secondary)' : 'var(--accent-danger)'}`
                }}>
                  <p style={{margin:0,fontSize:'0.875rem'}}>
                    <b>Результат:</b> {pred.finalResult}
                    {isCorrect && <span style={{color:'var(--accent-secondary)',marginLeft:'var(--space-sm)'}}>✅ Правильно!</span>}
                    {isWrong && <span style={{color:'var(--accent-danger)',marginLeft:'var(--space-sm)'}}>❌ Неправильно</span>}
                  </p>
                </div>
              )}

              {pred.isActive && pred.closesAt && (
                <p style={{marginTop:'var(--space-sm)',fontSize:'0.75rem',color:'var(--text-muted)'}}>
                  Завершується: {formatDateTime(pred.closesAt)}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

