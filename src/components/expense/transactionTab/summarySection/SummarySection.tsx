import "./SummarySection.css";

export const SummarySection = () => {
  const emptyLines = Array(8).fill(null);

  return (
    <div className="summary-wrapper">
      <div className="summary-title">зведення</div>
      <ul className="summary-lines">
        {emptyLines.map((_, index) => (
          <li key={index} className="summary-line"></li>
        ))}
      </ul>
    </div>
  );
};