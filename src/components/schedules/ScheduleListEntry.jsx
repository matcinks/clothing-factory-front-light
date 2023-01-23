import { Form, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import EditIcon from "@mui/icons-material/Edit";

import "./ScheduleListEntry.css";

const BEGIN = { text: "ROZPOCZNIJ", value: "W_TRAKCIE" };
const FINISH = { text: "ZAKOŃCZ", value: "GOTOWE" };
const CANCEL = { text: "PRZERWIJ", value: "PRZERWANE" };
const PLAN = { text: "ZAPLANOWANE", value: "ZAPLANOWANE" };

const ScheduleListEntry = ({ entry, handleStatusChange }) => {
  const {
    id,
    amount,
    colourName,
    materialId,
    materialName,
    priority,
    productId,
    productName,
    seamstressName,
    seamstressId,
    sizeName,
    status,
  } = entry;

  const changeStatusButton = (operation, variant) => (
    <Button
      variant={variant}
      size="sm"
      onClick={() => handleStatusChange(id, operation.value)}
    >
      {operation.text}
    </Button>
  );

  // tutaj moze useCallback
  const fillButtons = () => {
    switch (status) {
      case BEGIN.value:
        return (
          <>
            {changeStatusButton(CANCEL, "danger")}
            <br />
            <br /> {changeStatusButton(FINISH, "success")}
          </>
        );
      case FINISH.value:
        return "-";
      case CANCEL.value:
        return changeStatusButton(BEGIN, "warning");
      case PLAN.value:
        return changeStatusButton(BEGIN);
      default:
        return "-";
    }
  };

  return (
    <>
      <td>
        <Button size="sm" variant="warning" disabled={true}>
          <ArrowDropUpIcon />
        </Button>
      </td>
      <td>
        <Button size="sm" variant="warning">
          <ArrowDropDownIcon />
        </Button>
      </td>
      <td>{seamstressName}</td>
      <td>
        <Link to={"/products/" + productId} className="link-colour">
          {productName} | nr kat: {productId}
        </Link>
      </td>
      <td>
        {materialName} | nr: {materialId}
      </td>
      <td>{colourName}</td>
      <td>{sizeName}</td>
      <td>{amount}</td>
      <td className="schedule-status">{status.replace("_", " ")}</td>
      <td>
        <Form>{fillButtons()}</Form>
      </td>
      <td>
        <Link
          to={status === "GOTOWE" ? "#" : "/production/sewing/" + id + "/edit"}
          state={entry}
          className={status === "GOTOWE" ? "inactiveLink" : ""}
        >
          <EditIcon style={{ scale: "1.5" }} />
        </Link>
      </td>
    </>
  );
};

export default ScheduleListEntry;
