import basket from "../../../../images/icons/deleteIcon.svg";
import "./TransactionTable.css";

export const TransactionTable = ({ transactions, onDelete }: { transactions: any[]; onDelete: (id: string) => void }) => {
  const ITEMS_COUNT = 8;
  
  const safeTransactions = transactions || [];
  const emptyRowsCount = Math.max(0, ITEMS_COUNT - safeTransactions.length);
  const emptyRows = Array(emptyRowsCount).fill(null);

  return (
    <div className="transaction-table">
      <ul className="table-header-row">
        <li className="table-header-cell">дата</li>
        <li className="table-header-cell">опис</li>
        <li className="table-header-cell">категорія</li>
        <li className="table-header-cell">сума</li>
        {/* <li className="table-header-cell"></li> */}
      </ul>

      <ul className="table-body-list">
        {safeTransactions.map((item) => (
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
        ))}

        {emptyRows.map((_, index) => (
          <li key={`empty-${index}`} className="mobile-transaction-item empty-row">
            <div className="mob-item-info">
              <span className="mob-item-title">&nbsp;</span>
              <div className="mob-item-subinfo">
                <span className="mob-item-date">&nbsp;</span>
                <span className="mob-item-cat">&nbsp;</span>
              </div>
            </div>
            <div className="mob-item-right">
              <span className="mob-item-sum">&nbsp;</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};