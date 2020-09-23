import React, { useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { StyledButton, StyledCheckbox } from "./styled";
import { Select } from "../../../Components";
import { BsFillTrashFill, BsPlus } from "react-icons/bs";
import { IconContext } from "react-icons/lib";

const INITIAL_STATE = {
  id: 0,
  name: "",
  type: "",
  required: false,
  default: "",
};

function FieldItem(props) {
  const currentId = useRef(props.startId ? props.startId : 0);
  const [field, setField] = useState(INITIAL_STATE);

  useEffect(() => {
    if (props.fieldData) setField(props.fieldData);
  }, [props.fieldData]);

  function submitNew() {
    const fieldCopy = { ...field };
    fieldCopy.id = currentId.current;
    if (props.submitNew) props.submitNew(fieldCopy);
    currentId.current++;

    setField({ ...INITIAL_STATE, type: fieldCopy.type, id: currentId.current });
  }

  function handleDelete() {
    if (props.onDelete) props.onDelete(field.id);
  }

  function handleChange(key, value) {
    const newField = { ...field };
    newField[key] = value;
    if (props.onChange) props.onChange(newField);
    setField(newField);
  }

  return (
    <div className="d-flex flex-row mb-2">
      <div className="mr-2">
        <Form.Control
          type="text"
          placeholder="Field Name"
          value={field.name}
          onChange={(e) => {
            handleChange("name", e.target.value);
          }}
        />
        {props.addMode && (
          <Form.Text className="text-muted">Ex: name</Form.Text>
        )}
      </div>
      <div className="mr-2">
        <Select
          options={["integer", "string", "float", "boolean"]}
          value={field.type}
          onChange={(e) => {
            handleChange("type", e.target.value);
          }}
        />
      </div>
      <div className="mr-2">
        <Form.Control
          type="text"
          placeholder="Default Value (optional)"
          value={field.default}
          onChange={(e) => {
            handleChange("default", e.target.value);
          }}
        />
        {props.addMode && (
          <Form.Text className="text-muted">Ex: Arthur</Form.Text>
        )}
      </div>
      <div className="mr-2">
        <Form.Group controlId={`required-${field.id}`}>
          <StyledCheckbox
            type="checkbox"
            label="Required"
            className="form"
            value={true}
          />
        </Form.Group>
      </div>

      {props.addMode ? (
        <StyledButton variant="success" onClick={submitNew}>
          +
        </StyledButton>
      ) : (
        <StyledButton variant="outline-light" onClick={handleDelete}>
          <IconContext.Provider value={{ color: "#666" }}>
            <BsFillTrashFill />
          </IconContext.Provider>
        </StyledButton>
      )}
    </div>
  );
}

FieldItem.propsTypes = {
  onSumbmit: PropTypes.func,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
  addMode: PropTypes.bool,
  fieldData: PropTypes.object,
  startId: PropTypes.integer,
};

export default FieldItem;