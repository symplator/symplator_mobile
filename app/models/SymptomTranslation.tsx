import {Realm} from '@realm/react';

export class SymptomTranslation extends Realm.Object<SymptomTranslation> {
  language!: string;
  name!: string;
  detail!: string;
  tags!: string;

  constructor(
    realm: Realm,
    language: string,
    name: string,
    detail: string,
    tags: string,
  ) {
    super(realm, {language, name, detail, tags});
  }

  static schema = {
    name: 'SymptomTranslation',
    embedded: true,
    properties: {
      language: 'string',
      name: 'string',
      detail: 'string',
      tags: 'string',
    },
  };
}
