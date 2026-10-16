import { TransactionTab } from "../../components/expense/transactionTab/TransactionTab"
import"./Expense.css"


export const ExpensesPage = () => {
    return (
        <section className="expense">
            <p className="expense-balance-p">Баланс:</p>
            <button className="expense-balance-money">00.00 UAH</button> 
            <button className="expense-succes-balance">Підтвердити</button>


            <button className="expense-btn-outgg">витрати</button>
            <button className="expense-btn-incmg">дохід</button>
            <TransactionTab/>
        </section>
    )
}