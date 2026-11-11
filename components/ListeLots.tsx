import { connection } from 'next/server'
import { getLots, type Lot } from '@/lib/lots'

const formatPrix = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
})

const STYLE_STATUT: Record<string, string> = {
    Disponible: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
    Optionné: 'bg-amber-50 text-amber-700 ring-amber-600/20',
    Vendu: 'bg-neutral-100 text-neutral-500 ring-neutral-500/20',
}

function Ligne({ lot }: { lot: Lot }) {
    return (
        <li className="grid grid-cols-[1fr_auto] items-center gap-4 py-4 sm:grid-cols-[auto_1fr_auto_auto_auto]">
            <span className="font-medium">{lot.reference}</span>
            <span className="text-sm text-neutral-500">{lot.type}</span>
            <span className="hidden text-sm text-neutral-500 sm:block">
                {lot.surface} m²
            </span>
            <span className="hidden text-sm font-medium sm:block">
                {formatPrix.format(lot.prix)}
            </span>
            <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
                    STYLE_STATUT[lot.statut] ??
                    'bg-neutral-100 text-neutral-600 ring-neutral-500/20'
                }`}
            >
                {lot.statut}
            </span>
        </li>
    )
}

export default async function ListeLots({ type }: { type?: string }) {
    await connection() // rendu à chaque visite, pas de cache

    const lots = await getLots(type)

    if (lots.length === 0) {
        return (
            <p className="text-sm text-neutral-500">Aucun lot pour ce type.</p>
        )
    }

    return (
        <ul className="divide-y divide-neutral-200 border-y border-neutral-200">
            {lots.map((lot) => (
                <Ligne key={lot.id} lot={lot} />
            ))}
        </ul>
    )
}
