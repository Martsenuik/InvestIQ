import calendar from "../../../images/icons/calendar.svg";
import calculator from "../../../images/icons/calculator.svg";
import { SummarySection } from "./summarySection/SummarySection";
import { TransactionTable } from "./transactionTable/TransactionTable";
import { categories } from "../../../data/categories";
import "./TransactionTab.css";

export const TransactionTab = () => {
  return (
    <div className="transaction-tab-container">
      <div className="transaction-tab-1and2">
      <div className="form-wrapper">
               <div className="form-calendar-wrapper">
                 <img src={calendar} alt="calendar" className="form-calendar-icon" />
                 <p className="form-calendar-date">21.11.2019</p>
               </div>

               <div className="form-inputs-group">
                 <input type="text" placeholder="Опис товару" className="form-input-desc" />
                 
                 <select name="category" className="form-select-cat">
                   <option value="">Категорія товару</option>
                   {categories.map((cat) => (
                     <option key={cat} value={cat}>
                       {cat}
                     </option>
                   ))}
                 </select>
                 
                 <div className="form-amount-wrapper">
                   <input type="number" placeholder="0,00" className="form-input-amount" />
                   <img src={calculator} alt="calculator" className="form-calc-icon" />
                 </div>
               </div>

               <div className="form-buttons-group">
                 <button className="form-btn-submit">ввести</button>
                 <button className="form-btn-clear">Очистити</button>
               </div>
      </div>
             
              <div className="tables-display-flex">
                <ul>
                <li>
                  <TransactionTable />
                </li>
          </ul>
          

          <ul>
               <li>
                 <SummarySection />
               </li>
             </ul> 
              </div>

      </div>

      
    </div>
  );
};