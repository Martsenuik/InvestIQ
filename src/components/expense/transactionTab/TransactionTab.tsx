import calendar from "../../../images/icons/calendar.svg";
import calculator from "../../../images/icons/calculator.svg";
import { SummarySection } from "./summarySection/SummarySection";
import { TransactionTable } from "./transactionTable/TransactionTable";
import { categories } from "../../../data/categories";
import basket from "../../../images/icons/basket.svg"
import "./transactionTab.css"


interface TransactionItem {
    _id?: string;
    id?: string;
    description?: string;
    date?: string;
    category?: string;
    amount: number;
  type?: string;
  
}

interface TransactionTabProps {
  type?: string;
  activeTab?: string;
  transactions?: any[];
  onDelete?: (id: string) => void;
  hideDate?: boolean;
}

export const TransactionTab = ({ type, activeTab, onDelete, transactions, hideDate }: TransactionTabProps) => {
  const today = new Date().toLocaleDateString('uk-UA');
  return (
    <div className="transaction-tab-container">
      <div className="transaction-tab-1and2">
        <div className="form-wrapper">
          {!hideDate && (
            <div className="form-calendar-wrapper">
              <img src={calendar} alt="calendar" className="form-calendar-icon" />
              <p className="form-calendar-date">{today}</p>
            </div>
          )}

          <div className="form-inputs-group-ALL">
             <div className="form-inputs-group">
                 <input type="text" placeholder="Опис товару" className="form-input-desc" />
                 
                 <select name="category" className="form-select-cat" required>
                   <option value="" disabled selected hidden>Категорія товару</option>
                   {categories.map((cat) => (
                     <option key={cat} value={cat}>
                       {cat}
                     </option>
                   ))}
              </select>
            </div>  
             <div className="calculator-group">   
                 <div className="form-amount-wrapper">
                   <input type="number" placeholder="00.00 UAH" className="form-input-amount" />
                   <img src={calculator} alt="calculator" className="form-calc-icon" />
              </div>
             </div>  
          </div>
          

               <div className="mobile-list-view">
                <ul className="mobile-transactions-list">
                 {transactions && transactions.length > 0 && (
                   transactions.map((item) => (
                     <li key={item._id || item.id} className="mobile-transaction-item">
                       <div className="mob-item-info">
                         <span className="mob-item-title">{item.description}</span>
                         <div className="mob-item-subinfo">
                           <span className="mob-item-date">{item.date}</span>
                           <span className="mob-item-cat">{item.category}</span>
                         </div>
                       </div>
                       <div className="mob-item-right">
                         <span className={`mob-item-sum ${item.amount < 0 ? 'red' : 'green'}`}>
                           {item.amount} грн.
                         </span>
                         <button 
                           className="mob-item-delete" 
                           onClick={() => onDelete && onDelete(item._id || item.id || '')}
                           aria-label="Видалити"
                         >
                           <img src={basket} alt="basket" />
                         </button>
                       </div>
                     </li>
                     ))
                     )}
                </ul>
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