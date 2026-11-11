import Image from 'next/image'
import Link from 'next/link'

export const metadata = { title: 'Les Jardins de Vauban · Programme' }

export default function Programme() {
    return (
        <main className="mx-auto max-w-5xl px-6 py-16 text-neutral-900">
            <Link
                href="/"
                className="text-sm text-neutral-500 hover:text-neutral-900"
            >
                ← Retour aux lots
            </Link>

            <p className="mt-10 text-xs font-medium uppercase tracking-widest text-neutral-500">
                KALIMO Promotion · Bordeaux
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                Les Jardins de Vauban
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-neutral-600">
                48 logements, du T2 au T4, dans un quartier résidentiel de
                Bordeaux.
            </p>

            <div className="mt-12 overflow-hidden rounded-xl">
                <Image
                    src="/carte.png"
                    alt="Illustration aquarelle d'un immeuble résidentiel en pierre claire, entouré d'arbres"
                    width={1536}
                    height={1024}
                    priority
                    className="h-auto w-full"
                />
            </div>
            <p className="mt-3 text-xs text-neutral-400">
                Illustration réalisée par IA, à titre indicatif et non
                contractuel.
            </p>

            <section className="mt-16 grid gap-10 md:grid-cols-[1fr_1.5fr]">
                <h2 className="text-2xl font-semibold tracking-tight">
                    Le programme
                </h2>
                <div className="space-y-5 leading-relaxed text-neutral-700">
                    <p>
                        Les Jardins de Vauban regroupe 48 logements à Bordeaux,
                        proposés par le promoteur régional KALIMO Promotion. Les
                        appartements vont du T2 au T4.
                    </p>
                    <p>
                        La liste des lots, avec leur surface, leur étage, leur
                        prix et leur statut, est mise à jour par notre équipe
                        commerciale.
                    </p>
                </div>
            </section>

            <section className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 pt-10">
                <p className="text-neutral-600">
                    Consultez les lots disponibles et envoyez une demande de
                    renseignements.
                </p>
                <Link
                    href="/#lots"
                    className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700"
                >
                    Voir les lots
                </Link>
            </section>
        </main>
    )
}
