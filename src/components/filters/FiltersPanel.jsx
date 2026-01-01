import { useEffect, useMemo, useState } from 'react'
import FiltersPanelSkeleton from '../loading/FiltersPanelSkeleton'

const UNIT_BY_KEY = {
  boreDiameter: 'mm',
  outerDiameter: 'mm',
  width: 'mm',
  DynamicLoadRating: 'kN',
  StaticLoadRating: 'kN',
  limitingSpeedOil: 'RPM',
  limitingSpeedGrease: 'RPM',
  mass: 'kg',
}

const Section = ({ title, headerRight, children }) => {
  return (
    <div className="rounded-2xl bg-brand-surface/70 p-4 border border-brand-border backdrop-blur">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-semibold uppercase tracking-wide text-brand-inkMuted">{title}</div>
        {headerRight ? <div className="shrink-0">{headerRight}</div> : null}
      </div>
      <div className="mt-3 space-y-3">{children}</div>
    </div>
  )
}

const NumericRange = ({ label, range, value, onChange, step = '1', onEnter, unit = '', error }) => {
  const inputClassName = `h-9 w-full rounded-xl bg-brand-surface px-3 text-xs text-brand-ink ring-1 focus:outline-none focus:ring-2 ${
    error
      ? 'ring-red-400 focus:ring-red-400'
      : 'ring-brand-border focus:ring-brand-primary/40'
  }`

  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <div className="text-xs font-medium text-brand-ink">{label}</div>
        <div className="text-[11px] text-brand-inkMuted">
          {range ? `${range.min}${unit} - ${range.max}${unit}` : '—'}
        </div>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <input
          type="number"
          step={step}
          value={value?.min ?? ''}
          placeholder={range?.min ?? ''}
          onChange={(e) => onChange({ ...(value ?? {}), min: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              onEnter?.()
            }
          }}
          className={inputClassName}
        />
        <input
          type="number"
          step={step}
          value={value?.max ?? ''}
          placeholder={range?.max ?? ''}
          onChange={(e) => onChange({ ...(value ?? {}), max: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              onEnter?.()
            }
          }}
          className={inputClassName}
        />
      </div>
      {error ? <div className="mt-1 text-[11px] font-medium text-red-600">{error}</div> : null}
    </div>
  )
}

const CheckboxList = ({ items, selected, onToggle }) => {
  if (!items?.length) return <div className="text-xs text-brand-inkMuted">—</div>

  return (
    <div className="max-h-56 space-y-2 overflow-auto pr-1">
      {items.map((item) => {
        const checked = selected?.includes(item.value)

        return (
          <label key={item.value} className="flex cursor-pointer items-center justify-between gap-3">
            <span className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(item.value)}
                className="h-4 w-4 accent-brand-primary"
              />
              <span className="text-xs text-brand-ink">{item.value}</span>
            </span>
            <span className="text-[11px] text-brand-inkMuted">{item.count}</span>
          </label>
        )
      })}
    </div>
  )
}

