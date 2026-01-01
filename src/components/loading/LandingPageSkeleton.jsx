import Skeleton from 'react-loading-skeleton'

import FooterSkeleton from './FooterSkeleton'
import PublicLayoutSkeleton from './PublicLayoutSkeleton'
import SearchBarSkeleton from './SearchBarSkeleton'
import SuggestionChipsSkeleton from './SuggestionChipsSkeleton'

const LandingPageSkeleton = () => {
  return (
    <PublicLayoutSkeleton>
      <main className="relative z-10 flex min-h-[calc(100vh-80px)] w-full flex-col items-center justify-center px-6 py-10">
        <div className="w-full">
          <div className="mx-auto w-full max-w-3xl text-center">
            <div className="mx-auto max-w-xl">
              <Skeleton height={52} width="80%" />
              <div className="mt-2">
                <Skeleton height={52} width="65%" />
              </div>
            </div>
            <div className="mx-auto mt-6 max-w-xl">
              <Skeleton height={14} width="70%" />
              <div className="mt-2">
                <Skeleton height={14} width="55%" />
              </div>
            </div>
          </div>

          <div className="mx-auto mt-8 w-full max-w-2xl">
            <SearchBarSkeleton />
          </div>

          <div className="mt-6 w-full">
            <SuggestionChipsSkeleton />
          </div>
        </div>
      </main>

      <FooterSkeleton />
    </PublicLayoutSkeleton>
  )
}

export default LandingPageSkeleton
