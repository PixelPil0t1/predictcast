import { useState } from 'react';
import { useCreateEvent } from '@hooks/useEvents';
import { validateEventTitle, validateOptions, validateClosingDate } from '@utils/validators';
import { CATEGORIES } from '@config/constants';

export function CreateEventPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [optionsText, setOptionsText] = useState('');
  const [days, setDays] = useState('7');
  const [category, setCategory] = useState('general');
  const [apiKey, setApiKey] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const createEvent = useCreateEvent();
  const creatorAddress = '0xCreator'; // From wallet

  const handleSubmit = async () => {
    setErrors({});
    
    const titleError = validateEventTitle(title);
    if (titleError) {
      setErrors(prev => ({ ...prev, title: titleError }));
      return;
    }

    const options = optionsText.split('\n').map(s => s.trim()).filter(Boolean);
    const optionsError = validateOptions(options);
    if (optionsError) {
      setErrors(prev => ({ ...prev, options: optionsError }));
      return;
    }

    const closesAt = Date.now() + parseInt(days) * 24 * 60 * 60 * 1000;
    const dateError = validateClosingDate(closesAt);
    if (dateError) {
      setErrors(prev => ({ ...prev, date: dateError }));
      return;
    }

    if (!apiKey) {
      setErrors(prev => ({ ...prev, apiKey: 'API key is required' }));
      return;
    }

    try {
      await createEvent.mutateAsync({
        data: { title, description, options, closesAt, creatorAddress, category },
        apiKey,
      });
      alert('✅ Event created!');
      setTitle('');
      setDescription('');
      setOptionsText('');
      setDays('7');
      setApiKey('');
    } catch (error: any) {
      alert('❌ ' + error.message);
    }
  };

  return (
    <div className="card fade-in">
      <h2 style={{marginBottom:'var(--space-lg)'}}>Create New Event</h2>
      
      <div style={{display:'flex',flexDirection:'column',gap:'var(--space-md)'}}>
        <div>
          <label style={{display:'block',marginBottom:'var(--space-xs)',fontSize:'0.875rem',fontWeight:500}}>
            Event Title *
          </label>
          <input
            className="input"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g., Will Bitcoin reach $100k in 2025?"
          />
          {errors.title && <p style={{color:'var(--accent-danger)',fontSize:'0.75rem',marginTop:'var(--space-xs)'}}>{errors.title}</p>}
        </div>

        <div>
          <label style={{display:'block',marginBottom:'var(--space-xs)',fontSize:'0.875rem',fontWeight:500}}>
            Description (optional)
          </label>
          <textarea
            className="textarea"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Additional information..."
            rows={3}
          />
        </div>

        <div>
          <label style={{display:'block',marginBottom:'var(--space-xs)',fontSize:'0.875rem',fontWeight:500}}>
            Category
          </label>
          <select className="select" value={category} onChange={e => setCategory(e.target.value)}>
            {CATEGORIES.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{display:'block',marginBottom:'var(--space-xs)',fontSize:'0.875rem',fontWeight:500}}>
            Answer Options * (one per line)
          </label>
          <textarea
            className="textarea"
            value={optionsText}
            onChange={e => setOptionsText(e.target.value)}
            placeholder="Yes\nNo\nMaybe"
            rows={5}
          />
          {errors.options && <p style={{color:'var(--accent-danger)',fontSize:'0.75rem',marginTop:'var(--space-xs)'}}>{errors.options}</p>}
        </div>

        <div>
          <label style={{display:'block',marginBottom:'var(--space-xs)',fontSize:'0.875rem',fontWeight:500}}>
            Days Until Closing
          </label>
          <input
            type="number"
            className="input"
            value={days}
            onChange={e => setDays(e.target.value)}
            min="1"
            max="365"
          />
          {errors.date && <p style={{color:'var(--accent-danger)',fontSize:'0.75rem',marginTop:'var(--space-xs)'}}>{errors.date}</p>}
        </div>

        <div>
          <label style={{display:'block',marginBottom:'var(--space-xs)',fontSize:'0.875rem',fontWeight:500}}>
            API Key * (admins only)
          </label>
          <input
            type="password"
            className="input"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            placeholder="Enter API key"
          />
          {errors.apiKey && <p style={{color:'var(--accent-danger)',fontSize:'0.75rem',marginTop:'var(--space-xs)'}}>{errors.apiKey}</p>}
        </div>

        <button
          className="btn btn-success"
          onClick={handleSubmit}
          disabled={createEvent.isPending}
          style={{width:'100%',marginTop:'var(--space-sm)'}}
        >
          {createEvent.isPending ? 'Creating...' : 'Create Event'}
        </button>
      </div>

      <div style={{marginTop:'var(--space-lg)',padding:'var(--space-md)',background:'var(--bg-secondary)',borderRadius:'var(--radius-md)'}}>
        <p style={{fontSize:'0.75rem',color:'var(--text-muted)'}}>
          💡 Only users with an API key can create events
        </p>
      </div>
    </div>
  );
}
