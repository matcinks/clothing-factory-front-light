import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import MaterialForm from "../components/material/MaterialForm";

import { getMaterial, getRawMaterials, updateMaterial } from "../util/api";

const EditMaterial = () => {
  const navigate = useNavigate();
  const data = useLoaderData();

  const handleCancelForm = () => {
    navigate(-1);
  };

  return (
    <MaterialForm
      rawMaterials={data.rawMaterials}
      onCancel={handleCancelForm}
      materialToEdit={data.material}
    />
  );
};

export default EditMaterial;

export const loader = async ({ params }) => {
  let material;
  let rawMaterials;

  try {
    material = await getMaterial(params.id);
    rawMaterials = await getRawMaterials();
  } catch (e) {
    console.log(e);
  }
  return { material: material, rawMaterials: rawMaterials };
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
      id: formData.get("id"),
      name: formData.get("name"),
      additionalDescription: formData.get("additionalDescription"),
      composition: composition,
      price: formData.get("price"),
      priceUnit: formData.get("priceUnit"),
    };

    const response = await updateMaterial(material);
    return redirect("/products/materials");
  } catch (err) {
    console.log(err);
    throw err;
  }
};
