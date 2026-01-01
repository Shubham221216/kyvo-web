import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { useNavigate, useSearchParams } from 'react-router-dom'

import ResultsPageSkeleton from '../../components/loading/ResultsPageSkeleton'
import FiltersPanel from '../../components/filters/FiltersPanel'
import SearchBar from '../../components/landing/SearchBar'
import ResultsTable from '../../components/results/ResultsTable'
import { PublicLayout } from '../../components/layout'
import Footer from '../../components/layout/Footer'
import Data from '../../mocks/Data'
// import { applyFilters, computeFacets, searchAndRank } from '../../utils/componentSearch'
import { useRecommendMutation } from '../../store/api/api'


// We get occasional duplicate rows from datasets/mocks; normalize a stable signature so results/facets don’t jitter.
const rowDedupeKey = (row) => {
  const normText = (v) => (v === null || v === undefined ? '' : String(v).trim().toLowerCase())
  const normNum = (v) => {
    if (v === null || v === undefined) return ''
    const s = String(v).trim().toLowerCase()
    return s.replace(/[^0-9.]/g, '')
  }

  const designation = normText(row?.designation)
  // Treat designation like a part number when we have it.
  if (designation) return `d:${designation}`

  return `k:${normText(row?.designation)}|${normText(row?.brand)}|${normText(
    row?.product
  )}|${normText(row?.category)}|${normNum(row?.boreDiameter)}|${normNum(
    row?.outerDiameter
  )}|${normNum(row?.width)}|${normNum(row?.DynamicLoadRating)}|${normNum(
    row?.StaticLoadRating
  )}|${normNum(row?.limitingSpeedGrease)}|${normNum(row?.limitingSpeedOil)}|${normNum(
    row?.mass
  )}`
}


