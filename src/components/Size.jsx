const Size = ({ sizesList }) => {
  const nazwy = sizesList.map((size) => (
    <p key={size.id}>
      id: <b>{size.id}</b> + nazwa: <b>{size.name}</b> + utworzony:{" "}
      <b>{size.createdAt}</b>
    </p>
  ));

  return (
    <div>
      Komponent rozmiary!
      {nazwy}
    </div>
  );
};

export default Size;
