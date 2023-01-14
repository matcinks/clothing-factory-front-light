import { useLoaderData } from "react-router-dom";
import PropertyList from "../components/common/PropertyList";

import { getSizes, saveSize, updateSize } from "../util/api";

const SizesLayout = () => {
  const sizesList = useLoaderData();

  return <PropertyList propertiesList={sizesList} />;
};

export default SizesLayout;

export const loader = () => {
  return getSizes();
};

export const action = async ({ request }) => {
  try {
    let size = null;
    const formData = await request.formData();

    if (request.method === "PUT") {
      size = JSON.parse(formData.get("updatedData"));
      await updateSize(size);
    }
    if (request.method === "POST") {
      size = { name: JSON.parse(formData.get("newData")) };
      await saveSize(size);
    }
  } catch (e) {
    // throw e;
    console.log(e);
  }
};
