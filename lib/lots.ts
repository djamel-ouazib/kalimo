import { lotsTable } from '@/lib/airtable'

export const TYPES_VALIDES = ['T2', 'T3', 'T4'] as const
export type TypeLot = (typeof TYPES_VALIDES)[number]

export type Lot = {
    id: string
    reference: string
    type: string
    surface: number
    etage: number
    prix: number
    statut: string
}

export function estTypeValide(type?: string): type is TypeLot {
    return !!type && (TYPES_VALIDES as readonly string[]).includes(type)
}

// Convertit un enregistrement Airtable en objet Lot typé
function versLot(record: { id: string; get: (champ: string) => unknown }): Lot {
    return {
        id: record.id,
        reference: record.get('Référence') as string,
        type: record.get('Type') as string,
        surface: record.get('Surface (m²)') as number,
        etage: record.get('Étage') as number,
        prix: record.get('Prix (€)') as number,
        statut: record.get('Statut') as string,
    }
}

export async function getLots(type?: string): Promise<Lot[]> {
    // Seuls les types connus entrent dans la formule Airtable
    const filtre = estTypeValide(type)
        ? { filterByFormula: `{Type} = '${type}'` }
        : {}

    const records = await lotsTable
        .select({
            sort: [{ field: "Ordre d'affichage", direction: 'asc' }],
            ...filtre,
        })
        .all()

    return records.map(versLot)
}
