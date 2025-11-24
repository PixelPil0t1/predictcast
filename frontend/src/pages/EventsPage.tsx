import { useState } from 'react';
import { useEvents } from '@hooks/useEvents';
import { useEventStats } from '@hooks/useStats';
import { useCreatePrediction } from '@hooks/usePredictions';
import { LoadingSpinner } from '@components/ui/LoadingSpinner';
import { EmptyState } from '@components/ui/EmptyState';
import { formatDateTime, timeUntil } from '@utils/formatters';
import type { Event } from '@services/eventService';

export function EventsPage() {
  const { data: events, isLoading } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedOption, setSelectedOption] = useState('');
  const { data: stats } = useEventStats(selectedEvent?.id || null);
  const createPrediction = useCreatePrediction();
  const userAddress = 'user:demo'; // З гаманця в реальному додатку

  const handlePredict = async () => {
    if (!selectedEvent || !selectedOption) return;
    
    try {
      await createPrediction.mutateAsync({
        eventId: selectedEvent.id,
        userAddress,
        selectedOption,
      });
      alert('✅ Прогноз збережено!');
    } catch (error: any) {
      alert('❌ ' + error.message);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (!events || events.length === 0) {
    return <EmptyState icon="🎯" title="Немає активних подій" description="Перевірте пізніше" />;
  }

  if (selectedEvent) {
    const timeLeft = timeUntil(selectedEvent.closesAt);
    
    return (
      <div className="fade-in">
        <button className="btn btn-secondary" onClick={() => setSelectedEvent(null)} style={{marginBottom:'var(--space-lg)'}}>
          ← Назад до списку
        </button>
        
        <div className="card">
          <div style={{marginBottom:'var(--space-lg)'}}>
            <h2>{selectedEvent.title}</h2>
            {selectedEvent.description && (
              <p style={{color:'var(--text-muted)',marginTop:'var(--space-sm)'}}>{selectedEvent.description}</p>
            )}
            <div style={{display:'flex',gap:'var(--space-md)',marginTop:'var(--space-md)',flexWrap:'wrap'}}>
              <span className={`badge ${selectedEvent.isActive ? 'badge-success' : 'badge-neutral'}`}>
                {selectedEvent.isActive ? 'Активна' : 'Закрита'}
              </span>
              <span style={{fontSize:'0.875rem',color:'var(--text-muted)'}}>
                ⏰ {timeLeft}
              </span>
              <span style={{fontSize:'0.875rem',color:'var(--text-muted)'}}>
                📅 {formatDateTime(selectedEvent.closesAt)}
              </span>
            </div>
          </div>

          <h3 style={{marginBottom:'var(--space-md)'}}>Оберіть відповідь:</h3>
          <div style={{display:'flex',flexDirection:'column',gap:'var(--space-sm)'}}>
            {selectedEvent.options.map(option => (
              <div
                key={option}
                onClick={() => setSelectedOption(option)}
                style={{
                  padding: 'var(--space-md)',
                  border: `2px solid ${selectedOption === option ? 'var(--accent-secondary)' : 'var(--border-accent)'}`,
                  borderRadius: 'var(--radius-md)',
                  background: selectedOption === option ? 'rgba(16,185,129,0.1)' : 'var(--bg-hover)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-normal)',
                }}
              >
                {option}
                {stats?.breakdown.find(b => b.option === option) && (
                  <span style={{float:'right',color:'var(--text-muted)',fontSize:'0.875rem'}}>
                    {stats.breakdown.find(b => b.option === option)?.percentage}%
                  </span>
                )}
              </div>
            ))}
          </div>

          <button
            className="btn btn-success"
            onClick={handlePredict}
            disabled={!selectedOption || !selectedEvent.isActive}
            style={{marginTop:'var(--space-lg)',width:'100%'}}
          >
            Зберегти прогноз
          </button>

          {stats && stats.total > 0 && (
            <div style={{marginTop:'var(--space-lg)',padding:'var(--space-md)',background:'var(--bg-secondary)',borderRadius:'var(--radius-md)'}}>
              <h4 style={{marginBottom:'var(--space-sm)'}}>Статистика:</h4>
              <p style={{fontSize:'0.875rem',color:'var(--text-muted)'}}>
                Всього прогнозів: <b style={{color:'var(--text-primary)'}}>{stats.total}</b>
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <h2 style={{marginBottom:'var(--space-lg)'}}>Активні події</h2>
      <div style={{display:'flex',flexDirection:'column',gap:'var(--space-md)'}}>
        {events.map(event => (
          <div
            key={event.id}
            className="card"
            onClick={() => setSelectedEvent(event)}
            style={{cursor:'pointer'}}
          >
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'start'}}>
              <div style={{flex:1}}>
                <h3 style={{marginBottom:'var(--space-sm)'}}>{event.title}</h3>
                {event.description && (
                  <p style={{color:'var(--text-muted)',fontSize:'0.875rem'}}>{event.description}</p>
                )}
                <div style={{display:'flex',gap:'var(--space-md)',marginTop:'var(--space-sm)',flexWrap:'wrap'}}>
                  <span style={{fontSize:'0.75rem',color:'var(--text-muted)'}}>
                    ⏰ {timeUntil(event.closesAt)}
                  </span>
                  <span style={{fontSize:'0.75rem',color:'var(--text-muted)'}}>
                    📊 {event.category}
                  </span>
                </div>
              </div>
              <span className={`badge ${event.isActive ? 'badge-success' : 'badge-neutral'}`}>
                {event.isActive ? 'Активна' : 'Закрита'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

