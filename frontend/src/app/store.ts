// @ts-ignore
import { configureStore } from '@reduxjs/toolkit'
// @ts-ignore
import { setupListeners } from '@reduxjs/toolkit/query'
import { usersApi } from './services/users'
import { tariffsApi } from  './services/tariffs'
import { servicesApi } from  './services/services'

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [tariffsApi.reducerPath]: tariffsApi.reducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
  },// @ts-ignore
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware, tariffsApi.middleware, servicesApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch