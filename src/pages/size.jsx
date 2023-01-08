import { useLoaderData } from "react-router-dom";

import Size from "../components/Size";
import { getSizes } from "../util/api";

const SizeRoute = () => {
  const sizesList = useLoaderData();

  return (
    <>
      <Size sizesList={sizesList} />
    </>
  );
};

export default SizeRoute;

export const loader = () => {
  return getSizes();
};
