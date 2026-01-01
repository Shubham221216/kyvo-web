import FiltersPanelSkeleton from './FiltersPanelSkeleton'
import FooterSkeleton from './FooterSkeleton'
import PublicLayoutSkeleton from './PublicLayoutSkeleton'
import ResultsTableSkeleton from './ResultsTableSkeleton'
import SearchBarSkeleton from './SearchBarSkeleton'

const ResultsPageSkeleton = () => {
  return (
    <PublicLayoutSkeleton
      headerContent={
        <div className="mx-auto w-full max-w-2xl">
          <SearchBarSkeleton />
        </div>
      }
    >
      <main className="relative z-10 h-[calc(100vh-80px)] w-full box-border overflow-hidden px-6 py-6">
        <div className="grid h-full min-h-0 grid-cols-1 gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="hidden h-full min-h-0 lg:block">
            <FiltersPanelSkeleton />
          </div>

          <div className="flex h-full min-h-0 min-w-0 flex-col">
            <div className="mb-3 flex items-center justify-between gap-3 lg:hidden">
              <div className="h-9 w-28 rounded-xl bg-brand-surface/70 ring-1 ring-brand-border" />
            </div>

            <ResultsTableSkeleton rows={12} />
          </div>
        </div>
      </main>

      <FooterSkeleton />
    </PublicLayoutSkeleton>
  )
}

export default ResultsPageSkeleton
