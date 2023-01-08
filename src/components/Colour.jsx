const Colour = ({ colourList }) => {
  const test = colourList.map((colour) => (
    <p key={colour.id}> {colour.name} </p>
  ));

  return (
    <div>
      Colour component
      {test}
    </div>
  );
};

export default Colour;
