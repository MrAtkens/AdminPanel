import { combineReducers } from 'redux'
import categoriesReducer from './categoriesReducer'


export const rootReducer = combineReducers({
    categoriesReducer: categoriesReducer,
})
