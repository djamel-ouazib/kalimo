'use client'

import { envoyerDemande, EtatFormulaire } from '@/app/action'
import { useActionState } from 'react'

const ETAT_INITIAL: EtatFormulaire = { ok: false, message: '' }

export default function FormulaireDemande() {
    const [etat, formAction, enCours] = useActionState(
        envoyerDemande,
        ETAT_INITIAL
    )

    if (etat.ok) {
        return <p className="font-semibold">{etat.message}</p>
    }

    return (
        <form action={formAction} className="space-y-3 max-w-md">
            <h2 className="text-xl font-bold">Demande de renseignements</h2>

            <input
                name="nom"
                placeholder="Nom *"
                required
                className="border p-2 w-full"
            />
            <input
                name="email"
                type="email"
                placeholder="Email *"
                required
                className="border p-2 w-full"
            />
            <input
                name="telephone"
                placeholder="Téléphone"
                className="border p-2 w-full"
            />
            <input
                name="lot"
                placeholder="Lot concerné (ex. VAU-A-101)"
                className="border p-2 w-full"
            />
            <textarea
                name="message"
                placeholder="Message"
                rows={4}
                className="border p-2 w-full"
            />

            {/* Champ piège : caché aux visiteurs */}
            <input
                name="site_web"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
            />

            <label className="flex gap-2 text-sm">
                <input name="consentement" type="checkbox" required />
                J'accepte que mes informations soient utilisées pour répondre à
                ma demande.
            </label>

            {etat.message && !etat.ok && (
                <p className="text-red-600">{etat.message}</p>
            )}

            <button
                type="submit"
                disabled={enCours}
                className="border px-4 py-2"
            >
                {enCours ? 'Envoi...' : 'Envoyer'}
            </button>
        </form>
    )
}