const ResultsPage = () => {
  
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const qParam = params.get('q') ?? ''

  const [recommend, { data, isLoading, error }] = useRecommendMutation()

  useEffect(() => {
    if (qParam) {
      recommend(qParam)
    }
  }, [qParam, recommend])

  const INITIAL_LOAD = 15
  const LOAD_BATCH = 5

  const [query, setQuery] = useState(qParam)
  const [filters, setFilters] = useState({ brands: [], categories: [], numeric: {} })
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [loadedCount, setLoadedCount] = useState(INITIAL_LOAD)



  const resultsScrollRef = useRef(null)
  const loadMoreSentinelRef = useRef(null)

  // Refs keep scroll handlers stable without re-rendering on every scroll tick.
  const isLoadingMoreRef = useRef(false)
  const loadedCountRef = useRef(loadedCount)

  const effectiveQuery = qParam.trim()

  // Deduping early keeps ranking and facet counts stable.
  // const uniqueComponentsData = useMemo(() => dedupeRows(componentsData), [componentsData])

  useEffect(() => {
    setLoadedCount(INITIAL_LOAD)
    if (resultsScrollRef.current) resultsScrollRef.current.scrollTop = 0
    isLoadingMoreRef.current = false
  }, [effectiveQuery, filters])

  // const backendResults = useMemo(
  //   () =>
  //     (data?.results ?? []).map((r, idx) => ({
  //       ...r,
  //       id: r.id ?? r.designation ?? `row-${idx}`, // REQUIRED for table
  //       brand: r.brand ?? r.manufacturer ?? '—',
  //     })),
  //   [data]
  // )

  const backendResults = useMemo(
    () =>
      (data?.results ?? []).map((r, idx) => ({
        // REQUIRED
        id: r.id ?? idx,

        // TABLE FIELDS (match mock data keys)
        designation: r.Designation ?? '—',
        brand: r.Brand ?? '—',
        product: r.Product ?? '—',
        category: r.Category ?? '—',

        boreDiameter: r.Bore_diameter ?? null,
        outerDiameter: r.D ?? null,
        width: r.B ?? null,

        DynamicLoadRating: r.Basic_dynamic_load_rating ?? null,
        StaticLoadRating: r.Basic_static_load_rating ?? null,

        limitingSpeedGrease: r.Limiting_speed_grease ?? null,
        limitingSpeedOil: r.Limiting_speed_oil ?? null,

        mass: r.Mass ?? null,
      })),
    [data]
  )


  const displayedResults = useMemo(
    () => backendResults.slice(0, Math.min(loadedCount, backendResults.length)),
    [backendResults, loadedCount]
  )

  const totalResultsCount = backendResults.length

  useEffect(() => {
    loadedCountRef.current = loadedCount
    isLoadingMoreRef.current = false
  }, [loadedCount])

  // const totalResultsCount = visibleResults?.length ?? 0  

  const loadMore = useCallback(() => {
    setLoadedCount((c) => Math.min(c + LOAD_BATCH, totalResultsCount))
  }, [LOAD_BATCH, totalResultsCount])

  const handleResultsScroll = useCallback(() => {
    const root = resultsScrollRef.current
    if (!root) return
    if (isLoadingMoreRef.current) return
    if (loadedCountRef.current >= totalResultsCount) return

    const threshold = 240
    // Start loading a bit early so the table feels continuous.
    const nearBottom = root.scrollTop + root.clientHeight >= root.scrollHeight - threshold
    if (!nearBottom) return

    isLoadingMoreRef.current = true
    loadMore()
  }, [loadMore, totalResultsCount])

  useEffect(() => {
    const root = resultsScrollRef.current
    const target = loadMoreSentinelRef.current
    let observer = null

    if (root && target) {
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((e) => e.isIntersecting)) return
          if (isLoadingMoreRef.current) return
          if (loadedCountRef.current >= totalResultsCount) return
          isLoadingMoreRef.current = true
          loadMore()
        },
        {
          root,
          rootMargin: '240px 0px',
          threshold: 0.01,
        }
      )

      observer.observe(target)
    }

    return () => observer?.disconnect()
  }, [loadMore, totalResultsCount])

  useEffect(() => {
    const root = resultsScrollRef.current
    if (!root) return
    if (isLoadingMoreRef.current) return
    if (loadedCountRef.current >= totalResultsCount) return

    const threshold = 240
    const notScrollableYet = root.scrollHeight <= root.clientHeight + threshold
    if (!notScrollableYet) return

    isLoadingMoreRef.current = true
    loadMore()
  }, [displayedResults?.length, loadMore, totalResultsCount])

  const canClearFilters = useMemo(() => {
    if (filters.brands?.length) return true
    if (filters.categories?.length) return true

    const numeric = filters.numeric ?? {}
    return Object.values(numeric).some((r) => r?.min || r?.max)
  }, [filters])

  const handleSubmit = (nextQuery) => {
    const normalized = (nextQuery ?? query).trim()
    if (!normalized) return
    navigate(`/results?q=${encodeURIComponent(normalized)}`)
  }

  const handleRowClick = useCallback(
    (row) => {
      if (!row) return
      const id = row.id ?? row.designation
      if (id === null || id === undefined || id === '') return
      navigate(`/details/${encodeURIComponent(String(id))}`, { state: { item: row } })
    },
    [navigate]
  )


  if (isLoading) {
    return <ResultsPageSkeleton />
  }

  if (error) {
    return <div className="p-6">Failed to load results</div>
  }

  return (
    <PublicLayout
      headerContent={
        <div className="mx-auto w-full max-w-2xl">
          <SearchBar
            value={query}
            onChange={setQuery}
            onSubmit={handleSubmit}
            placeholder="Search bearings by designation, brand, or size (e.g., 7201-B-XL-JP, 12mm bore...)"
          />
        </div>
      }
    >
      <main className="relative z-10 h-[calc(100vh-80px)] w-full box-border overflow-hidden px-6 py-6">
        <div className="grid h-full min-h-0 grid-cols-1 gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="hidden h-full min-h-0 lg:block">
            {/* <FiltersPanel
              facets={facets}
              filters={filters}
              onChangeFilters={setFilters}
              canClear={canClearFilters}
              loading={loadingComponents && (componentsData?.length ?? 0) === 0}
            /> */}
          </div>

          <div className="flex h-full min-h-0 min-w-0 flex-col">
            {error ? (
              <div className="mb-3 rounded-2xl bg-brand-surface/70 px-4 py-3 text-xs text-brand-ink ring-1 ring-brand-border backdrop-blur">
                {error}
              </div>
            ) : null}
            <div className="mb-3 flex items-center justify-between gap-3 lg:hidden">
              <button
                type="button"
                onClick={() => setFiltersOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-brand-ink ring-1 ring-brand-border transition hover:bg-brand-surfaceTint"
              >
                <FiMenu className="h-4 w-4" />
                <span>Show filters</span>
              </button>
            </div>

            <ResultsTable
              rows={displayedResults}
              totalCount={totalResultsCount}
              loading={isLoading}
              scrollRef={resultsScrollRef}
              onScroll={handleResultsScroll}
              loadMoreSentinelRef={loadMoreSentinelRef}
              onRowClick={handleRowClick}
            />
          </div>
        </div>
      </main>

      <Footer />

      {filtersOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            onClick={() => setFiltersOpen(false)}
            aria-label="Close filters"
          />
          <div className="absolute left-0 top-20 h-[calc(100%-80px)] w-[min(92vw,360px)] overflow-hidden rounded-r-3xl bg-brand-surface/90 ring-1 ring-brand-border backdrop-blur">
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="text-sm font-semibold text-brand-ink">Filters</div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={!canClearFilters}
                  onClick={() => setFilters({ brands: [], categories: [], numeric: {} })}
                  className="rounded-xl px-3 py-2 text-xs font-medium text-brand-primaryHover border border-brand-border transition hover:bg-brand-surfaceTint disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => setFiltersOpen(false)}
                  className="inline-flex items-center justify-center rounded-xl p-2 text-brand-ink border border-brand-border transition hover:bg-brand-surfaceTint"
                  aria-label="Close"
                >
                  <FiX className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="h-[calc(100%-52px)] min-h-0 box-border overflow-hidden px-4 pb-6">
              {/* <FiltersPanel
                facets={facets}
                filters={filters}
                onChangeFilters={setFilters}
                canClear={canClearFilters}
                loading={loadingComponents && (componentsData?.length ?? 0) === 0}
                showHeader={false}
              /> */}
            </div>
          </div>
        </div>
      ) : null}
    </PublicLayout>
  )
}

export default ResultsPage
