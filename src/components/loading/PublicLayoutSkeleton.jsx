import GridBackgroundSkeleton from './GridBackgroundSkeleton'
import HeaderSkeleton from './HeaderSkeleton'

const PublicLayoutSkeleton = ({ children, headerContent, scrollableContent = true }) => {
  return (
    <div className="relative h-screen overflow-hidden bg-brand-background">
      <GridBackgroundSkeleton />
      <HeaderSkeleton>{headerContent}</HeaderSkeleton>

      <div
        className={`absolute inset-x-0 bottom-0 top-20 z-10 overflow-x-hidden ${
          scrollableContent ? 'overflow-y-auto' : 'overflow-y-hidden'
        }`}
      >
        {children}
      </div>
    </div>
  )
}

export default PublicLayoutSkeleton
