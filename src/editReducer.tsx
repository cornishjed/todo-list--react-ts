export const initialEditState = {
  editing: false,
  editId: 0,
};

export const editReducer = (state: any, action: { id?: number, type: string }) => {
  switch (action.type) {
    case "start":
        return {
            ...state,
            editing: true,
            editId: action.id
        }
    case "end":
      return {
        ...state,
        editing: false,
        editId: 0
      };
  }
};
