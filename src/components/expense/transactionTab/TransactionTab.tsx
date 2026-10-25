import calendar from "../../../images/icons/calendar.svg";
import calculator from "../../../images/icons/calculator.svg";
import { SummarySection } from "./summarySection/SummarySection";
import { TransactionTable } from "./transactionTable/TransactionTable";
import { categories } from "../../../data/categories";
import basket from "../../../images/icons/basket.svg"
import arrow from '../../../images/icons/arrow.svg'
import { useState } from "react";
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
  onBackWelc?: () => void;
  onAddTransaction?: (transaction: { description: string; category: string; amount: number }) => void;
  mobileStep?: string;
  initialBalance?: number;
}

export const TransactionTab = ({ type, onDelete, transactions, hideDate, onBackWelc, onAddTransaction, mobileStep, initialBalance }: TransactionTabProps) => {
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState<string | number>('');
    
  const today = new Date().toLocaleDateString('uk-UA');

  const handleSubmit = () => {
    if (!description || !category || !amount) return;
    const numericAmount = type === 'income' ? Number(amount) : -Math.abs(Number(amount));
    if (onAddTransaction) {
      onAddTransaction({ description, category, amount: numericAmount });
    }
    handleClear();
  };

    const handleClear = () => {
    setDescription('');
    setCategory('');
    setAmount('');
  };

return (
    <div className="transaction-tab-container">
      <div className="transaction-tab-1and2">
        
      {mobileStep === 'add-transaction' && (
        <button className="btn-arrow" onClick={onBackWelc}>
          <img src={arrow} alt="arrow" />
        </button>
      )}

        {mobileStep !== 'main' && (
          <div className="form-wrapper">
            {hideDate && (
              <div className="form-calendar-wrapper">
                <img src={calendar} alt="calendar" className="form-calendar-icon" />
                <p className="form-calendar-date">{today}</p>
              </div>
            )}

            <div className="form-inputs-group-ALL">
               <div className="form-inputs-group">
                <input
                  type="text"
                  value={description}
                  placeholder="Опис товару"
                  className="form-input-desc"
                  onChange={(e) => setDescription(e.target.value)}
                />
                   
                <select
                  name="category"
                  className="form-select-cat"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                     <option value="" disabled hidden>Категорія товару</option>
                     {categories.map((cat) => (
                       <option key={cat} value={cat}>
                         {cat}
                       </option>
                     ))}
                </select>
               </div>  
               <div className="calculator-group">   
                   <div className="form-amount-wrapper">
                <input
                  type="number"
                  value={amount}
                  placeholder="00.00 UAH"
                  className="form-input-amount"
                  onChange={(e) => setAmount(e.target.value)}
                />
                       <img src={calculator} alt="calculator" className="form-calc-icon" />
               </div>
              </div>   
            </div>
             
            <div className="form-buttons-group">
               <button className="form-btn-submit" onClick={handleSubmit}>ввести</button>
               <button className="form-btn-clear" onClick={handleClear}>Очистити</button>
            </div>
          </div>
        )}


        {mobileStep === 'main' && (
        <div className="mobile-list-view">
          
          <div className="form-calendar-wrapper" style={{ justifyContent: 'center', margin: '20px 0' }}>
       <img src={calendar} alt="calendar" className="form-calendar-icon" />
       <p className="form-calendar-date">{today}</p>
          </div>
          
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
        )}
             
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