import {createSlice} from "@reduxjs/toolkit";
const cart = {
    items: [],
    totalItems:0,
    totalMoney: 0
}
export const cartSlice = createSlice({
    name: 'cart',
    initialState: cart,
    reducers: {
        // khai bao action
        addToCart: (state, action) => {
            state.items = [...state.items, action.payload];
            state.totalItems++;
            state.totalMoney += action.payload.price;
        },
        removeProduct: (state, action) => {
            let productDelete = action.payload;
            let products = state.items.filter(item => item.id != productDelete.id)
            state.items = products;
            state.totalItems--;
            state.totalMoney -= productDelete.price;
        }

    }
})

export const {addToCart, removeProduct} = cartSlice.actions
export default cartSlice.reducer
