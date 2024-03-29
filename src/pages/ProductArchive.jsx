import { useLoaderData } from "react-router-dom";

import ProductArchiveTable from "../components/product/ProductArchiveTable";
import { getProductArchive } from "../util/api";

const ProductArchive = () => {
  const productArchiveData = useLoaderData();
  return <ProductArchiveTable archiveData={productArchiveData} />;
};

export default ProductArchive;

export const loader = ({ params }) => {
  return getProductArchive(params.id);
};
