import { useLoaderData } from "react-router-dom";

import PropertyList from "../components/common/PropertyList";

import { getSeamstresses, saveSeamstress, updateSeamstress } from "../util/api";

const SeamstressesLayout = () => {
  const data = useLoaderData();

  return <PropertyList propertiesList={data} />;
};

export default SeamstressesLayout;

export const loader = async () => {
  try {
    return await getSeamstresses();
  } catch (e) {
    console.log(e);
  }
};

export const action = async ({ request }) => {
  try {
    let seamstress = null;
    const formData = await request.formData();

    if (request.method === "PUT") {
      seamstress = JSON.parse(formData.get("updatedData"));
      await updateSeamstress(seamstress);
    }
    if (request.method === "POST") {
      seamstress = { name: JSON.parse(formData.get("newData")) };
      await saveSeamstress(seamstress);
    }
  } catch (e) {
    // throw e;
    console.log(e);
  }
};
