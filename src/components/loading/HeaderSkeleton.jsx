import Skeleton from 'react-loading-skeleton'

const HeaderSkeleton = ({ children }) => {
  return (
    <header className="fixed inset-x-0 top-0 z-30 w-full overflow-hidden border-b border-brand-border bg-brand-surface/20 backdrop-blur relative">
      <div className="relative z-10 flex h-20 w-full items-center gap-6 px-6">
        <div className="flex shrink-0 items-center gap-4">
          <Skeleton width={48} height={48} borderRadius={12} />
          <Skeleton width={70} height={18} />
        </div>

        {children ? <div className="min-w-0 flex-1">{children}</div> : <div className="min-w-0 flex-1" />}
      </div>
    </header>
  )
}

export default HeaderSkeleton
