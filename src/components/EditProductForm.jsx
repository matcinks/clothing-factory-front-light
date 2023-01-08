import { Form, useNavigate } from "react-router-dom";

const EditProductForm = ({ product }) => {
  const navigate = useNavigate();
  const {
    id,
    name,
    description,
    additionalInformation,
    category,
    materialUsage,
    unitUsage,
    price,
    materials,
    sizes,
    colours,
    version,
  } = product;
  // console.log(product);

  const materialsList = [
    {
      id: 1,
      additionalDesctiption:
        "kupowana w Zairze, sprawdzic czy belka jest biala",
      name: "koszulowka",
      price: 9,
      priceUnit: "zl/yard",
      composition: [
        {
          id: 1,
          rawMaterial: "BAWELNA",
          percentage: 95,
        },
        {
          id: 2,
          rawMaterial: "ELASTAN",
          percentage: 5,
        },
      ],
    },
  ];

  const sizesList = [
    {
      id: 1,
      name: "XS",
    },
    {
      id: 2,
      name: "S",
    },
    {
      id: 3,
      name: "M",
    },
  ];

  const coloursList = [
    {
      id: 1,
      name: "bez",
    },
    {
      id: 2,
      name: "bialy",
    },
    {
      id: 3,
      name: "ecru",
    },
    {
      id: 4,
      name: "błękit",
    },
  ];

  const formList = (listApi, listElement, listName) =>
    listApi.map((element) => {
      const isChecked = listApi.id === listElement.id ? true : false;
      return (
        <label key={element.id}>
          <input
            key={element.id}
            type="checkbox"
            value={element.id}
            name={listName}
            defaultChecked={isChecked}
          />
          {element.name}
        </label>
      );
    });

  return (
    <>
      <Form method="put" id="contact-form">
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="version" value={version} />
        <div>
          <label>
            <span>Nazwa</span>
            <input type="text" name="name" defaultValue={name} />
          </label>
          <label>
            <span>Opis</span>
            <input type="text" name="description" defaultValue={description} />
          </label>
          <label>
            <span>Dodatkowe informacje</span>
            <input
              type="text"
              name="additionalInformation"
              defaultValue={additionalInformation}
            />
          </label>
          <label>
            <span>Kategoria</span>
            <input type="text" name="category" defaultValue={category} />
          </label>
        </div>
        <br />
        <div>
          <span>Materiały</span>
          {formList(materialsList, materials, "materials")}
        </div>
        <div>
          <span>Rozmiary</span>
          {formList(sizesList, sizes, "sizes")}
        </div>
        <div>
          <span>Kolory</span>
          {formList(coloursList, colours, "colours")}
        </div>
        <br />
        <div>
          <label>
            <span>Cena</span>
            <input type="text" name="price" defaultValue={price} />
          </label>
          <label>
            <span>Zużycie materiału</span>
            <input
              type="text"
              name="materialUsage"
              defaultValue={materialUsage}
            />
          </label>
          <label>
            <span>Jednostka zużycia</span>
            <input type="text" name="unitUsage" defaultValue={unitUsage} />
          </label>
        </div>
        <br />
        <div>
          <button type="submit">Zaktualizuj</button>
          <button type="button" onClick={() => navigate(-1)}>
            Anuluj
          </button>
        </div>
      </Form>
    </>
  );
};

export default EditProductForm;
