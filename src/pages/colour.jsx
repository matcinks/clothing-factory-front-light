import { useLoaderData } from "react-router-dom";

import Colour from "../components/Colour";
import { getColours } from "../util/api";

const ColourRoute = () => {
  const colourList = useLoaderData();

  return (
    <>
      <Colour colourList={colourList} />
    </>
  );
};

export default ColourRoute;

export const loader = () => {
  return getColours();
};
