import { useLocation, redirect } from "react-router-dom";

import EditProductForm from "../components/EditProductForm";
import { updateProduct } from "../util/api";

const EditProduct = () => {
  const { state } = useLocation();
  return (
    <>
      <EditProductForm product={state} />
    </>
  );
};

export default EditProduct;

// akcja zapisywania do bazy danych, dane z forma
export const action = async ({ request }) => {
  // console.log(request);

  // pobranie danych z formularza
  const formData = await request.formData();

  // metoda pomocnicza, zagnieżdżająca obiekty (material, size, colour) w obiekcie product
  const transformDataIntoNestedObject = (element) =>
    formData.getAll(element).map((single) => ({ id: single }));

  // tworzenie obiektu produktu do przekazania w żądaniu PUT
  const product = {
    id: formData.get("id"),
    version: formData.get("version"),
    price: formData.get("price"),
    name: formData.get("name"),
    description: formData.get("description"),
    additionalInformation: formData.get("additionalInformation"),
    category: formData.get("category"),
    materials: transformDataIntoNestedObject("materials"),
    sizes: transformDataIntoNestedObject("sizes"),
    colours: transformDataIntoNestedObject("colours"),
    materialUsage: formData.get("materialUsage"),
    unitUsage: formData.get("unitUsage"),
  };

  console.log(product);

  const response = await updateProduct(product);

  // tu ponizej przygotowane zabezpieczenie do przekazanie bledu walidacji formularza
  if (response) {
    return response;
  }

  return redirect("/products/" + product.id);
};
