import { useLoaderData } from "react-router-dom";
import PropertyList from "../components/common/PropertyList";

import { getColours, saveColour, updateColour } from "../util/api";

const ColoursLayout = () => {
  const coloursList = useLoaderData();

  return <PropertyList propertiesList={coloursList} />;
};

export default ColoursLayout;

export const loader = () => {
  return getColours();
};

export const action = async ({ request }) => {
  try {
    let colour = null;
    const formData = await request.formData();

    if (request.method === "PUT") {
      colour = JSON.parse(formData.get("updatedData"));
      await updateColour(colour);
    }
    if (request.method === "POST") {
      colour = { name: JSON.parse(formData.get("newData")) };
      await saveColour(colour);
    }
  } catch (e) {
    // throw e;
    console.log(e);
  }
};
