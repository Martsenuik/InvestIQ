import './chart.css'

interface ChartItem {
    name: string,
    amount: number
}

interface ChartProps {
  data: ChartItem[];
}

export const Chart = ({data}: ChartProps) => {

  const maxAmount = Math.max(...data.map(item => item.amount));

  return (
    <div className="chart-container">
      <div className="bars-wrapper">
        {data.map((item, index) => {
          const heightPercent = (item.amount / maxAmount) * 100;
          const isDark = index % 2 === 0;

          return (
            <div className="bar-column" key={item.name}>
              <span className="bar-value">{item.amount} грн</span>
              <div className="bar-track">
                <div 
                  className={`bar-fill ${isDark ? 'dark' : 'light'}`} 
                  style={{ height: `${heightPercent}%` }}
                ></div>
              </div>
              <span className="bar-label">{item.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};












