'use server'

import { demandesTable } from '@/lib/airtable'

export type EtatFormulaire = {
    ok: boolean
    message: string
}

const EMAIL_VALIDE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function envoyerDemande(
    _precedent: EtatFormulaire,
    formData: FormData
): Promise<EtatFormulaire> {
    // Champ piège : invisible pour un humain, rempli par la plupart des robots
    if (formData.get('site_web')) {
        return { ok: true, message: 'Merci, votre demande a bien été envoyée.' }
    }

    const nom = String(formData.get('nom') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const telephone = String(formData.get('telephone') ?? '').trim()
    const lot = String(formData.get('lot') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()
    const consentement = formData.get('consentement') === 'on'

    if (!nom) return { ok: false, message: "Merci d'indiquer votre nom." }
    if (!EMAIL_VALIDE.test(email))
        return { ok: false, message: 'Adresse email invalide.' }
    if (message.length > 1000)
        return {
            ok: false,
            message: 'Votre message est trop long (1000 caractères maximum).',
        }
    if (!consentement)
        return {
            ok: false,
            message: 'Merci de cocher la case de consentement.',
        }

    try {
        await demandesTable.create([
            {
                fields: {
                    Nom: nom,
                    Email: email,
                    // Champ facultatif : on n'envoie rien s'il est vide
                    ...(telephone && { Téléphone: telephone }),
                    ...(lot && { 'Lot concerné': lot }),
                    ...(message && { Message: message }),
                    Consentement: true,
                    'Statut de traitement': 'Nouvelle',
                    // « Date de réception » n'est pas envoyée : Airtable la remplit seul
                },
            },
        ])
        return { ok: true, message: 'Merci, votre demande a bien été envoyée.' }
    } catch (erreur) {
        console.error('Erreur Airtable :', erreur)
        return {
            ok: false,
            message: 'Une erreur est survenue. Merci de réessayer plus tard.',
        }
    }
}
