import SearchBarSkeleton from '../loading/SearchBarSkeleton'

const SearchBar = ({ value, onChange, onSubmit, placeholder, loading = false }) => {
  if (loading) return <SearchBarSkeleton />

  return (
    <form
      className="flex items-center gap-3 rounded-2xl bg-brand-surface p-2 shadow-sm ring-1 ring-brand-border transition duration-150 hover:ring-brand-primary/40 focus-within:ring-2 focus-within:ring-brand-primary/50"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit?.(value)
      }}
    >
      <div className="flex items-center pl-3 text-brand-primary">
        <svg
          width="18"
          height="18"
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
      </div>

      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full bg-transparent px-2 text-sm text-brand-primary placeholder:text-brand-primary/50 focus:outline-none"
      />

      <button
        type="submit"
        className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl bg-brand-primary text-brand-surface shadow-sm transition duration-150 hover:bg-brand-primaryHover active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
        aria-label="Search"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M5 12h14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </form>
  )
}

export default SearchBar
