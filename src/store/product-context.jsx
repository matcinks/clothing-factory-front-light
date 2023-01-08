import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const ProductContext = React.createContext({
  selectedCategories: [],
  setSelectedCategories: () => {},
});

export const ProductContextProvider = (props) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedCategoriesHandler = (arg) => {
    setSelectedCategories(arg);
  };

  return (
    <ProductContext.Provider
      value={{
        selectedCategories: selectedCategories,
        setSelectedCategories: selectedCategoriesHandler,
        searchQuery: searchQuery,
        setSearchQuery: setSearchQuery,
      }}
    >
      {props.children}
      <Outlet />
    </ProductContext.Provider>
  );
};

export default ProductContext;
