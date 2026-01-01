import Skeleton from 'react-loading-skeleton'

const ChipSkeleton = ({ width }) => {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-brand-surface/70 px-4 py-2 ring-1 ring-brand-primary/30 backdrop-blur">
      <Skeleton circle width={20} height={20} />
      <Skeleton width={width} height={12} />
    </div>
  )
}

const RowSkeleton = () => {
  const widths = [90, 140, 110, 160, 120, 100]

  return (
    <div className="w-full overflow-x-auto overflow-y-hidden py-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex min-w-full w-max items-center justify-start gap-3 px-0 pr-6">
        {widths.map((w, idx) => (
          <ChipSkeleton key={idx} width={w} />
        ))}
      </div>
    </div>
  )
}

const SuggestionChipsSkeleton = () => {
  return (
    <div className="w-full space-y-1 py-2">
      <RowSkeleton />
      <RowSkeleton />
    </div>
  )
}

export default SuggestionChipsSkeleton