const FiltersPanel = ({
  facets,
  filters,
  onChangeFilters,
  canClear,
  loading = false,
  showHeader = true,
}) => {
  const hasResults =
    (facets?.brands?.length ?? 0) > 0 ||
    (facets?.categories?.length ?? 0) > 0 ||
    Object.values(facets?.numeric ?? {}).some((r) => r)

  // Keep numeric inputs local so we don’t re-filter results on every keystroke.
  const [draftNumeric, setDraftNumeric] = useState(filters?.numeric ?? {})
  const [numericErrors, setNumericErrors] = useState({})

  useEffect(() => {
    setDraftNumeric(filters?.numeric ?? {})
  }, [filters?.numeric])

  // Only send filled ranges upstream; empty strings mean “unset”.
  const normalizedDraftNumeric = useMemo(() => {
    const out = {}
    for (const [key, range] of Object.entries(draftNumeric ?? {})) {
      const min = range?.min ?? ''
      const max = range?.max ?? ''
      if (min !== '' || max !== '') out[key] = { min, max }
    }
    return out
  }, [draftNumeric])

  const hasDraftNumeric = useMemo(() => {
    return Object.values(draftNumeric ?? {}).some((r) => r?.min || r?.max)
  }, [draftNumeric])

  const canClearLocal = canClear || hasDraftNumeric

  if (loading) {
    return <FiltersPanelSkeleton />
  }

  const updateDraftNumeric = (key, nextRange) => {
    setDraftNumeric({
      ...(draftNumeric ?? {}),
      [key]: nextRange,
    })

    setNumericErrors((current) => {
      if (!current?.[key]) return current
      const next = { ...(current ?? {}) }
      delete next[key]
      return next
    })
  }

  const applyNumeric = () => {
    const errors = {}

    // Validate ranges (and check facet bounds) so a typo doesn’t silently nuke the result list.
    for (const [key, range] of Object.entries(normalizedDraftNumeric ?? {})) {
      const facetRange = facets?.numeric?.[key]
      const unit = UNIT_BY_KEY[key] ?? ''

      const minStr = range?.min ?? ''
      const maxStr = range?.max ?? ''

      const min = minStr === '' ? null : Number(minStr)
      const max = maxStr === '' ? null : Number(maxStr)

      if (min !== null && !Number.isFinite(min)) {
        errors[key] = 'Min must be a valid number.'
        continue
      }

      if (max !== null && !Number.isFinite(max)) {
        errors[key] = 'Max must be a valid number.'
        continue
      }

      if (min !== null && max !== null && min > max) {
        errors[key] = 'Min must be less than or equal to Max.'
        continue
      }

      if (facetRange) {
        const fMin = facetRange?.min
        const fMax = facetRange?.max

        if (min !== null && Number.isFinite(fMin) && min < fMin) {
          errors[key] = `Min must be ≥ ${fMin}${unit}.`
          continue
        }

        if (min !== null && Number.isFinite(fMax) && min > fMax) {
          errors[key] = `Min must be ≤ ${fMax}${unit}.`
          continue
        }

        if (max !== null && Number.isFinite(fMin) && max < fMin) {
          errors[key] = `Max must be ≥ ${fMin}${unit}.`
          continue
        }

        if (max !== null && Number.isFinite(fMax) && max > fMax) {
          errors[key] = `Max must be ≤ ${fMax}${unit}.`
          continue
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      setNumericErrors(errors)
      return
    }

    setNumericErrors({})
    onChangeFilters({
      ...filters,
      numeric: normalizedDraftNumeric,
    })
  }

  const toggleValue = (key, value) => {
    const current = filters[key] ?? []
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
    onChangeFilters({ ...filters, [key]: next })
  }

  return (
    <aside className="flex h-full min-h-0 w-full flex-col">
      {showHeader ? (
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-brand-ink">Filters</div>
          <button
            type="button"
            disabled={!canClearLocal}
            onClick={() => {
              setDraftNumeric({})
              onChangeFilters({ brands: [], categories: [], numeric: {} })
            }}
            className="rounded-xl px-3 py-2 text-xs font-medium text-brand-primaryHover border border-brand-border transition hover:bg-brand-surfaceTint disabled:cursor-not-allowed disabled:opacity-50"
          >
            Clear
          </button>
        </div>
      ) : null}

      <div
        className={`${showHeader ? 'mt-4' : ''} flex-1 space-y-4 overflow-y-auto overscroll-contain p-1`}
      >
        {!hasResults ? (
          <div className="rounded-2xl bg-brand-surface/70 p-4 text-xs text-brand-inkMuted border border-brand-border backdrop-blur">
            No filters available — no results match the current search and filters.
          </div>
        ) : (
          <>
            <Section title="Brand">
              <CheckboxList
                items={facets?.brands ?? []}
                selected={filters?.brands ?? []}
                onToggle={(value) => toggleValue('brands', value)}
              />
            </Section>

            <Section title="Category">
              <CheckboxList
                items={facets?.categories ?? []}
                selected={filters?.categories ?? []}
                onToggle={(value) => toggleValue('categories', value)}
              />
            </Section>

            <Section
              title="Numeric filters"
              headerRight={
                <button
                  type="button"
                  onClick={applyNumeric}
                  className="rounded-xl px-3 py-2 text-xs font-semibold text-brand-surface shadow-sm transition duration-150 bg-brand-primary hover:bg-brand-primaryHover active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                >
                  Apply
                </button>
              }
            >
              <NumericRange
                label="Bore Diameter (mm)"
                range={facets?.numeric?.boreDiameter}
                value={draftNumeric?.boreDiameter}
                onChange={(v) => updateDraftNumeric('boreDiameter', v)}
                onEnter={applyNumeric}
                unit="mm"
                error={numericErrors?.boreDiameter}
              />
              <NumericRange
                label="Outer Diameter (mm)"
                range={facets?.numeric?.outerDiameter}
                value={draftNumeric?.outerDiameter}
                onChange={(v) => updateDraftNumeric('outerDiameter', v)}
                onEnter={applyNumeric}
                unit="mm"
                error={numericErrors?.outerDiameter}
              />
              <NumericRange
                label="Width (mm)"
                range={facets?.numeric?.width}
                value={draftNumeric?.width}
                onChange={(v) => updateDraftNumeric('width', v)}
                onEnter={applyNumeric}
                unit="mm"
                error={numericErrors?.width}
              />
              <NumericRange
                label="Dynamic Load Rating (kN)"
                range={facets?.numeric?.DynamicLoadRating}
                value={draftNumeric?.DynamicLoadRating}
                onChange={(v) => updateDraftNumeric('DynamicLoadRating', v)}
                step="0.01"
                onEnter={applyNumeric}
                unit="kN"
                error={numericErrors?.DynamicLoadRating}
              />
              <NumericRange
                label="Static Load Rating (kN)"
                range={facets?.numeric?.StaticLoadRating}
                value={draftNumeric?.StaticLoadRating}
                onChange={(v) => updateDraftNumeric('StaticLoadRating', v)}
                step="0.01"
                onEnter={applyNumeric}
                unit="kN"
                error={numericErrors?.StaticLoadRating}
              />
              <NumericRange
                label="Limiting Speed Oil (RPM)"
                range={facets?.numeric?.limitingSpeedOil}
                value={draftNumeric?.limitingSpeedOil}
                onChange={(v) => updateDraftNumeric('limitingSpeedOil', v)}
                onEnter={applyNumeric}
                unit="RPM"
                error={numericErrors?.limitingSpeedOil}
              />
              <NumericRange
                label="Limiting Speed Grease (RPM)"
                range={facets?.numeric?.limitingSpeedGrease}
                value={draftNumeric?.limitingSpeedGrease}
                onChange={(v) => updateDraftNumeric('limitingSpeedGrease', v)}
                onEnter={applyNumeric}
                unit="RPM"
                error={numericErrors?.limitingSpeedGrease}
              />
              <NumericRange
                label="Mass (kg)"
                range={facets?.numeric?.mass}
                value={draftNumeric?.mass}
                onChange={(v) => updateDraftNumeric('mass', v)}
                step="0.01"
                onEnter={applyNumeric}
                unit="kg"
                error={numericErrors?.mass}
              />
            </Section>
          </>
        )}
      </div>
    </aside>
  )
}

export default FiltersPanel
