import calendar from "../../../images/icons/calendar.svg"
import calculator from "../../../images/icons/calculator.svg"


import { SummarySection } from "./summarySection/SummarySection"
import { TransactionTable } from "./transactionTable/TransactionTable"
import {categories} from "../../../data/categories"


export const TransactionTab = () => {


    return (
        <>
        <img src={calendar} alt="calendar" />
            <p>21.11.2019</p>

            <input type="text" placeholder="Опис товару" />
            <select name="category">
             <option value="">Категорія товару</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
            </select>
            <input type="number" placeholder="0,00" />
            <img src={calculator} alt="calculator" />

            <button>ввести</button>
            <button>Очистити</button>

           <TransactionTable />
            
            <SummarySection />
        </>
    )
}