interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <nav style={{
      display: 'flex',
      gap: 'var(--space-sm)',
      marginBottom: 'var(--space-lg)',
    }}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}

