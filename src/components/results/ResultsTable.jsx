import ResultsTableSkeleton from '../loading/ResultsTableSkeleton'

const formatValue = (value) => {
  if (value === null || value === undefined || value === '') return '—'
  return String(value)
}

const UNITS = {
  boreDiameter: 'mm',
  outerDiameter: 'mm',
  width: 'mm',
  DynamicLoadRating: 'kN',
  StaticLoadRating: 'kN',
  limitingSpeedGrease: 'RPM',
  limitingSpeedOil: 'RPM',
  mass: 'kg',
}

const formatNumericOnly = (value) => {
  if (value === null || value === undefined || value === '') return '—'
  if (typeof value === 'number') return String(value)
  const s = String(value)
  const match = s.match(/-?\d+(?:\.\d+)?/)
  return match?.[0] ?? '—'
}

const rowSignature = (row) => {
  const normText = (v) => (v === null || v === undefined ? '' : String(v).trim().toLowerCase())
  const normNum = (v) => {
    if (v === null || v === undefined) return ''
    const s = String(v).trim().toLowerCase()
    return s.replace(/[^0-9.]/g, '')
  }

  const designation = normText(row?.designation)
  if (designation) return `d:${designation}`

  return `k:${normText(row?.brand)}|${normText(row?.product)}|${normText(row?.category)}|${
    normNum(row?.boreDiameter)
  }|${normNum(row?.outerDiameter)}|${normNum(row?.width)}|${normNum(
    row?.DynamicLoadRating
  )}|${normNum(row?.StaticLoadRating)}|${normNum(row?.limitingSpeedGrease)}|${normNum(
    row?.limitingSpeedOil
  )}|${normNum(row?.mass)}`
}

const dedupeForDisplay = (rows) => {
  // Defensive: avoids duplicated rows / key collisions when datasets are noisy.
  const out = []
  const seen = new Set()

  for (const row of rows ?? []) {
    const sig = rowSignature(row)
    if (seen.has(sig)) continue
    seen.add(sig)
    out.push(row)
  }

  return out
}

const rowKey = (row) => {
  // Prefer a backend id; fall back to a best-effort composite key for mock/partial rows.
  const id = row?.id
  if (id !== null && id !== undefined && id !== '') return `id:${id}`

  return `k:${row?.designation ?? 'row'}|${row?.brand ?? ''}|${row?.product ?? ''}|${
    row?.category ?? ''
  }|${row?.boreDiameter ?? ''}|${row?.outerDiameter ?? ''}|${row?.width ?? ''}`
}

