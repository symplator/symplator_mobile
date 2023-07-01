import {SymptomSchema} from './Symptom';
import Realm from 'realm';

export class SelectedSymptomListSchema extends Realm.Object<SelectedSymptomListSchema> {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  userId: string;
  symptoms: SymptomSchema[];
  createdAt!: Date;
  updatedAt!: Date;

  constructor(
    realm: Realm,
    {
      _id,
      title,
      userId,
      symptoms,
    }: {
      _id: Realm.BSON.ObjectId;
      title?: string;
      userId: string;
      symptoms: SymptomSchema[];
    },
  ) {
    super(realm, {
      _id,
      title,
      userId,
      symptoms,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static schema = {
    name: 'SelectedSymptomList',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      title: 'string',
      userId: 'string',
      symptoms: 'Symptom[]',
      createdAt: 'date',
      updatedAt: 'date',
    },
  };
}
