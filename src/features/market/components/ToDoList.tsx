import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Card, CardContent, IconButton } from '@mui/material';
import { ToDoItem } from 'types/market/ToDoItem';

type ToDoListProps = {
  items: Array<ToDoItem>;
  onDelete: (item: ToDoItem) => void;
};

const ToDoList = ({ items, onDelete }: ToDoListProps): JSX.Element => (
  <Box>
    {items.map((item) => (
      <Card
        key={JSON.stringify(item)}
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <CardContent>{item.name}</CardContent>
        <Box display="flex" justifyContent="flex-end" sx={{ flexGrow: 1 }}>
          <IconButton onClick={() => onDelete(item)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Card>
    ))}
  </Box>
);
export default ToDoList;
