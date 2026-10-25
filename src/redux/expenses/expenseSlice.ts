import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";



export interface Expense {
    id: string;
    date: string;
    description: string;
    category: string;
    amount: number;
}

interface ExpensesState {
    items: Expense[];
}



const getUserEmail = () => localStorage.getItem("userEmail") || "guest";
const getStorageKey = () => `expenses_${getUserEmail()}`;


const loadUserExpenses = (): Expense[] => {
    const saved = localStorage.getItem(getStorageKey());
    return saved ? JSON.parse(saved) : [];
};


const initialState: ExpensesState = {
    items: loadUserExpenses(),
};

const expenseSlice = createSlice({
    name: 'expense', 
    initialState,
    reducers: {
        addExpense: (state, action) => {
            const newExpense = {
                id: Date.now().toString(),
                date: new Date().toLocaleDateString(),
                ...action.payload,
            }
            state.items.push(newExpense)
            localStorage.setItem(getStorageKey(), JSON.stringify(state.items));
        },
        deleteExpense: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item: Expense) => item.id !== action.payload);
            localStorage.setItem(getStorageKey(), JSON.stringify(state.items));
        },
    }

})


export const { addExpense, deleteExpense } = expenseSlice.actions;
export const expenseReducer = expenseSlice.reducer 