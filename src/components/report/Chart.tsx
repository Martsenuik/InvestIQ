import './chart.css'


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './Chart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Transaction {
  description: string;
  category: string;
  amount: number;
  date: string;
  type: 'outgoing' | 'incoming' | 'income';
}

interface ChartProps {
  transactions: Transaction[];
  selectedCategory: any;
  reportType: 'outgoing' | 'incoming';
}

export const Chart = ({ transactions, selectedCategory, reportType }: ChartProps) => {
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

  const filteredTransactions = transactions.filter((item) => {
    const isOutgoing = item.type === 'outgoing';
    const isIncoming = item.type === 'incoming' || item.type === 'income';

    const matchesType = reportType === 'outgoing' ? isOutgoing : isIncoming;
    if (!matchesType) return false;

    const uaCategory = categoryTranslationMap[selectedCategory] || selectedCategory;
    return item.category === selectedCategory || item.category === uaCategory;
  });

  const groupedData = filteredTransactions.reduce((acc: { [key: string]: number }, item) => {
    const desc = item.description || 'Інше';
    acc[desc] = (acc[desc] || 0) + Math.abs(Number(item.amount));
    return acc;
  }, {});

  const sortedData = Object.entries(groupedData)
    .map(([description, amount]) => ({ description, amount }))
    .sort((a, b) => b.amount - a.amount);

  const labels = sortedData.map((item) => item.description);
  const dataValues = sortedData.map((item) => item.amount);

  const backgroundColors = dataValues.map((_, index) =>
    index % 3 === 0 ? '#FF751D' : '#FFDAC1'
  );

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: backgroundColors,
        borderRadius: 10,
        barThickness: 38,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#52555F',
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: '#F5F6FB',
        },
        ticks: {
          display: false,
        },
        border: {
          display: false,
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-wrapper">
      {sortedData.length > 0 ? (
        <div className="chart-canvas-box">
          <Bar data={data} options={options} />
        </div>
      ) : (
        <div className="chart-empty-box">
          <p className="chart-empty-text">Немає даних для відображення</p>
        </div>
      )}
    </div>
  );
};


// import './chart.css'


// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Bar } from 'react-chartjs-2';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// interface Transaction {
//   description: string;
//   category: string;
//   amount: number;
//   date: string;
// }

// interface ChartProps {
//   transactions: Transaction[];
//   selectedCategory: any;
// }

// export const Chart = ({ transactions, selectedCategory }: ChartProps) => {
//   const categoryTranslationMap: { [key: string]: string } = {
//     'Products': 'Продукти',
//     'Alcohol': 'Алкоголь',
//     'Entertainment': 'Розваги',
//     'Health': 'Здоров’я',
//     'Transport': 'Транспорт',
//     'Home': 'Все для дому',
//     'Machinery': 'Техніка',
//     'Utility Bills': 'Комуналка, зв’язок',
//     'Sport': 'спорт, хобі',
//     'Education': 'навчання',
//     'Something Else': 'інше',
//     'Salary': 'ЗП',
//     'Add Work': 'Дод. прибуток',
//   };

//   const filteredTransactions = transactions.filter((item) => {
//     const uaCategory = categoryTranslationMap[selectedCategory] || selectedCategory;
//     return item.category === selectedCategory || item.category === uaCategory;
//   });

//   const groupedData = filteredTransactions.reduce((acc: { [key: string]: number }, item) => {
//     const desc = item.description || 'Інше';
//     acc[desc] = (acc[desc] || 0) + Math.abs(Number(item.amount));
//     return acc;
//   }, {});

//   const sortedData = Object.entries(groupedData)
//     .map(([description, amount]) => ({ description, amount }))
//     .sort((a, b) => b.amount - a.amount);

//   const labels = sortedData.map((item) => item.description);
//   const dataValues = sortedData.map((item) => item.amount);

//   const backgroundColors = dataValues.map((_, index) =>
//     index % 3 === 0 ? '#FF751D' : '#FFDAC1'
//   );

//   const data = {
//     labels,
//     datasets: [
//       {
//         data: dataValues,
//         backgroundColor: backgroundColors,
//         borderRadius: 10,
//         barThickness: 38,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: false,
//       },
//       tooltip: {
//         enabled: true,
//       },
//     },
//     scales: {
//       x: {
//         grid: {
//           display: false,
//         },
//         ticks: {
//           color: '#52555F',
//           font: {
//             size: 12,
//           },
//         },
//       },
//       y: {
//         grid: {
//           color: '#F5F6FB',
//         },
//         ticks: {
//           display: false,
//         },
//         border: {
//           display: false,
//         },
//         beginAtZero: true,
//       },
//     },
//   };

// return (
//     <div className="chart-wrapper">
//       {sortedData.length > 0 ? (
//         <div className="chart-canvas-box">
//           <Bar data={data} options={options} />
//         </div>
//       ) : (
//         <div className="chart-empty-box">
//           <p className="chart-empty-text">Немає даних для відображення</p>
//         </div>
//       )}
//     </div>
//   );
// };