import { useLoaderData } from "react-router-dom";

import Sizes from "../components/Sizes";
import { getSizes } from "../util/api";

const SizesList = () => {
  const sizesList = useLoaderData();

  return (
    <>
      <Sizes sizesList={sizesList} />;
    </>
  );
};

export default SizesList;

export const loader = () => {
  return getSizes();
};
