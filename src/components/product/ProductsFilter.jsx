import { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";

import { getCategories } from "../../util/api";

import ProductContext from "../../store/product-context";

const ProductsFilter = () => {
  const [categories, setCategories] = useState([]);

  const { selectedCategories, setSelectedCategories } =
    useContext(ProductContext);

  // useEffect zostanie uruchomiony tylko raz, ponieważ tablica zależności [] jest pusta,
  // nie będzie żadnej zmiany, dlatego funkcja nie zostanie wywołana ponownie
  // żeby uruchamiać funkcję ponownie, należałoby uzupełnić tablicę zależności o zmienne
  // zawarte wewnątrz hooka useEffect
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        fetchedCategories instanceof Error
          ? setCategories([])
          : setCategories(fetchedCategories);
      } catch (err) {
        console.log(err);
        throw err;
      }
    };
    loadCategories();
  }, []);

  // ustawienie wybranych kategorii do filtrowania wyników wyświeltania
  // tablica w storze globalnym dla produktu
  // przekazana do loadera pobierającego listę z BE
  const handleChange = (e) => {
    const selectedCategoryName = e.target.name;
    if (selectedCategories.includes(selectedCategoryName)) {
      return setSelectedCategories(
        selectedCategories.filter(
          (category) => category !== selectedCategoryName
        )
      );
    }
    setSelectedCategories([...selectedCategories, selectedCategoryName]);
  };

  const fillCategories =
    categories.length < 1 ? (
      <Form.Text>Lista dostępnych filtrów jest pusta</Form.Text>
    ) : (
      categories.map((category) => {
        return (
          <Form.Check
            key={categories.indexOf(category) + 1}
            type="checkbox"
            id={categories.indexOf(category) + 1}
            label={category}
            name={category}
            inline
            onChange={handleChange}
          />
        );
      })
    );

  return <Form>{fillCategories}</Form>;
};

export default ProductsFilter;
