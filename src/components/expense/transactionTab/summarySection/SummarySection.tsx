import "./SummarySection.css"

export const SummarySection = () => {
  return (
    <table className="summary-table">
      <thead>
        <tr>
          <th colSpan={2} className="summary-header">ЗВЕДЕННЯ</th>
        </tr>
      </thead>
      <tbody>
        <tr className="summary-row">
          <td className="summary-month">ЛИСТОПАД</td>
          <td className="summary-value">10 000.00</td>
        </tr>
        <tr className="summary-row">
          <td className="summary-month">ЖОВТЕНЬ</td>
          <td className="summary-value">30 000.00</td>
        </tr>
        <tr className="summary-row">
          <td className="summary-month">ВЕРЕСЕНЬ</td>
          <td className="summary-value">30 000.00</td>
        </tr>
      </tbody>
    </table>
  );
};