const formatValue = (value) => {
  if (value === null || value === undefined || value === '') return '—'
  return String(value)
}

const UNITS = {
  boreDiameter: 'mm',
  outerDiameter: 'mm',
  width: 'mm',
  DynamicLoadRating: 'kN',
  StaticLoadRating: 'kN',
  limitingSpeedGrease: 'RPM',
  limitingSpeedOil: 'RPM',
  mass: 'kg',
}

const formatValueWithUnit = (key, value) => {
  const base = formatValue(value)
  if (base === '—') return base
  const unit = UNITS[key]
  if (!unit) return base

  const trimmed = String(base).trim()
  if (!trimmed) return base

  // Some sources already include units in the value; normalize to exactly one “value unit”.
  const unitLower = unit.toLowerCase()
  const trimmedLower = trimmed.toLowerCase()

  if (trimmedLower.endsWith(unitLower)) {
    const withoutUnit = trimmed.slice(0, Math.max(0, trimmed.length - unit.length)).trim()
    return withoutUnit ? `${withoutUnit} ${unit}` : trimmed
  }

  return `${trimmed} ${unit}`
}

const FIELDS = [
  { key: 'designation', label: 'Designation' },
  { key: 'brand', label: 'Brand' },
  { key: 'product', label: 'Product' },
  { key: 'category', label: 'Category' },
  { key: 'boreDiameter', label: 'Bore Diameter (mm)' },
  { key: 'outerDiameter', label: 'Outer Diameter (mm)' },
  { key: 'width', label: 'Width (mm)' },
  { key: 'DynamicLoadRating', label: 'Dynamic Load Rating (kN)' },
  { key: 'StaticLoadRating', label: 'Static Load Rating (kN)' },
  { key: 'limitingSpeedGrease', label: 'Limiting Speed Grease (RPM)' },
  { key: 'limitingSpeedOil', label: 'Limiting Speed Oil (RPM)' },
  { key: 'mass', label: 'Mass (kg)' },
  { key: 'speedRating', label: 'Speed Rating' },
  { key: 'nominalContactAngle', label: 'Nominal Contact Angle' },
]

const DetailsCard = ({ item, onBack }) => {
  if (!item) return null

  return (
    <section className="w-full rounded-2xl bg-brand-surface/70 ring-1 ring-brand-border backdrop-blur">
      <div className="border-b border-brand-border px-6 py-5">
        <div className="flex items-start justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            className="mt-0.5 shrink-0 rounded-xl px-3 py-2 text-xs font-semibold text-brand-ink ring-1 ring-brand-border transition hover:bg-brand-surfaceTint active:scale-[0.98]"
          >
            Back
          </button>

          <div className="flex-1 text-center">
            <div className="text-sm font-medium text-brand-primaryHover">
              {formatValue(item.designation)}
            </div>
            <div className="mt-1 text-xs text-brand-inkMuted">{formatValue(item.product)}</div>
          </div>

          <div className="hidden w-[66px] shrink-0 sm:block" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 px-6 py-6 sm:grid-cols-2">
        {FIELDS.map(({ key, label }) => (
          <div
            key={key}
            className="rounded-xl bg-brand-surface/60 px-4 py-3 ring-1 ring-brand-border/70 transition duration-150 hover:-translate-y-px hover:bg-brand-surfaceTint hover:ring-brand-primary/30 hover:shadow-sm"
          >
            <div className="text-[11px] font-semibold uppercase tracking-wide text-brand-inkMuted">
              {label}
            </div>
            <div className="mt-1 text-sm font-medium text-brand-ink">
              {formatValueWithUnit(key, item[key])}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default DetailsCard
