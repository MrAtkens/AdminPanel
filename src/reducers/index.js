import { combineReducers } from 'redux'
import categoriesReducer from './categoriesReducer'
import mailsReducer from './mailsReducer'
import usersReducer from './usersReducer'

export const rootReducer = combineReducers({
    categoriesReducer: categoriesReducer,
    mailsRedurcer: mailsReducer,
    usersReducer: usersReducer
})
