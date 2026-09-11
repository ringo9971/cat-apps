import { useMemo } from 'react';

import {
  CATEGORIES,
  Category,
  Transaction,
} from '../../../../types/market/Expense';
import { BarChart } from '@mui/x-charts/BarChart';

interface ExpenseSummaryChartProps {
  userUid: string;
  transactions: Transaction[];
}

export const ExpenseSummaryChart = ({
  userUid,
  transactions,
}: ExpenseSummaryChartProps) => {
  const monthlyData = useMemo(() => {
    const amounts = new Map<
      string,
      {
        mine: number;
        others: number;
      }
    >();
    for (const transaction of transactions) {
      const date = transaction.date;
      const month = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}`;
      const current = amounts.get(month) ?? {
        mine: 0,
        others: 0,
      };
      if (transaction.userUid === userUid) {
        current.mine += transaction.amount;
      } else {
        current.others += transaction.amount;
      }
      amounts.set(month, current);
    }
    return Array.from(amounts, ([date, amount]) => ({
      date,
      ...amount,
    })).sort((a, b) => a.date.localeCompare(b.date));
  }, [userUid, transactions]);

  const categoryData = useMemo(() => {
    const amounts = new Map<
      Category,
      {
        mine: number;
        others: number;
      }
    >(
      CATEGORIES.map((category) => [
        category,
        {
          mine: 0,
          others: 0,
        },
      ])
    );
    for (const transaction of transactions) {
      const current = amounts.get(transaction.category) ?? {
        mine: 0,
        others: 0,
      };
      if (transaction.userUid === userUid) {
        current.mine += transaction.amount;
      } else {
        current.others += transaction.amount;
      }
      amounts.set(transaction.category, current);
    }
    return Array.from(amounts, ([category, amount]) => ({
      category,
      ...amount,
    }));
  }, [userUid, transactions]);

  const months = monthlyData.map((item) => item.date);
  const mineMonthAmounts = monthlyData.map((item) => item.mine);
  const otherMonthAmounts = monthlyData.map((item) => item.others);

  const categories = categoryData.map((item) => item.category);
  const mineCategoryAmounts = categoryData.map((item) => item.mine);
  const otherCategoryAmounts = categoryData.map((item) => item.others);

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
            data: mineMonthAmounts,
            label: '自分',
            stack: 'total',
          },
          {
            data: otherMonthAmounts,
            label: 'その他',
            stack: 'total',
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
            data: mineCategoryAmounts,
            stack: 'total',
          },
          {
            data: otherCategoryAmounts,
            stack: 'total',
          },
        ]}
        height={200}
      />
    </>
  );
};
