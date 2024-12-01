import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ordered, restocked } from "./cakeSlice";

export const CakeView = () => {
  // used to extract data drom redux store state
  const numOfCakes = useSelector((state) => state.cake.numOfCakes);

  // returns a reference to the dispatch function from the redux store
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Number of Cakes - {numOfCakes}</h2>
      <button onClick={()=>dispatch(ordered())}>Order Cake</button>
      <button onClick={()=>dispatch(restocked(5))}>Restock Cakes</button>
    </div>
  );
};
