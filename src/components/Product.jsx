import EditProductButton from "./EditProductButton";

const Product = ({ product }) => {
  // TODO dodac info jak nie uda sie pobrac danych z backendu
  // bo teraz jest "cannot read property of undefined"
  // console.log(product);
  const {
    additionalInformation,
    category,
    colours,
    createdAt,
    description,
    id,
    materialUsage,
    materials,
    name,
    sizes,
    unitUsage,
  } = product;

  const coloursList = colours.map((colour) => colour.name + " ");
  const sizesList = sizes.map((size) => size.name + " ");
  const materialsList = materials.map((material) => material.name + " ");

  return (
    <div>
      <h1>
        Nr kat: {id}. {name}
      </h1>
      <h2>Kategoria: {category}</h2>
      <p>{additionalInformation}</p>
      <br />
      <p>Opis: {description}</p>
      <br />
      <p>
        Zużycie materiału: {materialUsage} {unitUsage}
      </p>
      <br />
      <p>Kolory: {coloursList}</p>
      <br />
      <p>Rozmiary: {sizesList}</p>
      <br />
      <p>Materiały: {materialsList}</p>
      <br />
      <p>Data utworzenia: {createdAt}</p>
      <br />
      <EditProductButton id={id} product={product} />
    </div>
  );
};

export default Product;
