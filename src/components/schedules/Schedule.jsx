import { useEffect, useState } from "react";
import { useNavigate, useSubmit } from "react-router-dom";

import { Container, Col, Row, Table } from "react-bootstrap";

import ScheduleNav from "./ScheduleNav";

import ScheduleListEntry from "./ScheduleListEntry";

import "../../util/style.css";

const Schedule = ({ fetchedSchedule, fetchedDate, seamstresses }) => {
  const [schedule, setSchedule] = useState([]);
  const [date, setDate] = useState();
  const [filterBySeamstress, setFilterBySeamstress] = useState("");

  const submit = useSubmit();
  const navigate = useNavigate();

  useEffect(() => setSchedule(fetchedSchedule), [fetchedSchedule]);

  useEffect(() => {
    setDate(fetchedDate);
  }, [fetchedDate]);

  useEffect(() => {
    if (filterBySeamstress) {
      const filteredSchedule = fetchedSchedule.filter(
        (entry) => entry.seamstressId === Number(filterBySeamstress)
      );
      setSchedule(filteredSchedule);
    } else {
      setSchedule(fetchedSchedule);
    }
  }, [filterBySeamstress, fetchedSchedule]);

  const handleUpdateDate = (newDate) => {
    const date = newDate.$d.toLocaleDateString("en-CA");
    setDate(date);
    navigate("/production/sewing/" + date);
  };

  const handleStatusChange = (id, status) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("status", status);
    submit(formData, { method: "PUT" });
  };

  const fillTable =
    schedule.length < 1 ? (
      <tr>
        <td colSpan={12}>Brak zaplanowanej produkcji</td>
      </tr>
    ) : (
      schedule.map((entry) => (
        <tr key={entry.id}>
          <ScheduleListEntry
            entry={entry}
            handleStatusChange={handleStatusChange}
          />
        </tr>
      ))
    );

  return (
    <Container>
      <ScheduleNav
        date={date}
        handleDateChange={handleUpdateDate}
        seamstresses={seamstresses}
        handleFilter={setFilterBySeamstress}
      />
      <Row>
        <Col>
          <Table bordered hover>
            <thead className="table-dark">
              <tr>
                <th> </th>
                <th> </th>
                <th>Pracownik</th>
                <th>Produkt</th>
                <th>Materiał</th>
                <th>Kolor</th>
                <th>Rozmiar</th>
                <th>Ilość</th>
                <th>Status</th>
                <th>Zmiana statusu</th>
                <th>Edycja</th>
              </tr>
            </thead>
            <tbody>{fillTable}</tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Schedule;
