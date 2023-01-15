import {
  useLoaderData,
  useLocation,
  useNavigate,
  redirect,
} from "react-router-dom";

import ProductForm from "../components/product/ProductForm";

import { updateProduct } from "../util/api";

const EditProduct = () => {
  const { state } = useLocation();
  const fetchedData = useLoaderData();
  const navigate = useNavigate();

  const handleCancelForm = () => {
    navigate(-1);
  };

  return (
    <>
      <ProductForm
        onCancel={handleCancelForm}
        fetchedData={fetchedData}
        product={state}
      />
    </>
  );
};

export default EditProduct;

// akcja zapisywania do bazy danych, dane z forma
export const action = async ({ request }) => {
  try {
    // pobranie danych z formularza
    const formData = await request.formData();

    // metoda pomocnicza, zagnieżdżająca obiekty (material, size, colour) w obiekcie product
    const transformDataIntoNestedObject = (element) =>
      formData.getAll(element).map((single) => ({ id: single }));

    // tworzenie obiektu produktu do przekazania w żądaniu PUT
    const product = {
      id: formData.get("id"),
      name: formData.get("name"),
      description: formData.get("description"),
      additionalInformation: formData.get("additionalInformation"),
      category: formData.get("category"),
      materials: transformDataIntoNestedObject("materials"),
      sizes: transformDataIntoNestedObject("sizes"),
      colours: transformDataIntoNestedObject("colours"),
      materialUsage: formData.get("materialUsage"),
      unitUsage: formData.get("unitUsage"),
      createdAt: formData.get("createdAt"),
      version: formData.get("version"),
      price: formData.get("price")
        ? Number(formData.get("price")).toFixed(2)
        : formData.get("price"),
    };

    const response = await updateProduct(product);
    return redirect("/products/" + product.id);
  } catch (err) {
    console.log(err);
    throw err;
  }
  // // tu ponizej przygotowane zabezpieczenie do przekazanie bledu walidacji formularza
  // if (response) {
  //   return response;
  // }
};
