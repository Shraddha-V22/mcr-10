import { INVENTORY } from "../utils/reducerTypes";

export const inventoryReducer = (state, { type, payload }) => {
  switch (type) {
    case INVENTORY.SET_INVENTORY:
      return {
        ...state,
        inventory: payload,
      };
    case INVENTORY.FILTERS:
      return {
        ...state,
        [payload.name]: payload.value,
      };

    case INVENTORY.ADD_PRODUCT: {
      const newInventory = [
        { ...payload, id: Math.random() },
        ...state.inventory,
      ];

      localStorage.setItem("inventory", JSON.stringify(newInventory));

      return {
        ...state,
        inventory: newInventory,
      };
    }
    default:
      return state;
  }
};
