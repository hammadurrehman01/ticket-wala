export const FORM_FILLED = "FORM_FILLED";
  
// Reducer
export const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_FILLED:
      const updateValues = {
        ...state.InputValues,
        [action.inputId]: action.value,
      };

      const updateValidities = {
        ...state.InputValidates,
        [action.inputId]: action.isValid,
      };

      let updatedFormIsValid = true;
      for (let key in updateValidities) {
        updatedFormIsValid = updatedFormIsValid && updateValidities[key];
      }
      return {
        InputValues: updateValues,
        InputValidates: updateValidities,
        formisValid: updatedFormIsValid,
      };
  }
  return state;
};

