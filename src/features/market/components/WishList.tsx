import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Card, Checkbox, CardContent, IconButton } from '@mui/material';
import { WishItem } from 'types/market/WishItem';

type WishListProps = {
  wishList: Array<WishItem>;
  onDelete: (wishItem: WishItem) => void;
  onCheck: (wishItem: WishItem) => void;
};

const WishList = ({
  wishList,
  onDelete,
  onCheck,
}: WishListProps): JSX.Element => {
  const getTagColor = (tag: string) => {
    switch (tag) {
      case '食材':
        return 'orange';
      case '日用品':
        return 'green';
      case '家具家電':
        return 'brown';
      default:
        return 'gray';
    }
  };

  const getImage = (tag: string) => {
    switch (tag) {
      case '食材':
        return `repeating-linear-gradient(
                  -45deg, 
                  white, 
                  white 2px, 
                  transparent 2px, 
                  transparent 8px
                )`;
      case '日用品':
        return `repeating-linear-gradient(
                  0deg, 
                  white, 
                  white 2px, 
                  transparent 2px, 
                  transparent 8px
                )`;
      default:
        return;
    }
  };

  return (
    <Box>
      {wishList.map((wishItem) => (
        <Card
          key={JSON.stringify(wishItem)}
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Box
            sx={{
              width: 16,
              backgroundColor: getTagColor(wishItem.tag),
              backgroundImage: getImage(wishItem.tag),
            }}
          />
          <CardContent>{wishItem.name}</CardContent>
          <Box display="flex" justifyContent="flex-end" sx={{ flexGrow: 1 }}>
            <Checkbox
              checked={wishItem.check}
              onClick={() => onCheck(wishItem)}
            />
            <IconButton onClick={() => onDelete(wishItem)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default WishList;
