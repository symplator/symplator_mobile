import {Realm} from '@realm/react';

export class SymptomTranslationSchema extends Realm.Object<SymptomTranslationSchema> {
  language!: string;
  name!: string;
  detail: string | undefined;
  tags: string | undefined;

  constructor(
    realm: Realm,
    language: string,
    name: string,
    detail?: string,
    tags?: string,
  ) {
    super(realm, {language, name, detail, tags});
  }

  static schema = {
    name: 'SymptomTranslation',
    embedded: true,
    properties: {
      language: 'string',
      name: 'string',
      detail: 'string?',
      tags: 'string?',
    },
  };
}
