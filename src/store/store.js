import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './rootReducer'
import { api } from './api/api'

export const store = configureStore({
  reducer: {
    // rootReducer is an object of slice reducers; RTK Query gets its own reducer slice.
    ...(rootReducer ?? {}),
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})
