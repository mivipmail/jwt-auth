import {configureStore} from '@reduxjs/toolkit'
import { reducer as formReducer } from 'redux-form'


let store = configureStore({
    reducer: {
        form: formReducer,
    }
})


export default store
