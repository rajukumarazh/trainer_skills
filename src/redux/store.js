import { applyMiddleware, createStore } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
const middlewares = [thunk];

var store = createStore(reducers,composeWithDevTools(applyMiddleware(...middlewares)));

export default store;