const ResultsTable = ({
  rows,
  totalCount,
  loading = false,
  scrollRef,
  onScroll,
  loadMoreSentinelRef,
  onRowClick,
}) => {
  const displayRows = dedupeForDisplay(rows)
  const count = displayRows?.length ?? 0
  const total = totalCount ?? count

  if (loading) {
    return <ResultsTableSkeleton rows={12} />
  }

  return (
    <section className="flex h-full min-h-0 w-full flex-col">
      <div className="mb-3 flex shrink-0 items-center justify-between">
        <h2 className="text-sm font-semibold text-brand-ink">
          Ranked Results ({count}
          {total !== count ? ` of ${total}` : ''})
        </h2>
      </div>

      {count === 0 ? (
        <div className="flex min-h-[260px] w-full flex-col items-center justify-center rounded-2xl bg-brand-surface/70 px-6 text-center ring-1 ring-brand-border backdrop-blur">
          <div className="text-sm font-semibold text-brand-ink">Result not found</div>
          <div className="mt-1 text-xs text-brand-inkMuted">
            Try a different designation, brand, category, or size.
          </div>
        </div>
      ) : (
        <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-2xl bg-brand-surface/70 ring-1 ring-brand-border backdrop-blur">
          <div
            ref={scrollRef}
            onScroll={onScroll}
            className="relative isolate h-full min-h-0 w-full flex-1 overflow-x-auto overflow-y-auto overscroll-contain"
          >
            <table className="w-max min-w-full border-separate border-spacing-0 text-left text-xs">
              <thead className="bg-brand-surfaceTint">
                <tr className="text-[11px] font-semibold uppercase tracking-wide text-brand-inkMuted">
                  <th className="w-[180px] whitespace-nowrap px-4 py-4 sticky top-0 z-40 lg:left-0 lg:z-50 bg-brand-surfaceTint">
                    Designation
                  </th>
                  <th className="w-[140px] whitespace-nowrap px-4 py-4 sticky top-0 z-40 lg:left-[180px] lg:z-50 bg-brand-surfaceTint">
                    Brand
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 sticky top-0 z-40 bg-brand-surfaceTint">
                    Product
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 sticky top-0 z-40 bg-brand-surfaceTint">
                    Category
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 sticky top-0 z-40 bg-brand-surfaceTint text-center">
                    Bore Diameter (mm)
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 sticky top-0 z-40 bg-brand-surfaceTint text-center">
                    Outer Diameter (mm)
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 sticky top-0 z-40 bg-brand-surfaceTint text-center">
                    Width (mm)
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 sticky top-0 z-40 bg-brand-surfaceTint text-center">
                    Dynamic Load Rating (kN)
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 sticky top-0 z-40 bg-brand-surfaceTint text-center">
                    Static Load Rating (kN)
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 sticky top-0 z-40 bg-brand-surfaceTint text-center">
                    Limiting Speed – Grease (RPM)
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 sticky top-0 z-40 bg-brand-surfaceTint text-center">
                    Limiting Speed – Oil (RPM)
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 sticky top-0 z-40 bg-brand-surfaceTint text-center">
                    Mass (kg)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {displayRows.map((row) => (
                  <tr
                    key={rowKey(row)}
                    className="group cursor-pointer text-brand-ink transition-colors hover:bg-brand-surfaceTint"
                    onClick={() => onRowClick?.(row)}
                    role={onRowClick ? 'button' : undefined}
                    tabIndex={onRowClick ? 0 : undefined}
                    onKeyDown={(e) => {
                      if (!onRowClick) return
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        onRowClick(row)
                      }
                    }}
                  >
                    <td className="w-[180px] whitespace-nowrap px-4 py-[18px] font-medium text-brand-primaryHover bg-brand-surface group-hover:bg-brand-surfaceTint lg:sticky lg:left-0 lg:z-30">
                      {formatValue(row.designation)}
                    </td>
                    <td className="w-[140px] whitespace-nowrap px-4 py-[18px] bg-brand-surface group-hover:bg-brand-surfaceTint lg:sticky lg:left-[180px] lg:z-30">
                      {formatValue(row.brand)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-[18px]">{formatValue(row.product)}</td>
                    <td className="whitespace-nowrap px-4 py-[18px]">{formatValue(row.category)}</td>
                    <td className="whitespace-nowrap px-4 py-[18px] text-center tabular-nums">
                      {formatNumericOnly(row.boreDiameter)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-[18px] text-center tabular-nums">
                      {formatNumericOnly(row.outerDiameter)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-[18px] text-center tabular-nums">
                      {formatNumericOnly(row.width)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-[18px] text-center tabular-nums">
                      {formatNumericOnly(row.DynamicLoadRating)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-[18px] text-center tabular-nums">
                      {formatNumericOnly(row.StaticLoadRating)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-[18px] text-center tabular-nums">
                      {formatNumericOnly(row.limitingSpeedGrease)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-[18px] text-center tabular-nums">
                      {formatNumericOnly(row.limitingSpeedOil)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-[18px] text-center tabular-nums">
                      {formatNumericOnly(row.mass)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div ref={loadMoreSentinelRef} className="h-6" />
          </div>
        </div>
      )}
    </section>
  )
}

export default ResultsTable
