import React from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
import KitchenQueue from "../components/KitchenQueue"

const Home = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <ProductList />
      <Cart />
      <KitchenQueue />
    </div>
  );
};

export default Home;
