import Skeleton from 'react-loading-skeleton'

const FooterSkeleton = () => {
  return (
    <footer className="relative overflow-hidden border-t border-brand-border bg-brand-surface/20 pt-10 pb-8">
      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6">
              <Skeleton width={120} height={36} />
            </div>
            <div className="space-y-2">
              <Skeleton height={12} />
              <Skeleton height={12} />
              <Skeleton height={12} width="85%" />
              <Skeleton height={12} width="70%" />
            </div>
          </div>

          <div className="mt-6 space-y-4 text-[15px] lg:mt-0 lg:pl-16">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <Skeleton width={20} height={20} />
                <Skeleton width={220} height={12} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-brand-border pt-8">
          <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:justify-center">
            <div className="flex flex-wrap justify-center gap-6">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Skeleton key={idx} width={90} height={12} />
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Skeleton width={140} height={12} />
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Skeleton width={16} height={16} borderRadius={4} />
                  <Skeleton width={50} height={12} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <Skeleton width={240} height={12} />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterSkeleton
