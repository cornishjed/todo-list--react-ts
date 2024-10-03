interface editDataT {
  title: string;
  description?: string | undefined;
}

export const initialFormState: any = {
  title: "", // Initialize to avoid "Component Changing Uncontrolled" error
  description: "",
};

export const formReducer = (state: any, action: { data?: string | editDataT; type: string }) => {
  switch (action.type) {
    case "title":
      return {
        ...state,
        title: action.data,
      };
    case "description":
      return {
        ...state,
        description: action.data,
      };
    case "edit":
      if (typeof action.data === "object") {
        return {
          ...state,
          title: action.data!.title,
          description: action.data.description,
        };
      }
      return { ...state };

    case "clear":
      return {
        ...state,
        title: "",
        description: "",
      };
  }
};
