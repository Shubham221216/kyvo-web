import Skeleton from 'react-loading-skeleton'

const SectionShell = ({ children }) => {
  return (
    <div className="rounded-2xl bg-brand-surface/70 p-4 border border-brand-border backdrop-blur">
      {children}
    </div>
  )
}

export const BrandFilterBlockSkeleton = () => {
  return (
    <SectionShell>
      <div className="flex items-center justify-between gap-3">
        <Skeleton width={60} height={12} />
      </div>
      <div className="mt-3 space-y-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Skeleton width={16} height={16} borderRadius={4} />
              <Skeleton width={120} height={12} />
            </div>
            <Skeleton width={24} height={10} />
          </div>
        ))}
      </div>
    </SectionShell>
  )
}

export const CategoryFilterBlockSkeleton = () => {
  return (
    <SectionShell>
      <div className="flex items-center justify-between gap-3">
        <Skeleton width={80} height={12} />
      </div>
      <div className="mt-3 space-y-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Skeleton width={16} height={16} borderRadius={4} />
              <Skeleton width={140} height={12} />
            </div>
            <Skeleton width={24} height={10} />
          </div>
        ))}
      </div>
    </SectionShell>
  )
}

export const NumericFilterBlockSkeleton = () => {
  const rows = [
    'Bore Diameter',
    'Outer Diameter',
    'Width',
    'Dynamic Load Rating',
    'Static Load Rating',
  ]

  return (
    <SectionShell>
      <div className="flex items-center justify-between gap-3">
        <Skeleton width={110} height={12} />
        <Skeleton width={64} height={32} borderRadius={12} />
      </div>

      <div className="mt-3 space-y-4">
        {rows.map((label) => (
          <div key={label}>
            <div className="flex items-baseline justify-between gap-2">
              <Skeleton width={120} height={12} />
              <Skeleton width={70} height={10} />
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Skeleton height={36} borderRadius={12} />
              <Skeleton height={36} borderRadius={12} />
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}

const FiltersPanelSkeleton = () => {
  return (
    <aside className="flex h-full min-h-0 w-full flex-col">
      <div className="flex items-center justify-between">
        <Skeleton width={70} height={14} />
        <Skeleton width={70} height={32} borderRadius={12} />
      </div>

      <div className="mt-4 flex-1 space-y-4 overflow-y-auto overscroll-contain p-1">
        <BrandFilterBlockSkeleton />
        <CategoryFilterBlockSkeleton />
        <NumericFilterBlockSkeleton />
      </div>
    </aside>
  )
}

export default FiltersPanelSkeleton
