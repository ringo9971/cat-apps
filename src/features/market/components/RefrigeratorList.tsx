import DeleteIcon from '@mui/icons-material/Delete';
import RedoIcon from '@mui/icons-material/Redo';
import { Box, Card, CardContent, IconButton } from '@mui/material';
import { WishItem } from 'types/market/WishItem';

type RefrigeratorItemCardProps = {
  wishItem: WishItem;
  onDelete: (
    wishItem: WishItem,
    listType: 'wishList' | 'refrigeratorList'
  ) => void;
  onMoveToWishList: (wishItem: WishItem) => void;
  listType: 'wishList' | 'refrigeratorList';
};

const getDaysAgo = (date: Date): number => {
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const RefrigeratorItemCard = ({
  wishItem,
  onDelete,
  onMoveToWishList,
  listType,
}: RefrigeratorItemCardProps) => {
  const getTagColor = (tag: string) => {
    switch (tag) {
      case '食品':
        return 'orange';
      case '日用品':
        return 'green';
      case '家具家電':
        return 'brown';
      default:
        return 'gray';
    }
  };

  return (
    <Card
      key={wishItem.id}
      sx={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'stretch',
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            width: 16,
            backgroundColor: getTagColor(wishItem.tag),
          }}
        />
        <CardContent>
          {wishItem.name}{' '}
          {wishItem.tag === '食品' &&
            wishItem.time &&
            `(${getDaysAgo(wishItem.time)}日前)`}
        </CardContent>
      </Box>
      <Box display="flex" justifyContent="flex-end" sx={{ flexGrow: 1 }}>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onMoveToWishList(wishItem);
          }}
        >
          <RedoIcon />
        </IconButton>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onDelete(wishItem, listType);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  );
};

type RefrigeratorListProps = {
  refrigeratorList: Array<WishItem>;
  onDelete: (
    wishItem: WishItem,
    listType: 'wishList' | 'refrigeratorList'
  ) => void;
  onMoveToWishList: (wishItem: WishItem) => void;
};

const RefrigeratorList = ({
  refrigeratorList,
  onDelete,
  onMoveToWishList,
}: RefrigeratorListProps) => {
  return (
    <Box>
      {refrigeratorList.map((wishItem) => (
        <RefrigeratorItemCard
          key={wishItem.id}
          wishItem={wishItem}
          onDelete={onDelete}
          onMoveToWishList={onMoveToWishList}
          listType={'refrigeratorList'}
        />
      ))}
    </Box>
  );
};

export default RefrigeratorList;
