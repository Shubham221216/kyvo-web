import Skeleton from 'react-loading-skeleton'

const TableCellSkeleton = ({ width }) => {
  return <Skeleton width={width} height={12} />
}

export const ResultsTableRowSkeleton = ({ index }) => {
  const zebra = index % 2 === 0

  return (
    <tr className={zebra ? 'bg-transparent' : 'bg-brand-surface/40'}>
      <td className="w-[180px] whitespace-nowrap px-4 py-[18px] font-medium bg-brand-surface lg:sticky lg:left-0 lg:z-30">
        <TableCellSkeleton width={120} />
      </td>
      <td className="w-[140px] whitespace-nowrap px-4 py-[18px] bg-brand-surface lg:sticky lg:left-[180px] lg:z-30">
        <TableCellSkeleton width={90} />
      </td>
      <td className="whitespace-nowrap px-4 py-[18px]">
        <TableCellSkeleton width={180} />
      </td>
      <td className="whitespace-nowrap px-4 py-[18px]">
        <TableCellSkeleton width={110} />
      </td>
      <td className="whitespace-nowrap px-4 py-[18px]">
        <TableCellSkeleton width={60} />
      </td>
      <td className="whitespace-nowrap px-4 py-[18px]">
        <TableCellSkeleton width={60} />
      </td>
      <td className="whitespace-nowrap px-4 py-[18px]">
        <TableCellSkeleton width={50} />
      </td>
      <td className="whitespace-nowrap px-4 py-[18px]">
        <TableCellSkeleton width={80} />
      </td>
      <td className="whitespace-nowrap px-4 py-[18px]">
        <TableCellSkeleton width={80} />
      </td>
      <td className="whitespace-nowrap px-4 py-[18px]">
        <TableCellSkeleton width={100} />
      </td>
      <td className="whitespace-nowrap px-4 py-[18px]">
        <TableCellSkeleton width={90} />
      </td>
      <td className="whitespace-nowrap px-4 py-[18px]">
        <TableCellSkeleton width={70} />
      </td>
    </tr>
  )
}

const ResultsTableSkeleton = ({ rows = 10, title = true }) => {
  return (
    <section className="flex h-full min-h-0 w-full flex-col">
      {title ? (
        <div className="mb-3 flex shrink-0 items-center justify-between">
          <h2 className="text-sm font-semibold text-brand-ink">
            <Skeleton width={180} height={14} />
          </h2>
        </div>
      ) : null}

      <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-2xl bg-brand-surface/70 ring-1 ring-brand-border backdrop-blur">
        <div className="relative isolate h-full min-h-0 w-full flex-1 overflow-x-auto overflow-y-auto overscroll-contain">
          <table className="w-max min-w-full border-separate border-spacing-0 text-left text-xs">
            <thead className="bg-brand-surfaceTint">
              <tr className="text-[11px] font-semibold uppercase tracking-wide text-brand-inkMuted">
                <th className="w-[180px] whitespace-nowrap px-4 py-4 sticky top-0 z-40 lg:left-0 lg:z-50 bg-brand-surfaceTint">
                  <Skeleton width={90} height={10} />
                </th>
                <th className="w-[140px] whitespace-nowrap px-4 py-4 sticky top-0 z-40 lg:left-[180px] lg:z-50 bg-brand-surfaceTint">
                  <Skeleton width={60} height={10} />
                </th>
                <th className="whitespace-nowrap px-4 py-4 sticky top-0 z-40 bg-brand-surfaceTint">
                  <Skeleton width={60} height={10} />
                </th>
                <th className="whitespace-nowrap px-4 py-4 sticky top-0 z-40 bg-brand-surfaceTint">
                  <Skeleton width={70} height={10} />
                </th>
                <th className="whitespace-nowrap px-4 py-4 sticky top-0 z-40 bg-brand-surfaceTint">
                  <Skeleton width={80} height={10} />
                </th>
                <th className="whitespace-nowrap px-4 py-4 sticky top-0 z-40 bg-brand-surfaceTint">
                  <Skeleton width={90} height={10} />
                </th>
                <th className="whitespace-nowrap px-4 py-4 sticky top-0 z-40 bg-brand-surfaceTint">
                  <Skeleton width={40} height={10} />
                </th>
                <th className="whitespace-nowrap px-4 py-4 sticky top-0 z-40 bg-brand-surfaceTint">
                  <Skeleton width={120} height={10} />
                </th>
                <th className="whitespace-nowrap px-4 py-4 sticky top-0 z-40 bg-brand-surfaceTint">
                  <Skeleton width={110} height={10} />
                </th>
                <th className="whitespace-nowrap px-4 py-4 sticky top-0 z-40 bg-brand-surfaceTint">
                  <Skeleton width={140} height={10} />
                </th>
                <th className="whitespace-nowrap px-4 py-4 sticky top-0 z-40 bg-brand-surfaceTint">
                  <Skeleton width={120} height={10} />
                </th>
                <th className="whitespace-nowrap px-4 py-4 sticky top-0 z-40 bg-brand-surfaceTint">
                  <Skeleton width={50} height={10} />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {Array.from({ length: rows }).map((_, idx) => (
                <ResultsTableRowSkeleton key={idx} index={idx} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default ResultsTableSkeleton
