import {createRealmContext} from '@realm/react';
// import {BodyPart} from './BodyPart';
// import {BodyPartTranslation} from './BodyPartTranslation';
import {SymptomSchema} from '../../models/Symptom';
import {SymptomTranslationSchema} from '../../models/SymptomTranslation';
import {SelectedSymptomListSchema} from '../../models/SelectedSymptomList';

export const SyncedRealmContext = createRealmContext({
  schema: [SymptomSchema, SymptomTranslationSchema],
});

export const LocalRealmContext = createRealmContext({
  schema: [SymptomSchema, SymptomTranslationSchema, SelectedSymptomListSchema],
  deleteRealmIfMigrationNeeded: true,
});
