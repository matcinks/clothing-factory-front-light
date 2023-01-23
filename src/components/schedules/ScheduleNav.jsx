import { Link } from "react-router-dom";

import { Button, Col, Row } from "react-bootstrap";

import ScheduleDatePicker from "./ScheduleDatePicker";
import ScheduleNavFilter from "./ScheduleNavFilter";

import "../../util/style.css";

const ScheduleNav = ({
  date,
  handleDateChange,
  seamstresses,
  handleFilter,
}) => {
  return (
    <Row>
      <Col>
        <Row>
          <Col className="col-top-margin col-bottom-margin">
            <Link to="/production/sewing/new">
              <Button variant="outline-dark">Dodaj szycie</Button>
            </Link>
          </Col>
          <Col className="col-top-margin col-bottom-margin" xl={3}>
            <ScheduleNavFilter
              filterList={seamstresses}
              handleFilter={handleFilter}
            />
          </Col>
          <Col
            className="col-top-margin col-bottom-margin d-flex justify-content-end"
            xl={2}
          >
            <ScheduleDatePicker
              date={date}
              handleDateChange={handleDateChange}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ScheduleNav;
