import { createStore } from 'redux';
import { Provider, useStore} from 'react-redux'
import reducer from './reducers';
import React, { createContext, useContext } from "react";
 

let store = createStore(reducer,
  {
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: ''}

);

const StoreProvider = (props) => {

  return <Provider store={store} {...props}/>
}

const StoreContext = createContext();
 
const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
