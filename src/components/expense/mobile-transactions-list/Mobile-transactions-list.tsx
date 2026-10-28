import basket from "../../../images/icons/basket.svg"
import "./mobile-transactions-list.css"


export const MobileTransactionsList = ({ transactions, onDelete }: { transactions: any[]; onDelete: (id: string) => void }) => {
    return (
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
    )
}
 


