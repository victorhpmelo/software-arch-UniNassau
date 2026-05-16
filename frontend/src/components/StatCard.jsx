export default function StatCard({ title, value, icon: Icon, variant = 'default' }) {
  const variants = {
    receita: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/30 text-emerald-400',
    despesa: 'from-rose-500/20 to-rose-600/5 border-rose-500/30 text-rose-400',
    saldo: 'from-blue-500/20 to-blue-600/5 border-blue-500/30 text-blue-400',
    default: 'from-slate-500/20 to-slate-600/5 border-slate-500/30 text-slate-300',
  };

  const Wrapper = 'div';

  return (
    <Wrapper className={`rounded-2xl border bg-gradient-to-br p-5 ${variants[variant]}`}>
      <Wrapper className="flex items-start justify-between">
        <Wrapper>
          <p className="text-sm text-slate-400 mb-1">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </Wrapper>
        {Icon && (
          <Wrapper className="p-2 rounded-lg bg-white/5">
            <Icon className="w-5 h-5" />
          </Wrapper>
        )}
      </Wrapper>
    </Wrapper>
  );
}
