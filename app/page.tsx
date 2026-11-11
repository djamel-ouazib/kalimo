import { Suspense } from 'react'

import ListeLots from '@/components/ListeLots'
import FilterType from '@/components/FilterType'

async function ContenuFiltre({
    searchParams,
}: {
    searchParams: Promise<{ type?: string }>
}) {
    const { type } = await searchParams

    return (
        <>
            <FilterType type={type} />
            <Suspense fallback={<p>Chargement des lots...</p>}>
                <ListeLots type={type} />
            </Suspense>
        </>
    )
}

export default function Home({
    searchParams,
}: {
    searchParams: Promise<{ type?: string }>
}) {
    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold mb-4">Les Jardins de Vauban</h1>
            <Suspense fallback={<p>Chargement...</p>}>
                <ContenuFiltre searchParams={searchParams} />
            </Suspense>
        </main>
    )
}
