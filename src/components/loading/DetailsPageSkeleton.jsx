import FooterSkeleton from './FooterSkeleton'
import PublicLayoutSkeleton from './PublicLayoutSkeleton'
import DetailsCardSkeleton from './DetailsCardSkeleton'

const DetailsPageSkeleton = () => {
  return (
    <PublicLayoutSkeleton
      headerContent={
        <div className="flex w-full items-center justify-center">
          <div className="h-5 w-44 rounded bg-brand-border" />
        </div>
      }
    >
      <main className="relative z-10 flex min-h-[calc(100vh-80px)] w-full flex-col px-6 py-8">
        <div className="mx-auto w-full max-w-4xl">
          <DetailsCardSkeleton />
        </div>
      </main>

      <FooterSkeleton />
    </PublicLayoutSkeleton>
  )
}

export default DetailsPageSkeleton
