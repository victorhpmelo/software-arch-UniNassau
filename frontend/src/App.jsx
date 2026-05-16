import { useState } from 'react';
import { LayoutDashboard, PlusCircle, History, Wallet } from 'lucide-react';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionHistory from './components/TransactionHistory';

const PAGES = {
  resumo: { label: 'Resumo', icon: LayoutDashboard },
  novo: { label: 'Nova transação', icon: PlusCircle },
  historico: { label: 'Histórico', icon: History },
};

export default function App() {
  const [page, setPage] = useState('resumo');
  const [editing, setEditing] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => setRefreshKey((k) => k + 1);

  const handleEdit = (transacao) => {
    setEditing(transacao);
    setPage('novo');
  };

  const handleSuccess = () => {
    setEditing(null);
    refresh();
    setPage('resumo');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950">
      <header className="border-b border-white/10 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">FinanJovem</h1>
              <p className="text-xs text-slate-400">Controle financeiro para jovens empreendedores</p>
            </div>
          </div>
          <nav className="flex gap-1 p-1 rounded-xl bg-slate-800/80">
            {Object.entries(PAGES).map(([key, { label, icon: Icon }]) => (
              <button
                key={key}
                onClick={() => {
                  if (key === 'novo') setEditing(null);
                  setPage(key);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  page === key
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {page === 'resumo' && <Dashboard refreshKey={refreshKey} onNew={() => { setEditing(null); setPage('novo'); }} />}
        {page === 'novo' && (
          <TransactionForm
            editing={editing}
            onSuccess={handleSuccess}
            onCancel={() => { setEditing(null); setPage('resumo'); }}
          />
        )}
        {page === 'historico' && (
          <TransactionHistory refreshKey={refreshKey} onEdit={handleEdit} onRefresh={refresh} />
        )}
      </main>
    </div>
  );
}
