import { useEffect, useState } from "react";
import {
  Button,
  Col,
  FormControl,
  FormLabel,
  FormSelect,
  Row,
} from "react-bootstrap";

import AddIcon from "@mui/icons-material/Add";

const AddComposition = ({
  rawMaterials,
  materialComposition,
  updateMaterialComposition,
}) => {
  const [composition, setComposition] = useState(materialComposition);

  useEffect(() => updateMaterialComposition(composition), [composition]);
  useEffect(() => setComposition(materialComposition), [materialComposition]);

  const handleAddCompositionComponent = () => {
    setComposition([...composition, { rawMaterial: "", percentage: 0 }]);
  };

  const handleRemoveCompositionComponent = (index) => {
    const compositionList = [...composition];
    compositionList.splice(index, 1);
    setComposition(compositionList);
  };

  const handleCompositionChange = (event, index) => {
    const { name, value } = event.target;
    const compositionList = [...composition];
    compositionList[index][name] = value;
    setComposition(compositionList);
  };

  const fillRawMaterialsList = rawMaterials.map((rawMaterial, index) => (
    <option key={index} value={rawMaterial}>
      {rawMaterial}
    </option>
  ));

  const fillCompositionAddingList = () => {
    if (composition.length > 0)
      return composition.map((component, index) => (
        <Row key={index} style={{ marginBottom: "10px" }}>
          <Col xl={7}>
            {index === 0 && <FormLabel>Surowiec</FormLabel>}
            <FormSelect
              aria-label="formComposition"
              name="rawMaterial"
              value={component.rawMaterial}
              onChange={(e) => handleCompositionChange(e, index)}
            >
              <option value="">wybierz materiał</option>
              {fillRawMaterialsList}
            </FormSelect>
          </Col>
          <Col xl={3}>
            {index === 0 && <FormLabel>Udział</FormLabel>}
            <FormControl
              type="number"
              name="percentage"
              value={component.percentage}
              onChange={(e) => handleCompositionChange(e, index)}
            />
          </Col>
          <Col xl={2}>
            {index === 0 && <FormLabel>Usuń</FormLabel>}
            <Button onClick={() => handleRemoveCompositionComponent(index)}>
              X
            </Button>
          </Col>
        </Row>
      ));
  };

  return (
    <Row>
      <Col>
        {fillCompositionAddingList()}
        <Row>
          <Col>
            <Button variant="warning" onClick={handleAddCompositionComponent}>
              <AddIcon />
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default AddComposition;
