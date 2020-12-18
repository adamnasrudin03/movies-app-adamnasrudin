import { createStore, applyMiddleware } from "redux";
import reducers from "../../reducers";
import thunk from "redux-thunk";

const Store = createStore(reducers, applyMiddleware(thunk));

export default Store;
