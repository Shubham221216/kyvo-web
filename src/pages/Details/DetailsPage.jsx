import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { PublicLayout } from '../../components/layout'
import Footer from '../../components/layout/Footer'
import DetailsCard from '../../components/details/DetailsCard'
import Data from '../../mocks/Data'
import DetailsPageSkeleton from '../../components/loading/DetailsPageSkeleton'

const resolveItem = (items, idParam) => {
  if (!idParam) return null

  const byId = items.find((x) => String(x?.id) === String(idParam))
  if (byId) return byId

  const byDesignation = items.find((x) => String(x?.designation) === String(idParam))
  return byDesignation ?? null
}

const DetailsPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const location = useLocation()

  // If we came from Results, we already have the row in navigation state.
  const stateItem = location.state?.item

  const [item, setItem] = useState(stateItem ?? null)
  const [loading, setLoading] = useState(stateItem ? false : true)
  const [detailsError, setDetailsError] = useState(null)

  const allowMockFallback = import.meta.env.DEV && import.meta.env.VITE_ALLOW_MOCK_FALLBACK !== 'false'

  useEffect(() => {
    if (stateItem) return

    let cancelled = false

    // Direct deep-link: fetch the list and resolve by id (or designation as a fallback).

    const load = async () => {
      setLoading(true)
      setDetailsError(null)
      try {
        const res = await fetch('/api/components')
        if (!res.ok) throw new Error('Failed to load component details')
        const json = await res.json()
        const items = Array.isArray(json?.items) ? json.items : []
        const found = resolveItem(items, id)
        if (!cancelled) setItem(found)
      } catch {
        if (cancelled) return
        if (allowMockFallback) {
          const found = resolveItem(Data, id)
          setItem(found)
          return
        }

        setDetailsError('Failed to load component details.')
        setItem(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [id, stateItem])

  if (loading) {
    return <DetailsPageSkeleton />
  }

  return (
    <PublicLayout>
      <main className="relative z-10 flex min-h-[calc(100vh-80px)] w-full flex-col px-6 py-8">
        <div className="mx-auto w-full max-w-4xl">
          {detailsError ? (
            <div className="mb-4 rounded-2xl bg-brand-surface/70 px-6 py-4 text-sm text-brand-ink ring-1 ring-brand-border backdrop-blur">
              {detailsError}
            </div>
          ) : null}
          {item ? (
            <DetailsCard item={item} onBack={() => navigate(-1)} />
          ) : (
            <div className="rounded-2xl bg-brand-surface/70 px-6 py-8 text-sm text-brand-ink ring-1 ring-brand-border backdrop-blur">
              Component not found.
            </div>
          )}
        </div>
      </main>

      <Footer />
    </PublicLayout>
  )
}

export default DetailsPage
