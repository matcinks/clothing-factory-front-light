import { redirect, useLoaderData, useNavigate } from "react-router-dom";

import MaterialForm from "../components/material/MaterialForm";
import { getRawMaterials, saveMaterial } from "../util/api";

const NewMaterial = () => {
  const rawMaterials = useLoaderData();
  const navigate = useNavigate();

  const handleCancelForm = () => {
    navigate(-1);
  };
  return (
    <MaterialForm rawMaterials={rawMaterials} onCancel={handleCancelForm} />
  );
};

export default NewMaterial;

export const loader = () => {
  return getRawMaterials();
};

export const action = async ({ request }) => {
  try {
    const formData = await request.formData();

    const rawMaterials = formData.getAll("rawMaterial");
    const percentages = formData.getAll("percentage");
    const composition = [];

    rawMaterials.forEach((element, index) => {
      composition.push({
        rawMaterial: element,
        percentage: percentages[index],
      });
    });

    const material = {
      name: formData.get("name"),
      additionalDescription: formData.get("additionalDescription"),
      composition: composition,
      price: formData.get("price"),
      priceUnit: formData.get("priceUnit"),
    };
    const response = await saveMaterial(material);
  } catch (e) {
    console.log(e);
    throw e;
  }
  return redirect("/products/materials");
};
