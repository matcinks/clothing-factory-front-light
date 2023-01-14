import { useLoaderData, useNavigate, redirect } from "react-router-dom";
import ProductForm from "../components/product/ProductForm";
import {
  getCategories,
  getColours,
  getMaterials,
  getSizes,
  saveProduct,
} from "../util/api";

// TODO
// W tej stronie powinna znajdowac sie informacja z ewentualnym bledem walidacji w formularzu
// Dodatkowo dodac informacje potwierdzajaca dodanie nowego produktu

const NewProduct = () => {
  // tu ponizej do zwrotki informacji z formularza
  // const data = useActionData();
  const fetchedData = useLoaderData();
  const navigate = useNavigate();

  const handleCancelForm = () => {
    navigate("/products");
  };

  return (
    <>
      <ProductForm onCancel={handleCancelForm} fetchedData={fetchedData} />
    </>
  );
};

export default NewProduct;

export const loader = async () => {
  const colours = await getColours();
  const sizes = await getSizes();
  const categories = await getCategories();
  const materials = await getMaterials();
  const returnedData = {
    colours: colours,
    sizes: sizes,
    categories: categories,
    materials: materials,
  };
  return returnedData;
  // return getColours();
};

export const action = async ({ request }) => {
  try {
    // pobranie danych z formularza
    const formData = await request.formData();

    // metoda pomocnicza, zagnieżdżająca obiekty (material, size, colour) w obiekcie product
    const transformDataIntoNestedObject = (element) =>
      formData.getAll(element).map((single) => ({ id: single }));

    // tworzenie obiektu produktu do przekazania w żądaniu POST
    const product = {
      name: formData.get("name"),
      description: formData.get("description"),
      additionalInformation: formData.get("additionalInformation"),
      category: formData.get("category"),
      materials: transformDataIntoNestedObject("materials"),
      sizes: transformDataIntoNestedObject("sizes"),
      colours: transformDataIntoNestedObject("colours"),
      materialUsage: formData.get("materialUsage"),
      unitUsage: formData.get("unitUsage"),
      price: formData.get("price"),
    };

    const response = await saveProduct(product);
  } catch (err) {
    throw err;
  }
  // tu ponizej przygotowane zabezpieczenie do przekazanie bledu walidacji formularza
  // if (response) {
  //   return response;
  // }

  return redirect("/products");
};
