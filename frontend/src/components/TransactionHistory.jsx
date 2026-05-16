import { useEffect, useMemo, useState } from 'react';
import { Search, Pencil, Trash2, Loader2 } from 'lucide-react';
import { transacaoService } from '../services/api';
import { CATEGORIAS, formatCurrency, formatDate } from '../utils/constants';

export default function TransactionHistory({ refreshKey, onEdit, onRefresh }) {
  const [loading, setLoading] = useState(true);
  const [transacoes, setTransacoes] = useState([]);
  const [busca, setBusca] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await transacaoService.getAll();
        setTransacoes(res.data || []);
      } catch {
        setTransacoes([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [refreshKey]);

  const filtradas = useMemo(() => {
    return transacoes.filter((t) => {
      const matchBusca = !busca || t.descricao.toLowerCase().includes(busca.toLowerCase());
      const matchTipo = !filtroTipo || t.tipo === filtroTipo;
      const matchCat = !filtroCategoria || t.categoria === filtroCategoria;
      return matchBusca && matchTipo && matchCat;
    });
  }, [transacoes, busca, filtroTipo, filtroCategoria]);

  const handleDelete = async (id) => {
    if (!window.confirm('Deseja excluir esta transação?')) return;
    try {
      await transacaoService.delete(id);
      onRefresh();
    } catch {
      alert('Erro ao excluir transação');
    }
  };

  const inputClass =
    'rounded-xl border border-white/10 bg-slate-800/80 px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50';

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin mr-3" />
        Carregando histórico...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Histórico de transações</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Buscar por descrição..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className={`${inputClass} w-full pl-10`}
          />
        </div>
        <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)} className={inputClass}>
          <option value="">Todos os tipos</option>
          <option value="Receita">Receitas</option>
          <option value="Despesa">Despesas</option>
        </select>
        <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)} className={inputClass}>
          <option value="">Todas as categorias</option>
          {CATEGORIAS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-900/50 overflow-hidden">
        {filtradas.length === 0 ? (
          <p className="p-8 text-center text-slate-500">Nenhuma transação encontrada.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 text-left">
                  <th className="px-4 py-3 font-medium">Descrição</th>
                  <th className="px-4 py-3 font-medium">Categoria</th>
                  <th className="px-4 py-3 font-medium">Data</th>
                  <th className="px-4 py-3 font-medium">Tipo</th>
                  <th className="px-4 py-3 font-medium text-right">Valor</th>
                  <th className="px-4 py-3 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtradas.map((t) => (
                  <tr key={t.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-white">{t.descricao}</td>
                    <td className="px-4 py-3 text-slate-400">{t.categoria}</td>
                    <td className="px-4 py-3 text-slate-400">{formatDate(t.data)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                          t.tipo === 'Receita'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-rose-500/20 text-rose-400'
                        }`}
                      >
                        {t.tipo}
                      </span>
                    </td>
                    <td className={`px-4 py-3 text-right font-medium ${t.tipo === 'Receita' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {formatCurrency(t.valor)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => onEdit(t)}
                          className="p-2 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                          title="Editar"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(t.id)}
                          className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
