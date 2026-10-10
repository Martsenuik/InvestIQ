import { TransactionTab } from "../../components/expense/transactionTab/TransactionTab"
import chart from "../../images/icons/chart.svg"


export const ExpensesPage = () => {
    return (
        <section>
            <p>Баланс:</p>
            <button>00.00 UAH</button> 
            <button>Підтвердити</button>

            <p>Перейти до розрахунків</p>
            <img src={chart} alt="chart" />

            <button>витрати</button>     <button>дохід</button>
            <TransactionTab/>
        </section>
    )
}