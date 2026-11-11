export default function FiltreType({ type }: { type?: string }) {
    return (
        <form method="get" className="flex items-center gap-2">
            <select
                name="type"
                defaultValue={type ?? ''}
                className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm"
            >
                <option value="">Tous les types</option>
                <option value="T2">T2</option>
                <option value="T3">T3</option>
                <option value="T4">T4</option>
            </select>
            <button
                type="submit"
                className="rounded-md bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-700"
            >
                Filtrer
            </button>
        </form>
    )
}
