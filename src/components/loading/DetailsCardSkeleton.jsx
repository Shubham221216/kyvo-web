import Skeleton from 'react-loading-skeleton'

const DetailsCardSkeleton = () => {
  const tiles = Array.from({ length: 10 })

  return (
    <section className="w-full rounded-2xl bg-brand-surface/70 ring-1 ring-brand-border backdrop-blur">
      <div className="border-b border-brand-border px-6 py-5">
        <div className="flex items-start justify-between gap-3">
          <div className="mt-0.5 shrink-0">
            <Skeleton width={52} height={32} borderRadius={12} />
          </div>

          <div className="flex-1 text-center">
            <Skeleton width={160} height={14} style={{ margin: '0 auto' }} />
            <div className="mt-2">
              <Skeleton width={220} height={12} style={{ margin: '0 auto' }} />
            </div>
          </div>

          <div className="hidden w-[66px] shrink-0 sm:block" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 px-6 py-6 sm:grid-cols-2">
        {tiles.map((_, idx) => (
          <div
            key={idx}
            className="rounded-xl bg-brand-surface/60 px-4 py-3 ring-1 ring-brand-border/70"
          >
            <Skeleton width={110} height={10} />
            <div className="mt-2">
              <Skeleton width={140} height={14} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default DetailsCardSkeleton
