import { INVENTORY } from "../utils/reducerTypes";

export const inventoryReducer = (state, { type, payload }) => {
  switch (type) {
    case INVENTORY.FILTERS:
      return {
        ...state,
        [payload.name]: payload.value,
      };

    case INVENTORY.ADD_PRODUCT:
      return {
        ...state,
        inventory: [{ ...payload, id: Math.random() }, ...state.inventory],
      };
    default:
      return state;
  }
};
