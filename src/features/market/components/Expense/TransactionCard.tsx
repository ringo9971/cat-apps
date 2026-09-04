import { useState } from 'react';

import { MoreVert } from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { Transaction } from 'types/market/Expense';

const formatDisplayDate = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}-${day}`;
};

interface TransactionCardProps {
  transaction: Transaction;
  openEditDialog: (transaction: Transaction) => void;
  openDeleteDialog: (transaction: Transaction) => void;
  isOwner: boolean;
}

export const TransactionCard = ({
  transaction,
  openEditDialog,
  openDeleteDialog,
  isOwner,
}: TransactionCardProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  return (
    <>
      <Card>
        <CardContent>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'auto auto 1fr auto',
              alignItems: 'center',
              columnGap: 2,
            }}
          >
            <Box>{formatDisplayDate(transaction.date)}</Box>
            <Box>{transaction.category}</Box>
            <Box sx={{ textAlign: 'right' }}>{transaction.amount}円</Box>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setAnchorEl(e.currentTarget);
              }}
              disabled={!isOwner}
            >
              <MoreVert />
            </IconButton>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                gridColumn: '2 / 4',
              }}
            >
              {transaction.memo}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => {
          setAnchorEl(null);
        }}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            openEditDialog(transaction);
          }}
          sx={{
            gap: 1.25,
          }}
        >
          編集
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            openDeleteDialog(transaction);
          }}
          sx={{
            gap: 1.25,
          }}
        >
          削除
        </MenuItem>
      </Menu>
    </>
  );
};
