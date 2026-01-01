// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// export const api = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({
//     // Keeps API calls backend-friendly (same-origin by default, override via VITE_API_BASE_URL).
//     baseUrl: import.meta.env.VITE_API_BASE_URL ?? '/',
//   }),
//   endpoints: () => ({}),
// })


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://kyvo-mistral.vercel.app',
  }),
  endpoints: (builder) => ({
    recommend: builder.mutation({
      query: (queryText) => ({
        url: '/recommend',
        method: 'POST',
        body: { query: queryText },
      }),
    }),
  }),
})

export const { useRecommendMutation } = api
