import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Wallet, Hash, Plus, Loader2 } from 'lucide-react';
import { transacaoService } from '../services/api';
import { formatCurrency, formatDate } from '../utils/constants';
import StatCard from './StatCard';

export default function Dashboard({ refreshKey, onNew }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [transacoes, setTransacoes] = useState([]);
  const [resumo, setResumo] = useState(null);
  const [categorias, setCategorias] = useState({});

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const [listRes, catRes] = await Promise.all([
          transacaoService.getAll(),
          transacaoService.resumoCategorias(),
        ]);
        setTransacoes(listRes.data || []);
        setResumo(listRes.resumo);
        setCategorias(catRes.data || {});
      } catch {
        setError('Não foi possível carregar os dados. Verifique se o backend está rodando.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [refreshKey]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin mr-3" />
        Carregando resumo...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6 text-rose-300 text-center">
        {error}
      </div>
    );
  }

  const ultimas = transacoes.slice(0, 5);
  const categoriasOrdenadas = Object.entries(categorias).sort((a, b) => Math.abs(b[1].total) - Math.abs(a[1].total));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Resumo financeiro</h2>
        <button
          onClick={onNew}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nova transação
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Receitas" value={formatCurrency(resumo?.totalReceitas)} icon={TrendingUp} variant="receita" />
        <StatCard title="Despesas" value={formatCurrency(resumo?.totalDespesas)} icon={TrendingDown} variant="despesa" />
        <StatCard title="Saldo" value={formatCurrency(resumo?.saldo)} icon={Wallet} variant="saldo" />
        <StatCard title="Transações" value={transacoes.length} icon={Hash} variant="default" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Por categoria</h3>
          {categoriasOrdenadas.length === 0 ? (
            <p className="text-slate-500 text-sm">Nenhuma transação cadastrada.</p>
          ) : (
            <ul className="space-y-3">
              {categoriasOrdenadas.map(([nome, dados]) => (
                <li key={nome} className="flex items-center justify-between text-sm">
                  <span className="text-slate-300">{nome}</span>
                  <span className={dados.total >= 0 ? 'text-emerald-400 font-medium' : 'text-rose-400 font-medium'}>
                    {formatCurrency(dados.total)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Últimas transações</h3>
          {ultimas.length === 0 ? (
            <p className="text-slate-500 text-sm">Nenhuma transação recente.</p>
          ) : (
            <ul className="space-y-3">
              {ultimas.map((t) => (
                <li key={t.id} className="flex items-center justify-between gap-3 text-sm border-b border-white/5 pb-3 last:border-0 last:pb-0">
                  <div className="min-w-0">
                    <p className="text-white truncate">{t.descricao}</p>
                    <p className="text-slate-500 text-xs">{formatDate(t.data)} · {t.categoria}</p>
                  </div>
                  <span className={t.tipo === 'Receita' ? 'text-emerald-400 font-medium shrink-0' : 'text-rose-400 font-medium shrink-0'}>
                    {t.tipo === 'Receita' ? '+' : '-'}{formatCurrency(t.valor)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
