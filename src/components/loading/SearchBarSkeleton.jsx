import Skeleton from 'react-loading-skeleton'

const SearchBarSkeleton = () => {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-brand-surface p-2 shadow-sm ring-1 ring-brand-border">
      <div className="flex items-center pl-3 text-brand-primary">
        <Skeleton circle width={18} height={18} />
      </div>

      <div className="w-full px-2">
        <Skeleton height={44} borderRadius={12} />
      </div>

      <div className="shrink-0">
        <Skeleton width={44} height={44} borderRadius={12} />
      </div>
    </div>
  )
}

export default SearchBarSkeleton
