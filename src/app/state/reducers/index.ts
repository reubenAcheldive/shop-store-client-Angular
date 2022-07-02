import { createReducer, on } from '@ngrx/store';

import { IUser } from 'src/app/Interfaces/auth/userInformation';
import { Categories } from 'src/app/Interfaces/categories';
import { ICities } from 'src/app/Interfaces/Cities';

import * as ShoppingActions from '../actions/shopping.actions';
import * as UserInformation from '../actions/user.actions';
import { IProduct } from '../../../app/Interfaces/Products';

import { AuthErrorLogin } from 'src/app/Interfaces/cart/Auth/Auth.error';
import { Cart, Item } from 'src/app/Interfaces/cart/GetCartUser';

export interface Shopping {
  categories: Categories[] | null;
  currentCategory?: string;
  products: IProduct[] | null;
  loading: boolean | null;
  authErrorLogin: AuthErrorLogin | null;
  error: null;
  infoLogin: IUser | null;
  isRegistered: boolean | null;
  citiesList: ICities[] | null;
  errorAlert: any;

  cartId: string | null;
  cartListProducts: Cart | null;

  getDetailsShipments: { city: string; address: string } | null;
  orderID: string | null;
  DateCreatedCart: number | Date | null;
  unavailableDates: string[] | null;
}

export const initialShoppingState: Shopping | null = {
  categories: null,
  products: null,
  loading: null,
  authErrorLogin: null,
  error: null,
  infoLogin: null,
  isRegistered: null, //check in register component if user can to continue with registration
  citiesList: null,
  errorAlert: null,

  cartId: null,
  cartListProducts: null,
  getDetailsShipments: null,
  orderID: '',
  DateCreatedCart: null,
  unavailableDates: null,
};

export const shoppingReducer = createReducer(
  initialShoppingState,
  on(ShoppingActions.fetchProductsInit, (state, payload) => ({
    ...state,
    currentCategory: payload.categoryId,
    loading: true,
  })),
  on(ShoppingActions.fetchCategories, (state) => ({
    ...state,
    loading: true,
  })),
  on(ShoppingActions.fetchCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories,
    loading: false,
  })),
  on(ShoppingActions.fetchCategoriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    errorAlert: error,
  })),
  on(ShoppingActions.fetchProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false,
  })),
  on(ShoppingActions.fetchProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    errorAlert: error,
  })),
  on(
    ShoppingActions.fetchSingleProductsBySearchSuccess,
    (state, { products }) => ({
      ...state,
      products,
      loading: false,
    })
  ),
  on(
    ShoppingActions.fetchSingleProductsBySearchFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      errorAlert: error,
    })
  ),
  on(UserInformation.loginInit, (state) => ({
    ...state,
    loading: true,
  })),
  on(
    UserInformation.loginInitSuccess,
    UserInformation.registerUserSuccess,
    (state, { infoLogin }) => ({
      ...state,
      infoLogin: infoLogin,
      loading: false,
      errorAlert: null,
    })
  ),
  on(UserInformation.loginInitFailure, (state, { error }) => ({
    ...state,
    authErrorLogin: error,
    loading: false,
  })),

  on(UserInformation.checkRegisterInit, (state, action) => ({
    ...state,
    id: action.id,
    loading: false,
  })),
  on(UserInformation.checkRegisterSuccess, (state, { success }) => ({
    ...state,
    isRegistered: success,
    loading: false,
    errorAlert: null,
  })),
  on(UserInformation.checkRegisterFailure, (state, { error }) => ({
    ...state,
    errorAlert: error,
    isRegistered: false,
    loading: false,
  })),
  on(UserInformation.registerUserFailure, (state, { error }) => ({
    ...state,
    errorInRegister: error.error.isError,
  })),
  on(ShoppingActions.fetchCitiesSuccess, (state, { cities }) => ({
    ...state,
    citiesList: cities,
  })),
  on(ShoppingActions.fetchCitiesFailure, (state, { error }) => ({
    ...state,
    errorAlert: error,
    loading: false,
  })),

  on(ShoppingActions.productEditByAdminInit, (state, { product }) => ({
    ...state,
    editProduct: product,
    loading: false,
  })),
  on(ShoppingActions.productEditByAdminSuccess, (state, { product }) => ({
    ...state,
    products: state.products.map((item) => {
      return item._id == product._id ? product : item;
    }),
    loading: false,
  })),

  on(
    ShoppingActions.successUpdateItemQuantityInCart,
    (state, { cartList }) => ({
      ...state,
      cartListProducts: cartList,
      products: updateProducts(state.products, cartList.items),
    })
  ),
  on(
    ShoppingActions.DeleteSingleProductFromCartListInit,
    (state, { itemId }) => ({
      ...state,
      cartListProducts: {
        ...state.cartListProducts,
        items: state.cartListProducts.items.filter(
          (item) => item._id !== itemId
        ),
      },
    })
  ),
  on(ShoppingActions.deleteAllItemsInCartSuccess, (state, {}) => ({
    ...state,
    cartListProducts: {
      ...state.cartListProducts,
      items: [],
    },
  })),

  on(ShoppingActions.getCartByCartIdSuccess, (state, { cart }) => ({
    ...state,
    cartListProducts: cart,
  })),
  on(
    ShoppingActions.getUserDetailsShipmentsSuccess,
    (state, { city, address }) => ({
      ...state,
      getDetailsShipments: { city, address },
    })
  ),
  on(ShoppingActions.lastOrderSuccess, (state, { OrderDetail }) => ({
    ...state,
    OrderDetail: OrderDetail,
  })),
  on(ShoppingActions.createNewOrderSuccess, (state, { _id }) => ({
    ...state,
    orderID: _id,
  })),
  on(ShoppingActions.fetchUnavailableDatesSuccess, (state, { date }) => ({
    ...state,
    unavailableDates: date,
  })),
  on(ShoppingActions.logOut, (state) => ({
    cartId: null,
    cartListProducts: null,
    cartMessage: null,
    categories: null,
    citiesList: null,
    editProduct: null,
    error: null,
    errorAlert: null,
    errorInRegister: null,
    getDetailsShipments: null,
    infoLogin: null,
    isRegistered: null,
    OrderDetail: null,
    loading: null,
    orderID: null,
    products: null,
    DateCreatedCart: null,
    unavailableDates: [],
    authErrorLogin: null,
  }))
);

const updateProducts = (products: IProduct[], items: Item[]): IProduct[] => {
  const updateProducts: IProduct[] = [...products];


     updateProducts.map((product)=>{
      const obj = Object.assign({},product)
      obj['quantity'] = 0;
      return obj
    })


  items.forEach((item: Item) => {
    const productId: string = item.productRefId._id;
    let index: number = updateProducts.findIndex((p) => p._id === productId);
    if (index > -1) {
      const product: IProduct = updateProducts[index];
      updateProducts.splice(index, 1, { ...product, quantity: item.quantity });
    }
  });
  return updateProducts;
};
