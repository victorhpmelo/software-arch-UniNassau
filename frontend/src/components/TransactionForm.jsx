import { useEffect, useState } from 'react';
import { Save, X, Loader2 } from 'lucide-react';
import { transacaoService } from '../services/api';
import { CATEGORIAS } from '../utils/constants';

const emptyForm = () => ({
  descricao: '',
  valor: '',
  tipo: 'Receita',
  categoria: '',
  data: new Date().toISOString().split('T')[0],
  observacoes: '',
});

export default function TransactionForm({ editing, onSuccess, onCancel }) {
  const [form, setForm] = useState(emptyForm());
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    if (editing) {
      setForm({
        descricao: editing.descricao,
        valor: String(editing.valor),
        tipo: editing.tipo,
        categoria: editing.categoria,
        data: editing.data,
        observacoes: editing.observacoes || '',
      });
    } else {
      setForm(emptyForm());
    }
  }, [editing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'tipo' ? { categoria: '' } : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    const payload = {
      ...form,
      valor: parseFloat(form.valor),
    };

    try {
      if (editing) {
        await transacaoService.update(editing.id, payload);
        setMessage({ text: 'Transação atualizada com sucesso!', type: 'success' });
      } else {
        await transacaoService.create(payload);
        setMessage({ text: 'Transação criada com sucesso!', type: 'success' });
      }
      setTimeout(() => onSuccess(), 1200);
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || 'Erro ao salvar transação',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full rounded-xl border border-white/10 bg-slate-800/80 px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition';

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">
        {editing ? 'Editar transação' : 'Nova transação'}
      </h2>

      {message.text && (
        <div
          className={`mb-4 rounded-xl px-4 py-3 text-sm ${
            message.type === 'success'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-white/10 bg-slate-900/50 p-6">
        <div>
          <label className="block text-sm text-slate-400 mb-1.5">Descrição *</label>
          <input
            type="text"
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="Ex: Venda de artesanato"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Valor (R$) *</label>
            <input
              type="number"
              name="valor"
              step="0.01"
              min="0.01"
              value={form.valor}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="0,00"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Tipo *</label>
            <select name="tipo" value={form.tipo} onChange={handleChange} required className={inputClass}>
              <option value="Receita">Receita (entrada)</option>
              <option value="Despesa">Despesa (saída)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Categoria *</label>
            <select name="categoria" value={form.categoria} onChange={handleChange} required className={inputClass}>
              <option value="">Selecione...</option>
              {CATEGORIAS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Data *</label>
            <input type="date" name="data" value={form.data} onChange={handleChange} required className={inputClass} />
          </div>
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1.5">Observações</label>
          <textarea
            name="observacoes"
            value={form.observacoes}
            onChange={handleChange}
            rows={3}
            className={inputClass}
            placeholder="Informações adicionais (opcional)"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white font-medium transition-colors"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {editing ? 'Atualizar' : 'Salvar'}
          </button>
          {(editing || onCancel) && (
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
