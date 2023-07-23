interface SelectedSymptomListContext {
  data: SelectedSymptomList;
  isLoading?: boolean;
  updateData: (newData: SelectedSymptomList) => void;
  saveData: () => void;
}

interface SelectedSymptomList {
  _id?: import('realm').BSON.ObjectId;
  tag?: string;
  userId?: string;
  date?: Date;
  symptoms: Symptom[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface Symptom {
  _id: string;
  bodyParts: number[];
  translations: SymptomTranslation[];
}

interface SymptomTranslation {
  language: string;
  name: string;
  detail?: string;
  tags?: string;
}

type SelectedSymptomListAction = {
  type: 'UPDATE_DATA' | 'RESET_DATA';
  payload?: Partial<SelectedSymptomList>;
};
