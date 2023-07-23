import {SymptomSchema} from './Symptom';
import Realm from 'realm';

export class SelectedSymptomListSchema extends Realm.Object<SelectedSymptomListSchema> {
  _id!: Realm.BSON.ObjectId;
  tag!: string;
  userId: string;
  date: Date;
  symptoms: SymptomSchema[];
  createdAt!: Date;
  updatedAt!: Date;

  constructor(
    realm: Realm,
    {
      _id,
      tag,
      userId,
      date,
      symptoms,
    }: {
      _id: Realm.BSON.ObjectId;
      tag?: string;
      userId: string;
      date: Date;
      symptoms: SymptomSchema[];
    },
  ) {
    super(realm, {
      _id,
      tag,
      userId,
      date,
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
      tag: 'string',
      userId: 'string',
      date: 'date',
      symptoms: 'Symptom[]',
      createdAt: 'date',
      updatedAt: 'date',
    },
  };
}
