import { Link } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import "../../util/style.css";

const Product = ({ product }) => {
  // console.log(product);
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
    price,
    sizes,
    unitUsage,
  } = product;

  const displayList = (list) => {
    let indexNumber = 0;
    let listToDisplay = "";
    const separator = ", ";
    list.map((elementList) => {
      indexNumber += 1;
      listToDisplay += elementList.name;
      if (indexNumber < list.length) {
        listToDisplay += separator;
      }
    });
    return listToDisplay;
  };

  const displayComposition = (composition) => {
    let indexNumber = 0;
    let compositionToDisplay = "";
    const separator = ", ";
    composition.map((elementList) => {
      indexNumber += 1;
      compositionToDisplay +=
        elementList.percentage + "% " + elementList.rawMaterial;
      if (indexNumber < composition.length) {
        compositionToDisplay += separator;
      }
    });
    return compositionToDisplay;
  };

  const displayMaterialsList = () =>
    materials.map((material) => {
      const composition = displayComposition(material.composition);
      return material.name + " | " + composition;
    });

  return (
    <Container>
      <Row>
        <Col>
          <Row className="border align-items-center">
            <Col
              style={{ backgroundColor: "" }}
              className="col-top-margin col-bottom-margin d-flex"
              lg={1}
            >
              <Link to={-1}>
                <ArrowBackIcon style={{ scale: "1.5" }} />
              </Link>
            </Col>
            <Col
              style={{ backgroundColor: "" }}
              className="col-top-margin col-bottom-margin"
              xl={4}
            >
              <h3>
                # {id} | {name ? name : "WZÓR"}
              </h3>
            </Col>
            <Col
              style={{ backgroundColor: "" }}
              className="col-top-margin col-bottom-margin d-flex justify-content-end"
              xl={{ span: 2, offset: 2 }}
            >
              <h5 className="category-title-decoration">{category}</h5>
            </Col>
            <Col
              style={{ backgroundColor: "" }}
              className="col-top-margin col-bottom-margin d-flex justify-content-end "
              xl={2}
            >
              utworzono
              <br />
              {new Date(createdAt).toLocaleDateString()}
            </Col>
            <Col
              style={{ backgroundColor: "" }}
              className="col-top-margin col-bottom-margin d-flex justify-content-end"
              xl={1}
            >
              <Link to={"/products/" + id + "/edit"} state={product}>
                <EditIcon style={{ scale: "1.5" }} />
              </Link>
            </Col>
          </Row>
          <Row>
            <Col
              xl={{ span: 4, offset: 1 }}
              className="col-top-margin col-bottom-margin"
            >
              <Row>
                <Col className="col-top-margin col-bottom-margin">
                  <div className="title">
                    <h6>Krótki opis produktu</h6>
                  </div>
                  <div className="content">{description}</div>
                </Col>
              </Row>
              <Row>
                <Col className="col-top-margin col-bottom-margin">
                  <div className="title">
                    <h6>Lista materiałów</h6>
                  </div>
                  <div className="content colours-list">
                    {displayMaterialsList()}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="col-top-margin col-bottom-margin">
                  <div className="title">
                    <h6>
                      Zużycie materiału: {materialUsage} {unitUsage}
                    </h6>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xl={3} className="col-top-margin col-bottom-margin">
              <Row>
                <Col className="col-top-margin col-bottom-margin">
                  <div className="title">
                    <h6>Lista kolorów</h6>
                  </div>
                  <div className="content colours-list">
                    {displayList(colours)}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="col-top-margin col-bottom-margin">
                  <div className="title">
                    <h6>Lista rozmiarów</h6>
                  </div>
                  <div className="content">{displayList(sizes)}</div>
                </Col>
              </Row>
              <Row>
                <Col className="col-top-margin col-bottom-margin">
                  <div className="title">
                    <h6>Aktualna cena: {price} PLN</h6>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xl={3} className="col-top-margin col-bottom-margin">
              <Row>
                <Col className="col-top-margin col-bottom-margin">
                  <div className="title">
                    <h6>Informacje szczegółowe</h6>
                  </div>
                  <div className="additional-content">
                    {additionalInformation}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="col-top-margin col-bottom-margin d-flex justify-content-center">
                  <Link to={"/products/" + id + "/archive"}>
                    <Button variant="outline-dark">Archiwum zmian</Button>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Product;
