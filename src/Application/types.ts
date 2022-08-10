export interface Settings {
  files: {
    // controller: File;
    // migration: File;
    // model: File;
    // route: File;
    // validator: File;
    [key: string]: File;
  };
  methods: Methods;
}

export interface File {
  enabled: boolean;
  type: string;
}

export interface Files {
  controller: File;
  migration: File;
  model: File;
  validator: File;
}

export interface Methods {
  [key: string]: boolean;
}

export interface Entity {
  name: string;
  nameUpperCase: string;
  pluralName: string;
  nameFirstLetterLowerCase: string;
  paginateObjectName: string;
  tableName: string;
  importName: string;
  fields: { [key: string]: Field };
  [key: string]: any;
}

export interface EntityHolder {
  entity: Entity;
}

export interface Field {
  id: number;
  name: string;
  type: string;
  required: boolean;
  default: string | undefined;
  isPrimaryKey: boolean;
  [key: string]: any;
}

export interface TextFile {
  [key: string]: string;
}
