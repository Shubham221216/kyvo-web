import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import LandingPageSkeleton from '../../components/loading/LandingPageSkeleton'
import SearchBar from '../../components/landing/SearchBar'
import SuggestionChips from '../../components/landing/SuggestionChips'
import { PublicLayout } from '../../components/layout'
import Footer from '../../components/layout/Footer'
import suggestionChips from '../../mocks/SuggestionChips'
import { useRecommendMutation } from '../../store/api/api'// adjust path if needed




const LandingPage = () => {
  const [recommend, { data, isLoading, error }] = useRecommendMutation()

  const LOCAL_SUGGESTIONS =[
     '7200-B-XL-JP',
  '7201-B-XL-JP',
  '7202-B-XL-JP',
  'Angular contact ball bearing',
  'Angular contact bearing 40° contact angle',
  'High speed bearing for spindle',
  'Bearing with 10mm bore',
  'Bearing with 12mm bore',
  'Bearing with 15mm bore',
  'Bearing with 30mm outer diameter',
  'Bearing with 32mm outer diameter',
  'Bearing with 35mm outer diameter',
  'SKF angular contact bearing',
  'Schaeffler angular contact bearing',
  'NSK angular contact bearing',
  'FAG angular contact bearing',
  'High limiting speed grease bearing',
  'Compare dynamic load ratings',
  'Bearing for low friction application',
  'Bearing for compact assemblies',
  ]

  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [loadingSuggestions, setLoadingSuggestions] = useState(true)
  const [suggestionsData, setSuggestionsData] = useState([])
  const [suggestionsError, setSuggestionsError] = useState(null)

  // Dev-only fallback so the landing page isn’t empty when /api/suggestions isn’t wired yet.
  const allowMockFallback = import.meta.env.DEV && import.meta.env.VITE_ALLOW_MOCK_FALLBACK !== 'false'

  // useEffect(() => {
  //   // Basic unmount guard for async fetch.
  //   let cancelled = false

  //   const load = async () => {
  //     setLoadingSuggestions(true)
  //     setSuggestionsError(null)
  //     try {
  //       const res = await fetch('/api/suggestions')
  //       if (!res.ok) throw new Error('Failed to load suggestions')
  //       const json = await res.json()
  //       const items = Array.isArray(json?.items) ? json.items : []
  //       if (!cancelled) setSuggestionsData(items)
  //     } catch {
  //       if (cancelled) return
  //       if (allowMockFallback) {
  //         // setSuggestionsData(suggestionChips)
  //         setSuggestionsData(LOCAL_SUGGESTIONS)
  //         return
  //       }

  //       // In prod we’d rather show the error than silently hide backend issues.
  //       setSuggestionsError('Failed to loajyfjfd suggestions.')
  //       setSuggestionsData([])
  //     } finally {
  //       if (!cancelled) setLoadingSuggestions(false)
  //     }
  //   }

  //   load()
  //   return () => {
  //     cancelled = true
  //   }
  // }, [])
  useEffect(() => {
  // ✅ Use local suggestions directly (no API call)
  setSuggestionsData(LOCAL_SUGGESTIONS)
  setLoadingSuggestions(false)
}, [])


  const suggestions = useMemo(() => suggestionsData, [suggestionsData])

  // const handleSubmit = (nextQuery) => {
  //   const normalized = (nextQuery ?? query).trim()
  //   if (!normalized) return
  //   navigate(`/results?q=${encodeURIComponent(normalized)}`)
  // }

  const handleSubmit = async (nextQuery) => {
    const normalized = (nextQuery ?? query).trim()
    if (!normalized) return

    try {
      const res = await recommend(normalized).unwrap()
      console.log('API response:', res)

      // ✅ navigate AFTER success
      navigate(`/results?q=${encodeURIComponent(normalized)}`)
    } catch (err) {
      console.error(err)
    }
  }

  const handlePickSuggestion = (value) => {
    const normalized = (value ?? '').trim()
    if (!normalized) return
    navigate(`/results?q=${encodeURIComponent(normalized)}`)
  }

  if (loadingSuggestions && (suggestionsData?.length ?? 0) === 0) {
    return <LandingPageSkeleton />
  }

  return (
    <PublicLayout>
      <main className="relative z-10 flex min-h-[calc(100vh-80px)] w-full flex-col items-center justify-center px-6 py-10">
        <div className="w-full">
          <div className="mx-auto w-full max-w-3xl text-center">
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-brand-ink sm:text-6xl">
              Kyvo AI
              <br />
              Component Search Engine
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm text-brand-inkMuted">
              Instantly search across millions of components
              <br />
              using natural language
            </p>
          </div>

          <div className="mx-auto mt-8 w-full max-w-2xl">
            <SearchBar
              value={query}
              onChange={setQuery}
              onSubmit={handleSubmit}
              placeholder="Search bearings by designation, brand, or size (e.g., 7201-B-XL-JP, 12mm bore...)"
            />
          </div>

          <div className="mt-6 w-full">
            {suggestionsError ? (
              <div className="mb-3 rounded-2xl bg-brand-surface/70 px-4 py-3 text-xs text-brand-ink ring-1 ring-brand-border backdrop-blur">
                {suggestionsError}
              </div>
            ) : null}
            <SuggestionChips
              items={suggestions}
              onPick={handlePickSuggestion}
              loading={loadingSuggestions}
            />
          </div>
        </div>
      </main>

      <Footer />
    </PublicLayout>
  )
}

export default LandingPage
