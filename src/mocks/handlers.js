import { http, HttpResponse } from 'msw'

import Data from './Data'
import suggestionChips from './SuggestionChips'

export const handlers = [
  // These are dev mocks; keep the response shapes aligned with the real backend.
  http.get('/api/health', () => {
    return HttpResponse.json({
      ok: true,
      service: 'kyvo-ai',
    })
  }),

  http.get('/api/suggestions', () => {
    return HttpResponse.json({
      items: suggestionChips,
    })
  }),

  http.get('/api/components', () => {
    return HttpResponse.json({
      items: Data,
    })
  }),
]
