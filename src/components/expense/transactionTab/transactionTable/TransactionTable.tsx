import deleteIcon from "../../../../images/icons/deleteIcon.svg";
import "./TransactionTable.css";

export const TransactionTable = () => {
  const emptyRows = Array(8).fill(null);

  return (
    <div className="transaction-table">
      <ul className="table-header-row">
        <li className="table-header-cell">дата</li>
        <li className="table-header-cell">опис</li>
        <li className="table-header-cell">категорія</li>
        <li className="table-header-cell">сума</li>
        <li className="table-header-cell"></li>
      </ul>

      <ul className="table-body-list">
        {emptyRows.map((_, index) => (
          <li key={index} className="table-body-row">
            <span className="table-body-cell cell-date"></span>
            <span className="table-body-cell cell-description"></span>
            <span className="table-body-cell cell-category"></span>
            <span className="table-body-cell cell-amount"></span>
            <span className="table-body-cell cell-action"></span>
          </li>
        ))}
      </ul>
    </div>
  );
};