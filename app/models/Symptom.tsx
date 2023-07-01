import {SymptomTranslationSchema} from './SymptomTranslation';
import Realm from 'realm';

export class SymptomSchema extends Realm.Object<SymptomSchema> {
  _id!: string;
  bodyParts!: number[];
  translations!: SymptomTranslationSchema[];

  constructor(
    realm: Realm,
    _id: string,
    bodyParts: number[],
    translations: SymptomTranslationSchema[],
  ) {
    super(realm, {_id, bodyParts, translations});
  }

  static schema = {
    name: 'Symptom',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      body_parts: 'int[]', // todo clarify
      translations: 'SymptomTranslation[]',
    },
  };
}
