import Airtable from 'airtable'

// Le token et l'identifiant viennent de .env.local, jamais écrits dans le code
const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(
    process.env.AIRTABLE_BASE_ID!
)

export const lotsTable = base('Lots')
export const demandesTable = base('Demandes')
