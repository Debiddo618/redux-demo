// Redux Store: Only one store for the entire application.
// It holds the application state.
// Allow access to state via getState().
// Allows state to be updated via dispatch(action).
// Registers listeners via subscribe(listener)
const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

// middleware
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

// Action is an object with a type property, it is the only way your application can interact with the store
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCK = "CAKE_RESTOCK";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCK = "ICECREAM_RESTOCK";

// Action creator is a function that returns an object
function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}

function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCK,
    payload: qty,
  };
}

function orderIceCream(qty = 1) {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
}
function restockIceCream(qty = 1) {
  return {
    type: ICECREAM_RESTOCK,
    payload: qty,
  };
}

// initial state of the application
// const initialState = {
//   numOfCakes: 10,
//   numsOfIceCream: 20
// };
const initialIceCreamState = {
  numsOfIceCream: 20,
};
const initialCakeState = {
  numOfCakes: 10,
};

// Reducers specify how the app's state changes in response to actions sent to the store.
// It is a function that accepts state and action as arguments, and returns the next state of the application
// In the simplest form: (previousState, action) => newState

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED: {
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    }
    case CAKE_RESTOCK: {
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    }
    default:
      return state;
  }
};
const iceCreamreducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED: {
      return {
        ...state,
        numsOfIceCream: state.numsOfIceCream - 1,
      };
    }
    case ICECREAM_RESTOCK: {
      return {
        ...state,
        numsOfIceCream: state.numsOfIceCream + action.payload,
      };
    }
    // this works for redux, but not redux-toolkit
    case CAKE_ORDERED: {
      return {
        ...state,
        numsOfIceCream: state.numsOfIceCream - 1,
      };
    }
    default:
      return state;
  }
};

// combine the reducers
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamreducer,
});

// the createStore method accepts a parameter, which is the reducer
const store = createStore(rootReducer, applyMiddleware(logger));

// get the initial state of the application
console.log("Initial State", store.getState());

// listen to changes to the state. Declaring unsubscribe to capture it and used to stop listening to changes.
const unsubscribe = store.subscribe(() => {
//   console.log("Updated state, ", store.getState());
});

// update the state of the application. dispatch accepts an action as its parameter
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(3));

const actions = bindActionCreators(
  { orderCake, restockCake, orderIceCream, restockIceCream },
  store.dispatch
);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);
actions.orderIceCream();
actions.orderIceCream();
actions.restockIceCream(2);

// stop listening
unsubscribe();
