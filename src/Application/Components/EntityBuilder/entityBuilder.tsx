import React, { useState, useEffect } from "react";
import { Card, Form } from "react-bootstrap";
import { FieldItem } from "..";
import { ShadowBox } from "../../../Components";
import { Entity, EntityHolder, Field } from "../../types";

const INITIAL_FIELDS: Fields = {
  0: {
    id: 0,
    name: "_id",
    type: "integer",
    required: false,
    default: undefined,
    isPrimaryKey: true,
  },
};

const INITIAL_ENTITY: Entity = {
  name: "",
  tableName: "",
  importName: "",
  paginateObjectName: "",
  nameFirstLetterLowerCase: "",
  paginateResponseObjectName: "",
  fields: { ...INITIAL_FIELDS },
};

interface Props {
  onChange?: (obj: EntityHolder) => void;
}

interface Fields {
  [key: string]: Field;
}

const EntityBuilder: React.FC<Props> = (props) => {
  const [fields, setFields] = useState<Fields>(INITIAL_FIELDS);
  const [entity, setEntity] = useState<Entity>(INITIAL_ENTITY);

  function addField(field: Field) {
    const newFields = { ...fields };
    newFields[field.id] = field;

    setFields(newFields);
  }

  function handleDelete(id: number): void {
    const newFields = { ...fields };
    delete newFields[id];
    setFields(newFields);
  }

  function handleUpdateEntity(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    const { value, name } = event.target;
    const newEntity = { ...entity };
    newEntity[name] = value;
    newEntity.nameFirstLetterLowerCase = newEntity.name[0].toLowerCase() + newEntity.name.slice(1)
    setEntity(newEntity);
  }

  function handleUpdateField(obj: Field): void {
    const newFields = { ...fields };
    newFields[obj.id] = obj;
    setFields(newFields);
  }

  useEffect(() => {
    if (props.onChange) {
      const obj = { entity: { ...entity, fields } };
      props.onChange(obj);
    }
  }, [fields, entity, props]);

  return (
    <ShadowBox>
      <div className="d-flex flex-row">
        <div className="mr-2">
          <Form.Label>Entity Name:</Form.Label>
          <Form.Control
            type="text"
            style={{minWidth: "110px"}}
            placeholder="Enter entity Name"
            value={entity.name}
            name="name"
            onChange={handleUpdateEntity}
          />
          <Form.Text className="text-muted">Ex: UnidadeMedida</Form.Text>
        </div>
        <div className="mr-2">
          <Form.Label>Table name:</Form.Label>
          <Form.Control
            type="text"
            style={{minWidth: "110px"}}
            placeholder="Enter table Name"
            value={entity.tableName}
            name="tableName"
            onChange={handleUpdateEntity}
          />
          <Form.Text className="text-muted">Ex: unidades_medidas</Form.Text>
        </div>
        <div className="mr-2">
          <Form.Label>Import name:</Form.Label>
          <Form.Control
            type="text"
            style={{minWidth: "110px"}}
            placeholder="Enter import name"
            value={entity.importName}
            name="importName"
            onChange={handleUpdateEntity}
          />
          <Form.Text className="text-muted">Ex: unidade-medida</Form.Text>
        </div>
        <div className="mr-2">
          <Form.Label>Paginate object:</Form.Label>
          <Form.Control
            type="text"
            style={{minWidth: "110px"}}
            placeholder="Enter response object name"
            value={entity.paginateObjectName}
            name="paginateObjectName"
            onChange={handleUpdateEntity}
          />
          <Form.Text className="text-muted">Ex: unidadesMedida</Form.Text>
        </div>
      </div>
      <Form.Label className="mt-2">New Field:</Form.Label>
      <FieldItem addMode submitNew={addField} startId={1} />
      <Form.Label className="mt-3">Fields:</Form.Label>
      {Object.keys(fields)
        .reverse()
        .map((key) => {
          const field = fields[key];
          return (
            <FieldItem
              entityName={entity.name}
              key={field.id}
              fieldData={field}
              onDelete={handleDelete}
              onChange={handleUpdateField}
            />
          );
        })}
    </ShadowBox>
  );
};

export default EntityBuilder;
