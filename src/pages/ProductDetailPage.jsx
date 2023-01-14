import { useLoaderData } from "react-router-dom";

import Product from "../components/product/Product";
import { getProduct } from "../util/api";

const ProductDetailPage = () => {
  const productData = useLoaderData();
  return (
    <>
      <Product product={productData} />
    </>
  );
};

export default ProductDetailPage;

export const loader = ({ params }) => {
  return getProduct(params.id);
};
