import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { garageAPI } from '../services/GarageService'
import { winnersAPI } from '../services/WinnersService'
import { engineAPI } from '../services/EngineService'

const rootReducer = combineReducers({
  [garageAPI.reducerPath]: garageAPI.reducer,
  [winnersAPI.reducerPath]: winnersAPI.reducer,
  [engineAPI.reducerPath]: engineAPI.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(garageAPI.middleware)
        .concat(winnersAPI.middleware)
        .concat(engineAPI.middleware),
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
