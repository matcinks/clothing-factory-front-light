import { redirect, useLoaderData, useLocation } from "react-router-dom";

import ScheduleForm from "../components/schedules/ScheduleForm";

import {
  getColours,
  getMaterials,
  getProducts,
  getSeamstresses,
  getSizes,
  updateSewing,
} from "../util/api";

const EditSchedule = () => {
  const fetchedData = useLoaderData();
  const { state } = useLocation();

  return <ScheduleForm fetchedData={fetchedData} schedule={state} />;
};

export default EditSchedule;

export const action = async ({ request }) => {
  const formData = await request.formData();
  try {
    const updatedSchedule = {
      id: formData.get("id"),
      product: { id: formData.get("productId") },
      material: { id: formData.get("materialId") },
      colour: { id: formData.get("colourId") },
      size: { id: formData.get("sizeId") },
      seamstress: { id: formData.get("seamstressId") },
      amount: Number(formData.get("amount")),
      status: formData.get("status"),
      priority: formData.get("priority"),
      scheduledOn: formData.get("scheduledOn").substring(0, 10),
    };

    console.log(updatedSchedule);

    const response = await updateSewing(updatedSchedule);
  } catch (err) {
    throw err;
  }
  return redirect(
    "/production/sewing/" + formData.get("scheduledOn").substring(0, 10)
  );
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
