import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import EditIcon from "@mui/icons-material/Edit";

import "./ProductListEntry.css";

const ProductListEntry = ({ product }) => {
  const { category, description, id, name, price } = product;
  return (
    <>
      <td className="id">{id ? id : "-"}</td>
      <td className="name">{name ? name : "-"}</td>
      <td className="description">{description ? description : "-"}</td>
      <td className="category">{category ? category : "-"}</td>
      <td className="price">{price ? price : "-"}</td>
      <td className="details">
        {id ? (
          <Link to={"/products/" + id}>
            <Button variant="outline-dark" size="sm">
              <EditIcon />
            </Button>
          </Link>
        ) : (
          "-"
        )}
      </td>
    </>
  );
};

export default ProductListEntry;
