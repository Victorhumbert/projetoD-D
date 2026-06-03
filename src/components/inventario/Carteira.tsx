'use client';

import { useCharacterStore } from '@/store';
import { Card } from '@/components/ui/Card';
import type { Carteira } from '@/types/character';

const MOEDAS: {
  key: keyof Carteira;
  sigla: string;
  label: string;
  cor: string;
  equiv: number;
}[] = [
  { key: 'cobre',    sigla: 'PC',  label: 'Cobre',    cor: 'text-orange-400',  equiv: 0.01 },
  { key: 'prata',    sigla: 'PP',  label: 'Prata',    cor: 'text-slate-300',   equiv: 0.1  },
  { key: 'electrum', sigla: 'PE',  label: 'Electrum', cor: 'text-blue-400',    equiv: 0.5  },
  { key: 'ouro',     sigla: 'PO',  label: 'Ouro',     cor: 'text-yellow-400',  equiv: 1    },
  { key: 'platina',  sigla: 'PPL', label: 'Platina',  cor: 'text-indigo-300',  equiv: 10   },
];

export function Carteira() {
  const carteira = useCharacterStore((s) => s.carteira);
  const setCarteira = useCharacterStore((s) => s.setCarteira);

  const totalPO = MOEDAS.reduce(
    (acc, m) => acc + carteira[m.key] * m.equiv,
    0
  );

  return (
    <Card>
      <h2 className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-4">
        Carteira
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {MOEDAS.map(({ key, sigla, label, cor }) => (
          <div key={key} className="flex flex-col items-center gap-1.5">
            <span className={`text-sm font-bold ${cor}`}>{sigla}</span>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={carteira[key]}
              aria-label={`${label} (${sigla})`}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, '');
                setCarteira({ [key]: raw === '' ? 0 : parseInt(raw, 10) });
              }}
              onFocus={(e) => e.target.select()}
              className="w-full text-center text-lg font-semibold bg-bg-surface border border-border-default rounded-lg px-2 py-2 text-text-primary focus:border-accent focus:outline-none min-h-11"
            />
            <span className="text-xs text-text-muted">{label}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between">
        <span className="text-xs text-text-secondary uppercase tracking-wide">Total em PO</span>
        <span className="text-base font-bold text-accent">
          {totalPO % 1 === 0 ? totalPO.toFixed(0) : totalPO.toFixed(2)} PO
        </span>
      </div>
    </Card>
  );
}
