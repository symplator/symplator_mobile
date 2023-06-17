export const selectedSymptomsReducer = (
  state: SelectedSymptomList | undefined,
  action: SelectedSymptomListAction,
): SelectedSymptomList => {
  switch (action.type) {
    case 'UPDATE_DATA':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
