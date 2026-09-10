import { useMemo } from 'react';

import {
  CATEGORIES,
  Category,
  Transaction,
} from '../../../../types/market/Expense';
import { BarChart } from '@mui/x-charts/BarChart';

interface ExpenseSummaryChartProps {
  transactions: Transaction[];
}

export const ExpenseSummaryChart = ({
  transactions,
}: ExpenseSummaryChartProps) => {
  const monthlyData = useMemo(() => {
    const amounts = new Map<string, number>();
    for (const transaction of transactions) {
      const date = transaction.date;
      const month = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}`;
      amounts.set(month, (amounts.get(month) ?? 0) + transaction.amount);
    }
    return Array.from(amounts, ([date, amount]) => ({
      date,
      amount,
    })).sort((a, b) => a.date.localeCompare(b.date));
  }, [transactions]);

  const categoryData = useMemo(() => {
    const amounts = new Map<Category, number>(
      CATEGORIES.map((category) => [category, 0])
    );
    for (const transaction of transactions) {
      amounts.set(
        transaction.category,
        (amounts.get(transaction.category) ?? 0) + transaction.amount
      );
    }
    return Array.from(amounts, ([category, amount]) => ({
      category,
      amount,
    }));
  }, [transactions]);

  const months = monthlyData.map((item) => item.date);
  const monthAmounts = monthlyData.map((item) => item.amount);

  const categories = categoryData.map((item) => item.category);
  const categoryAmounts = categoryData.map((item) => item.amount);

  return (
    <>
      <BarChart
        xAxis={[{ data: months, scaleType: 'band' }]}
        yAxis={[
          {
            width: 50,
          },
        ]}
        series={[
          {
            data: monthAmounts,
          },
        ]}
        height={200}
      />
      <BarChart
        xAxis={[
          {
            data: categories,
            scaleType: 'band',
            tickLabelStyle: {
              fontSize: 9,
            },
          },
        ]}
        yAxis={[
          {
            width: 50,
          },
        ]}
        series={[
          {
            data: categoryAmounts,
          },
        ]}
        height={200}
      />
    </>
  );
};
