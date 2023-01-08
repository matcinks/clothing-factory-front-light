const Sizes = ({ sizesList }) => {
  const sizes = sizesList.map((size) => <p key={size.id}>{size.name}</p>);

  return (
    <div>
      <h2>Dostępne rozmiary</h2>
      {sizes}
    </div>
  );
};

export default Sizes;
