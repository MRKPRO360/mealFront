import { IRecipe } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface ICartMeals extends IRecipe {
  orderQuantity: number;
  selectedSize: keyof ICartMeals['portionSizes'];
}

interface IInitialState {
  meals: ICartMeals[];
  city: string;
  shippingAddress: string;
  name: string;
  email: string;
}

const initialState: IInitialState = {
  meals: [],
  city: '',
  shippingAddress: '',
  name: '',
  email: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addMeals: (state, { payload }) => {
      const mealToAdd = state.meals.find((meal) => meal._id === payload._id);

      const defaultSize = payload.selectedSize || 'small';

      if (!payload.portionSizes[defaultSize]) return;

      if (mealToAdd) {
        mealToAdd.orderQuantity += 1;
        return;
      }

      state.meals.push({
        ...payload,
        selectedSize: defaultSize,
        orderQuantity: 1,
      });
    },
    incrementOrderQuantity: (state, { payload }) => {
      const mealToAdd = state.meals.find((meal) => meal._id === payload);

      if (mealToAdd) {
        mealToAdd.orderQuantity += 1;
      }
      return;
    },
    decrementOrderQuantity: (state, { payload }) => {
      const mealToAdd = state.meals.find((meal) => meal._id === payload);

      if (mealToAdd) {
        mealToAdd.orderQuantity -= 1;
      }
      return;
    },

    removeMeals: (state, { payload }) => {
      const mealToRemove = state.meals.find((meal) => meal._id === payload);

      if (mealToRemove) {
        state.meals = state.meals.filter((meal) => meal._id !== payload);
      }
      return;
    },
    updatePortionSize: (
      state,
      action: PayloadAction<{
        id: string;
        size: keyof ICartMeals['portionSizes'];
      }>
    ) => {
      const meal = state.meals.find((meal) => meal._id === action.payload.id);
      if (meal) {
        meal.selectedSize = action.payload.size;
        meal.orderQuantity = 1; // Reset quantity when portion size changes
      }
    },
    updateAddress: (state, { payload }) => {
      state.city = payload.city;
      state.shippingAddress = payload.street;
      state.name = payload.name;
      state.email = payload.email;
    },
    clearCart: (state) => {
      state.meals = [];
      state.city = '';
      state.shippingAddress = '';
    },
  },
});

export const selectCartMeals = (state: RootState) => state.cart.meals;

// PAYMENT
export const orderSelector = (state: RootState) => {
  return {
    meals: state.cart.meals.map((meal) => ({
      meal: meal._id,
      selectedSize: meal.selectedSize,
      quantity: meal.orderQuantity,
    })),
    shippingAddress: `${state.cart.shippingAddress}- ${state.cart.city}`,
  };
};

export const subTotalSelector = (state: RootState) => {
  return state.cart.meals.reduce((acc, meal) => {
    return (
      acc +
      Number(meal.portionSizes[meal.selectedSize].price) * meal.orderQuantity
    );
  }, 0);
};

export const shippingCostSelector = (state: RootState) => {
  if (state.cart.meals.length <= 0 || !state.cart.city) return 0;
  else if (state.cart.city === 'dhaka') return 5;
  else if (state.cart.city !== 'dhaka') return 10;
  else return 0;
};

export const grandTotalSelector = (state: RootState) => {
  const subTotal = subTotalSelector(state);
  const shippingCost = shippingCostSelector(state);
  // WILL BE IMPLEMENTED IN FUTURE!!!!!!!
  // const discountAmount = discountAmountSelector(state);
  // return subTotal - discountAmount + shippingCost;
  return subTotal + shippingCost;
};

// ADDRESS
export const citySelector = (state: RootState) => {
  return state.cart.city;
};
export const shippingAddressSelector = (state: RootState) => {
  return state.cart.shippingAddress;
};

export const userNameAndEmailSelector = (state: RootState) => {
  return {
    name: state.cart.name,
    email: state.cart.email,
  };
};

export const {
  addMeals,
  removeMeals,
  clearCart,
  incrementOrderQuantity,
  decrementOrderQuantity,
  updatePortionSize,
  updateAddress,
} = cartSlice.actions;

export default cartSlice.reducer;
