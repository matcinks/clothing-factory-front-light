import { Outlet } from "react-router-dom";

import ProductsNavMenu from "../components/product/ProductsNavMenu";

const ProductsLayout = () => {
  return (
    <>
      <ProductsNavMenu />
      <Outlet />
    </>
  );
};

export default ProductsLayout;
