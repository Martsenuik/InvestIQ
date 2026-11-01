import "./SummarySection.css";

interface SummarySectionProps {
  summaryData: [string, number][];
  activeTab: string;
}

export const SummarySection = ({ summaryData, activeTab }: SummarySectionProps) => {
  
  const totalRows = 6;
  
  const rows = Array.from({ length: totalRows }, (_, index) => {
    return summaryData[index] || null; 
  });

  return (
    <div className="summary-wrapper">
      <div className="summary-title">ЗВЕДЕННЯ</div>
      
      <div className="summary-list-container">
        <ul className="summary-lines">
          {rows.map((item, index) => (
            <li key={index} className="summary-line-item">
              {item ? (
                <>
                  <span className="summary-month">{item[0]}</span>
                  <span className="summary-sum">{item[1].toLocaleString('uk-UA')} грн.</span>
                </>
              ) : (

                <span className="summary-empty-line">&nbsp;</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};