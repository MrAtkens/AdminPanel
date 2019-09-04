import { combineReducers } from 'redux'
import categoriesReducer from './categoriesReducer'
import mailsReducer from './mailsReducer'
import usersReducer from './usersReducer'
import productsReducer from './productsReducer'

export const rootReducer = combineReducers({
    categoriesReducer: categoriesReducer,
    productsReducer: productsReducer,
    mailsRedurcer: mailsReducer,
    usersReducer: usersReducer
})
