import {createRealmContext} from '@realm/react';
// import {BodyPart} from './BodyPart';
// import {BodyPartTranslation} from './BodyPartTranslation';
import {Symptom} from './Symptom';
import {SymptomTranslation} from './SymptomTranslation';

export const SymplatorRealmContext = createRealmContext({
  schema: [Symptom, SymptomTranslation],
});
