import { useLoaderData } from "react-router-dom";
import EditProductButton from "../components/EditProductButton";

import Product from "../components/Product";
import { getProduct } from "../util/api";

const ProductDetailPage = () => {
  const productData = useLoaderData();
  return (
    <>
      <Product product={productData} />
      {/* <EditProductButton id={productData.id} /> */}
      {/* TUTAJ MUSI BYĆ LINK DO EDYCJI */}
    </>
  );
};

export default ProductDetailPage;

export const loader = ({ params }) => {
  return getProduct(params.id);
};
