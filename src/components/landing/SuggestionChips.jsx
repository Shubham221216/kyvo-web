import SuggestionChipsSkeleton from '../loading/SuggestionChipsSkeleton'

const Chip = ({ text, onPick }) => {
  return (
    <button
      type="button"
      className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-brand-surface/70 px-4 py-2 text-xs font-medium text-brand-primaryHover ring-1 ring-brand-primary/30 backdrop-blur transition duration-150 hover:-translate-y-px hover:bg-brand-surfaceTint hover:ring-brand-primary/70 hover:shadow-sm active:translate-y-0 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
      onClick={() => onPick?.(text)}
    >
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primaryHover">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M21 21l-4.35-4.35"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="whitespace-nowrap">{text}</span>
    </button>
  )
}

const ScrollRow = ({ items, onPick }) => {
  if (!items?.length) return null

  return (
    <div
      className="w-full overflow-x-auto overflow-y-hidden py-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    >
      <div className="flex min-w-full w-max items-center justify-start gap-3 px-0 pr-6">
        {items.map((text, index) => (
          <Chip key={`${text}-${index}`} text={text} onPick={onPick} />
        ))}
      </div>
    </div>
  )
}

const SuggestionChips = ({ items, onPick, loading = false }) => {
  if (loading) return <SuggestionChipsSkeleton />

  const row1 = items.filter((_, index) => index % 2 === 0)
  const row2 = items.filter((_, index) => index % 2 === 1)

  return (
    <div className="w-full space-y-1 py-2">
      <ScrollRow items={row1} onPick={onPick} />
      <ScrollRow items={row2} onPick={onPick} />
    </div>
  )
}

export default SuggestionChips
