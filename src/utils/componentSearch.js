const norm = (v) => (v == null ? '' : String(v)).toLowerCase().trim()
const numTok = (t) => String(t).replace(/[^0-9.]/g, '')

export const parseSearchTokens = (query) => {
  const q = norm(query)
  if (!q) return []

  // Strip common filler words so “bearing bore 12mm” behaves like “12mm”.
  const ignored = new Set([
    'bore',
    'outer',
    'width',
    'diameter',
    'bearing',
    'mm',
    'by',
    'with',
    'for',
    'and',
    'or',
  ])

  return q
    .replace(/[“”"']/g, '')
    .split(/[\s,]+/)
    .map((t) => t.trim())
    .filter(Boolean)
    .filter((t) => !ignored.has(t))
}

const tokenMatches = (token, value) => {
  const v = norm(value)
  if (!v) return false
  if (v.includes(token)) return true

  const n = numTok(token)
  return n ? v.includes(n) : false
}

export const rowMatchesTokens = (row, tokens) => {
  if (!tokens.length) return true

  const fields = [
    row.designation,
    row.brand,
    row.product,
    row.category,
    row.boreDiameter,
    row.outerDiameter,
  ]

  return tokens.every((t) => fields.some((f) => tokenMatches(t, f)))
}

export const rankRow = (row, tokens) => {
  if (!tokens.length) return 0

  const d = norm(row.designation)
  const b = norm(row.brand)
  const p = norm(row.product)
  const c = norm(row.category)

  let score = 0
  for (const t of tokens) {
    const n = numTok(t)

    if (d) {
      // Bias hard toward designation matches (it’s basically the part number).
      if (d === t) score += 30
      else if (d.startsWith(t)) score += 18
      else if (d.includes(t)) score += 12
    }

    if (b && b.includes(t)) score += 8
    if (p && p.includes(t)) score += 7
    if (c && c.includes(t)) score += 6

    if (n) {
      // Numeric tokens are often sizes; match them against the diameter fields.
      if (String(row.boreDiameter) === n) score += 9
      if (String(row.outerDiameter) === n) score += 9
    }
  }

  return score
}

export const searchAndRank = (data, query) => {
  const rows = Array.isArray(data) ? data : []
  const tokens = parseSearchTokens(query)

  const matched = rows.filter((r) => rowMatchesTokens(r, tokens))

  if (!tokens.length) {
    return [...matched].sort((a, b) => norm(a.designation).localeCompare(norm(b.designation)))
  }

  return matched
    .map((row) => ({ row, score: rankRow(row, tokens) }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return norm(a.row.designation).localeCompare(norm(b.row.designation))
    })
    .map((x) => x.row)
}

const inRange = (value, range) => {
  if (!range) return true
  const v = Number(value)
  if (!Number.isFinite(v)) return range.min == null && range.max == null

  const min = range.min === '' ? null : range.min
  const max = range.max === '' ? null : range.max

  if (min != null && v < Number(min)) return false
  if (max != null && v > Number(max)) return false
  return true
}

export const applyFilters = (rows, filters) => {
  const brandSet = new Set(filters?.brands ?? [])
  const categorySet = new Set(filters?.categories ?? [])
  const n = filters?.numeric ?? {}

  return (rows ?? []).filter((r) => {
    if (brandSet.size && !brandSet.has(r.brand)) return false
    if (categorySet.size && !categorySet.has(r.category)) return false

    if (!inRange(r.boreDiameter, n.boreDiameter)) return false
    if (!inRange(r.outerDiameter, n.outerDiameter)) return false
    if (!inRange(r.width, n.width)) return false
    if (!inRange(r.DynamicLoadRating, n.DynamicLoadRating)) return false
    if (!inRange(r.StaticLoadRating, n.StaticLoadRating)) return false
    if (!inRange(r.limitingSpeedOil, n.limitingSpeedOil)) return false
    if (!inRange(r.limitingSpeedGrease, n.limitingSpeedGrease)) return false
    if (!inRange(r.mass, n.mass)) return false

    return true
  })
}

const rangeOf = (rows, get) => {
  let min = null
  let max = null

  for (const r of rows ?? []) {
    const v = Number(get(r))
    if (!Number.isFinite(v)) continue
    if (min === null || v < min) min = v
    if (max === null || v > max) max = v
  }

  return min === null || max === null ? null : { min, max }
}

const countsOf = (rows, get) => {
  const m = new Map()
  for (const r of rows ?? []) {
    const k = get(r)
    if (!k) continue
    m.set(k, (m.get(k) ?? 0) + 1)
  }

  return [...m.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) =>
      b.count !== a.count ? b.count - a.count : norm(a.value).localeCompare(norm(b.value))
    )
}

export const computeFacets = (rows) => ({
  numeric: {
    boreDiameter: rangeOf(rows, (r) => r.boreDiameter),
    outerDiameter: rangeOf(rows, (r) => r.outerDiameter),
    width: rangeOf(rows, (r) => r.width),
    DynamicLoadRating: rangeOf(rows, (r) => r.DynamicLoadRating),
    StaticLoadRating: rangeOf(rows, (r) => r.StaticLoadRating),
    limitingSpeedOil: rangeOf(rows, (r) => r.limitingSpeedOil),
    limitingSpeedGrease: rangeOf(rows, (r) => r.limitingSpeedGrease),
    mass: rangeOf(rows, (r) => r.mass),
  },
  brands: countsOf(rows, (r) => r.brand),
  categories: countsOf(rows, (r) => r.category),
})
