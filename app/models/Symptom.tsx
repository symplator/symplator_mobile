import {SymptomTranslation} from './SymptomTranslation';
import Realm from 'realm';

export class Symptom extends Realm.Object<Symptom> {
  _id!: string;
  bodyParts!: number[];
  translations!: SymptomTranslation[];

  constructor(
    realm: Realm,
    _id: string,
    bodyParts: number[],
    translations: SymptomTranslation[],
  ) {
    super(realm, {_id, bodyParts, translations});
  }

  static schema = {
    name: 'Symptom',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      body_parts: 'int[]',
      translations: 'SymptomTranslation[]',
    },
  };
}
