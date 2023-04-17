import {Realm} from '@realm/react';
import {BodyPartTranslation} from './BodyPartTranslation';

export class BodyPart extends Realm.Object<BodyPart> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  id!: string;
  translations!: BodyPartTranslation[];

  constructor(realm: Realm, id: string, translations: BodyPartTranslation[]) {
    super(realm, {id, translations});
  }

  static schema = {
    name: 'BodyPart',
    embedded: true,
    properties: {
      _id: 'string',
      translations: 'BodyPartTranslation[]',
    },
  };
}
