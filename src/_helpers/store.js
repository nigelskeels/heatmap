// import { createStore, applyMiddleware } from 'redux';
// import thunkMiddleware from 'redux-thunk';
// import { createLogger } from 'redux-logger';
// import rootReducer from '../_reducers';

// const loggerMiddleware = createLogger();



// export const store = createStore(
//     rootReducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//     applyMiddleware(
//         thunkMiddleware,
//         loggerMiddleware
//     )
// );


import { createStore, applyMiddleware, compose  } from 'redux';
import Reactotron from '../ReactotronConfig'
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';

const loggerMiddleware = createLogger();



export const store = createStore(
    rootReducer,
    compose(
            applyMiddleware(
                thunkMiddleware,
                loggerMiddleware,
            ),
            Reactotron.createEnhancer(),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);