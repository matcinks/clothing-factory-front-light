import { Link } from "react-router-dom";

const EditProductButton = ({ product }) => {
  return (
    <div>
      <Link to={"/products/" + product.id + "/edit"} state={product}>
        Edytuj produkt
      </Link>
    </div>
  );
};

export default EditProductButton;
