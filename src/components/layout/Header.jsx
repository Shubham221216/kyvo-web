import brandColors from '../../theme/brandColors'
import logo from '../../assets/img/logo.png'

const Header = ({ children }) => {
  return (
    <header className="fixed inset-x-0 top-0 z-30 w-full overflow-hidden border-b border-brand-border bg-brand-surface/20 backdrop-blur relative">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${brandColors.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${brandColors.gridLine} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          opacity: 0.65,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${brandColors.surface}, transparent)`,
          opacity: 0.7,
        }}
      />

      <div className="relative z-10 flex h-20 w-full items-center gap-6 px-6">
        <a href="/" className="flex shrink-0 items-center gap-4">
          <img
            src={logo}
            alt="Kyvo"
            className="h-12 w-12 rounded-xl bg-brand-surface object-contain transition duration-150 hover:opacity-90 active:scale-[0.98]"
            loading="eager"
          />
          <span className="text-xl font-semibold tracking-tight text-brand-ink sm:text-2xl">Kyvo</span>
        </a>

        {children ? <div className="min-w-0 flex-1">{children}</div> : null}
      </div>
    </header>
  )
}

export default Header
