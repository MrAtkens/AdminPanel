import { combineReducers } from 'redux'
import categoriesReducer from './categoriesReducer'
import mailsReducer from './mailsReducer'
import usersReducer from './usersReducer'
import productsReducer from './productsReducer'
import ordersReducer from './ordersReducer'
import newsReducer from './newsReducer'

export const rootReducer = combineReducers({
    categoriesReducer: categoriesReducer,
    productsReducer: productsReducer,
    ordersReducer: ordersReducer,
    mailsRedurcer: mailsReducer,
    usersReducer: usersReducer,
    newsReducer: newsReducer
})
