import React, { useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { StyledButton, StyledCheckbox } from "./styled";
import { Select } from "../../../Components";
import { BsFillTrashFill, BsPlus } from "react-icons/bs";
import { IconContext } from "react-icons/lib";
import { Field } from "../../types";
const INITIAL_STATE: Field = {
  id: 0,
  name: "",
  type: "",
  required: false,
  default: "",
};

interface Props {
  startId: number;
  onSumbmit: (newField: Field) => void;
  onChange: (newField: FieldTemp) => void;
  onDelete: (newField: number) => void;
  submitNew: (newField: Field) => void;
  addMode: boolean;
  fieldData: Field;
  children: React.ReactNode;
}

interface FieldTemp {
  [key: string]: any;
}

const FieldItem: React.FC<Props> = (props) => {
  const currentId = useRef(props.startId ? props.startId : 0);
  const [field, setField] = useState<Field>(INITIAL_STATE);

  useEffect(() => {
    if (props.fieldData) setField(props.fieldData);
  }, [props.fieldData]);

  function submitNew() {
    const fieldCopy: Field = { ...field };
    fieldCopy.id = currentId.current;
    if (props.submitNew) props.submitNew(fieldCopy);
    currentId.current++;

    setField({ ...INITIAL_STATE, type: fieldCopy.type, id: currentId.current });
  }

  function handleDelete() {
    if (props.onDelete) props.onDelete(field.id);
  }

  function handleChange(key: string, value: string | boolean | number) {
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChange("type", e.target.value);
          }}
        />
      </div>
      <div className="mr-2">
        <Form.Control
          type="text"
          placeholder="Default Value (optional)"
          value={field.default}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
            checked={field.required}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChange("required", !field.required);
            }}
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
};

export default FieldItem;
