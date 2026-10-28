import calendar from "../../../../images/icons/calendar.svg";
import { SummarySection } from "../summarySection/SummarySection";
import { TransactionTable } from '../transactionTable/TransactionTable';
import basket from "../../../../images/icons/basket.svg"
import arrow from '../../../../images/icons/arrow.svg'
import { useState } from "react";
import "./transactionTab.css"
import { FormInputsGroupALL } from "../../form-inputs-group-ALL/Form-inputs-group-ALL";
import { MobileTransactionsList } from "../../mobile-transactions-list/Mobile-transactions-list";


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

            <FormInputsGroupALL
              description={description}
              setDescription={setDescription} 
              category={category}
              setCategory={setCategory}
              amount={amount}
              setAmount={setAmount}
            />
             
            <div className="form-buttons-group">
               <button className="form-btn-submit" onClick={handleSubmit}>ввести</button>
               <button className="form-btn-clear" onClick={handleClear}>Очистити</button>
            </div>
          </div>
      )}
         
        {mobileStep === 'main' && (
          <div className="form-calendar-wrapper" style={{ justifyContent: 'center', margin: '20px 0' }}>
            <img src={calendar} alt="calendar" className="form-calendar-icon" />
            <p className="form-calendar-date">{today}</p>
          </div>
         )}


        {mobileStep === 'main' && (
        <MobileTransactionsList transactions={transactions || []} onDelete={onDelete || (() => {})} />
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