import { Outlet } from "react-router-dom";

import ProductionNavMenu from "../components/production/ProductionNavMenu";

const ProductionLayout = () => {
  return (
    <>
      <ProductionNavMenu />
      <Outlet />
    </>
  );
};

export default ProductionLayout;
