import GridBackground from './GridBackground'
import Header from './Header'

const PublicLayout = ({ children, headerContent, scrollableContent = true }) => {
  return (
    <div className="relative h-screen overflow-hidden bg-brand-background">
      <GridBackground />
      <Header>{headerContent}</Header>

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

export default PublicLayout
