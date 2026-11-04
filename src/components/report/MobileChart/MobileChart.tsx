import './mobileChart.css'

interface Transaction {
  description: string;
  category: string;
  amount: number;
  date: string;
  type: 'outgoing' | 'incoming' | 'income';
}

interface MobileChartProps {
  transactions?: Transaction[];
  selectedCategory?: string;
  reportType?: 'outgoing' | 'incoming';
  data?: { description: string; amount: number }[];
}

export const MobileChart = ({
  transactions = [],
  selectedCategory = '',
  reportType = 'outgoing',
  data,
}: MobileChartProps) => {
  const categoryTranslationMap: { [key: string]: string } = {
    'Products': 'Продукти',
    'Alcohol': 'Алкоголь',
    'Entertainment': 'Розваги',
    'Health': 'Здоров’я',
    'Transport': 'Транспорт',
    'Home': 'Все для дому',
    'Machinery': 'Техніка',
    'Utility Bills': 'Комуналка, зв’язок',
    'Sport': 'спорт, хобі',
    'Education': 'навчання',
    'Something Else': 'інше',
    'Salary': 'ЗП',
    'Add Work': 'Дод. прибуток',
  };

  let chartData: { description: string; amount: number }[] = [];

  if (data && data.length > 0) {
    chartData = data;
  } else if (transactions.length > 0 && selectedCategory) {
    const uaCategory = categoryTranslationMap[selectedCategory] || selectedCategory;

    const filtered = transactions.filter((item) => {
      const isOutgoing = item.type === 'outgoing';
      const isIncoming = item.type === 'incoming' || item.type === 'income';
      const matchesType = reportType === 'outgoing' ? isOutgoing : isIncoming;

      if (!matchesType) return false;

      return item.category === selectedCategory || item.category === uaCategory;
    });

    const grouped = filtered.reduce((acc: { [key: string]: number }, item) => {
      const desc = item.description || 'Інше';
      acc[desc] = (acc[desc] || 0) + Math.abs(Number(item.amount));
      return acc;
    }, {});

    chartData = Object.entries(grouped)
      .map(([description, amount]) => ({ description, amount }))
      .sort((a, b) => b.amount - a.amount);
  }

  if (chartData.length === 0) {
    return (
      <div className="mobile-chart-container empty">
        <p className="mobile-chart-empty-text">Немає даних для відображення</p>
      </div>
    );
  }

  const maxAmount = Math.max(...chartData.map((item) => item.amount), 1);

  return (
    <div className="mobile-chart-container">
      {chartData.map((item, index) => {
        const percentage = (item.amount / maxAmount) * 100;
        const isOrange = index % 3 === 0;

        return (
          <div key={index} className="mobile-chart-item">
            <div className="mobile-chart-info">
              <span className="mobile-chart-desc">{item.description}</span>
              <span className="mobile-chart-amount">{item.amount} грн</span>
            </div>
            <div className="mobile-bar-track">
              <div
                className={`mobile-bar-fill ${isOrange ? 'orange' : 'cream'}`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};