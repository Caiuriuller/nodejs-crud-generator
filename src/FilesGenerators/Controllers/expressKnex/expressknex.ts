import raw from "raw.macro";
import Handlebars from "handlebars";
import { Entity, Settings } from "../../../Application/types";
import { FileGenerator } from "../../types";

class ExpressKnexControllerGen extends FileGenerator {
  protected static getHbsTemplate(): HandlebarsTemplateDelegate<any> {
    const txt = raw("./template.hbs");
    const template = Handlebars.compile(txt);
    return template;
  }

  public static compileFile(
    entity: Entity | undefined,
    settings: Settings | undefined
  ): string {
    const template = ExpressKnexControllerGen.getHbsTemplate();

    if (entity !== undefined)
      entity.Name = ExpressKnexControllerGen.capitalizeFirstLetter(entity.name);

    return template({ ...settings, entity });
  }

  static capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

export default ExpressKnexControllerGen;
