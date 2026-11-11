import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import ListeLots from '@/components/ListeLots'
import FormulaireDemande from '@/components/FormulaireDemande'
import FilterType from '@/components/FilterType'

import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Les Jardins de Vauban · KALIMO Promotion',
    description:
        '48 logements à Bordeaux, du T2 au T4. Consultez les lots disponibles et envoyez une demande de renseignements.',
}

async function ContenuFiltre({
    searchParams,
}: {
    searchParams: Promise<{ type?: string }>
}) {
    const { type } = await searchParams

    return (
        <>
            <FilterType type={type} />
            <div className="mt-6">
                <Suspense
                    fallback={
                        <p className="text-sm text-neutral-500">
                            Chargement des lots…
                        </p>
                    }
                >
                    <ListeLots type={type} />
                </Suspense>
            </div>
        </>
    )
}

export default function Home({
    searchParams,
}: {
    searchParams: Promise<{ type?: string }>
}) {
    return (
        <main className="text-neutral-900">
            {/* Entrée du programme */}
            <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-16 pt-16 md:grid-cols-2 md:items-center">
                <div>
                    <p className="text-xs font-medium uppercase tracking-widest text-neutral-500">
                        KALIMO Promotion · Bordeaux
                    </p>
                    <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                        Les Jardins de Vauban
                    </h1>
                    <p className="mt-4 text-lg text-neutral-600">
                        48 logements. Consultez les lots disponibles en temps
                        réel et envoyez une demande de renseignements en
                        quelques clics.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <a
                            href="#lots"
                            className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700"
                        >
                            Voir les lots
                        </a>
                        <Link
                            href="/programme"
                            className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-50"
                        >
                            Découvrir le programme
                        </Link>
                    </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-neutral-200">
                    <Image
                        src="/carte.png"
                        alt="Visuel d'illustration du programme Les Jardins de Vauban"
                        width={1200}
                        height={800}
                        priority
                        className="h-auto w-full"
                    />
                </div>
            </section>

            {/* Lots */}
            <section
                id="lots"
                className="scroll-mt-8 border-t border-neutral-200 bg-white"
            >
                <div className="mx-auto max-w-6xl px-6 py-16">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-semibold tracking-tight">
                                Lots disponibles
                            </h2>
                            <p className="mt-1 text-sm text-neutral-500">
                                Les statuts sont mis à jour directement par
                                l'équipe commerciale.
                            </p>
                        </div>
                    </div>
                    <Suspense
                        fallback={
                            <p className="mt-6 text-sm text-neutral-500">
                                Chargement des lots…
                            </p>
                        }
                    >
                        <ContenuFiltre searchParams={searchParams} />
                    </Suspense>
                </div>
            </section>

            {/* Demande de renseignements */}
            <section className="border-t border-neutral-200 bg-neutral-50">
                <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1fr_1.5fr]">
                    <div>
                        <h2 className="text-2xl font-semibold tracking-tight">
                            Une question ?
                        </h2>
                        <p className="mt-3 text-neutral-600">
                            Décrivez votre projet et le lot qui vous intéresse.
                            Notre équipe commerciale vous répond rapidement.
                        </p>
                        <p className="mt-4 text-xs text-neutral-500">
                            Vos données servent uniquement à répondre à votre
                            demande.
                        </p>
                    </div>
                    <div className="rounded-xl border border-neutral-200 bg-white p-6">
                        <FormulaireDemande />
                    </div>
                </div>
            </section>

            <footer className="border-t border-neutral-200 px-6 py-8 text-center text-xs text-neutral-500">
                Les Jardins de Vauban · KALIMO Promotion · Bordeaux
            </footer>
        </main>
    )
}
