import { useLoaderData } from "react-router-dom";

import Materials from "../components/material/Materials";

import { getMaterials } from "../util/api";

const MaterialsList = () => {
  const materialsList = useLoaderData();
  return <Materials materials={materialsList} />;
};

export default MaterialsList;

export const loader = () => {
  return getMaterials();
};
