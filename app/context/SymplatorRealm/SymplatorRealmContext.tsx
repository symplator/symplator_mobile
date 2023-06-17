import {createRealmContext} from '@realm/react';
// import {BodyPart} from './BodyPart';
// import {BodyPartTranslation} from './BodyPartTranslation';
import {Symptom} from '../../models/Symptom';
import {SymptomTranslation} from '../../models/SymptomTranslation';

export const SymplatorRealmContext = createRealmContext({
  schema: [Symptom, SymptomTranslation],
});
