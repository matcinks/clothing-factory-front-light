import { redirect, useLoaderData } from "react-router-dom";

import ScheduleForm from "../components/schedules/ScheduleForm";

import {
  getColours,
  getMaterials,
  getProducts,
  getSeamstresses,
  getSizes,
  saveSewing,
} from "../util/api";

const NewSchedule = () => {
  const fetchedData = useLoaderData();

  return <ScheduleForm fetchedData={fetchedData} />;
};

export default NewSchedule;

export const action = async ({ request }) => {
  const formData = await request.formData();
  try {
    const newSchedule = {
      product: { id: formData.get("productId") },
      material: { id: formData.get("materialId") },
      colour: { id: formData.get("colourId") },
      size: { id: formData.get("sizeId") },
      seamstress: { id: formData.get("seamstressId") },
      amount: Number(formData.get("amount")),
      status: "ZAPLANOWANE",
      priority: 1,
      scheduledOn: formData.get("scheduledOn"),
    };

    const response = await saveSewing(newSchedule);
  } catch (err) {
    throw err;
  }

  return redirect("/production/sewing/" + formData.get("scheduledOn"));
};

export const loader = async () => {
  const seamstresses = await getSeamstresses();
  const colours = await getColours();
  const sizes = await getSizes();
  const materials = await getMaterials();
  const products = await getProducts();

  const returnedData = {
    seamstresses: seamstresses,
    colours: colours,
    sizes: sizes,
    materials: materials,
    products: products,
  };
  return returnedData;
};
