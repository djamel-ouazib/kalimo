export default function FiltreType({ type }: { type?: string }) {
    return (
        <form method="get" className="mb-6 flex gap-2">
            <select
                name="type"
                defaultValue={type ?? ''}
                className="border p-2"
            >
                <option value="">Tous les types</option>
                <option value="T2">T2</option>
                <option value="T3">T3</option>
                <option value="T4">T4</option>
            </select>
            <button type="submit" className="border px-4 py-2">
                Filtrer
            </button>
        </form>
    )
}
