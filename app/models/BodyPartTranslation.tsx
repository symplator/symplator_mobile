import {Realm} from '@realm/react';

export class BodyPartTranslation extends Realm.Object<BodyPartTranslation> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  language!: string;
  name!: string;

  constructor(realm: Realm, language: string, name: string) {
    super(realm, {language, name});
  }

  static schema = {
    name: 'BodyPartTranslation',
    embedded: true,
    properties: {
      _id: 'string',
      language: 'string',
      name: 'string',
    },
  };
}
