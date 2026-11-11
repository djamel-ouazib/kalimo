import { Suspense } from 'react'
import { connection } from 'next/server'
import { lotsTable } from '@/lib/airtable'

// Composant serveur : c'est lui qui interroge Airtable
async function ListeLots() {
    await connection() // rendu à chaque visite, pas de cache

    const records = await lotsTable
        .select({ sort: [{ field: "Ordre d'affichage", direction: 'asc' }] })
        .all()

    return (
        <ul className="space-y-2">
            {records.map((r) => (
                <li key={r.id}>
                    {r.get('Référence') as string} · {r.get('Type') as string} ·{' '}
                    {r.get('Surface (m²)') as number} m² ·{' '}
                    {r.get('Statut') as string}
                </li>
            ))}
        </ul>
    )
}

// Page : le titre s'affiche tout de suite, la liste arrive ensuite
export default function Home() {
    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold mb-4">Les Jardins de Vauban</h1>
            <Suspense fallback={<p>Chargement des lots...</p>}>
                <ListeLots />
            </Suspense>
        </main>
    )
}
