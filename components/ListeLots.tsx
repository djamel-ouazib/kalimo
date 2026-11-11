import { connection } from 'next/server'
import { getLots } from '@/lib/lots'

export default async function ListeLots({ type }: { type?: string }) {
    await connection() // rendu à chaque visite, pas de cache

    const lots = await getLots(type)

    if (lots.length === 0) return <p>Aucun lot pour ce type.</p>

    return (
        <ul className="space-y-2">
            {lots.map((lot) => (
                <li key={lot.id}>
                    {lot.reference} · {lot.type} · {lot.surface} m² ·{' '}
                    {lot.statut}
                </li>
            ))}
        </ul>
    )
}
