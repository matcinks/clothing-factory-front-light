import { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";

import ProductContext from "../../store/product-context";

const ProductsSearch = () => {
  const [insertedQuery, setInsertedQuery] = useState("");
  const { setSearchQuery } = useContext(ProductContext);

  const handleSearchInputChange = (e) => {
    setInsertedQuery(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(insertedQuery);
    }, 800);
    return () => {
      clearTimeout(timer);
    };
  }, [insertedQuery]);

  return (
    <Form.Control
      type="text"
      placeholder="Wyszukiwanie ..."
      value={insertedQuery}
      onChange={handleSearchInputChange}
    />
  );
};

export default ProductsSearch;
