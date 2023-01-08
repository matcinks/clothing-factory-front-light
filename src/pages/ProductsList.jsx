import { useContext, useEffect, useState } from "react";

import Products from "../components/Products";
import ProductsListButtons from "../components/ProductsListButtons";
import ProductContext from "../store/product-context";

import {
  getFilteredProducts,
  getProducts,
  getSearchedProducts,
  getSearchedAndFilteredProducts,
} from "../util/api";

const ProductsList = () => {
  const [productsList, setProductsList] = useState([]);
  const { searchQuery, selectedCategories } = useContext(ProductContext);

  const isSearchFieldFilled =
    typeof searchQuery === "string" && searchQuery.trim().length === 0
      ? false
      : true;

  const areCategoriesSelected =
    Array.isArray(selectedCategories) && selectedCategories.length
      ? true
      : false;

  const checkForErrorAndSetProductsList = (fetchedProductsList) =>
    fetchedProductsList instanceof Error
      ? setProductsList([])
      : setProductsList(fetchedProductsList);

  useEffect(() => {
    async function loadProductsList() {
      let fetchedProductsList = [];
      try {
        if (isSearchFieldFilled && areCategoriesSelected)
          fetchedProductsList = await getSearchedAndFilteredProducts(
            searchQuery,
            selectedCategories
          );
        else if (isSearchFieldFilled && !areCategoriesSelected)
          fetchedProductsList = await getSearchedProducts(searchQuery);
        else if (!isSearchFieldFilled && areCategoriesSelected)
          fetchedProductsList = await getFilteredProducts(selectedCategories);
        else fetchedProductsList = await getProducts();
        checkForErrorAndSetProductsList(fetchedProductsList);
      } catch (err) {
        console.log(err);
      }
    }
    loadProductsList();
  }, [searchQuery, selectedCategories]);

  return (
    <>
      <ProductsListButtons />
      <Products productsList={productsList} />
    </>
  );
};

export default ProductsList;
