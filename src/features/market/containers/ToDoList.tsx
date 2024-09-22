import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, IconButton } from '@mui/material';
import ToDoItemCreateDialog from 'containers/CreateDialog';
import ToDoItemDeleteDialog from 'containers/DeleteDialog';
import ToDoList from 'features/market/components/ToDoList';
import useToDoOperation from 'hooks/market/useToDoOperation';

export const ToDoListContainer = (): JSX.Element => {
  const {
    items,
    dialogState,
    openCreateDialog,
    openDeleteDialog,
    closeDialog,
    addItem,
    deleteItem,
  } = useToDoOperation();

  return (
    <Box>
      <Box display="flex" alignItems="center">
        <Box display="flex" justifyContent="flex-end" sx={{ flexGrow: 1 }}>
          <IconButton onClick={openCreateDialog}>
            <AddCircleOutlineIcon
              sx={{
                color: 'blue',
                fontSize: 40,
              }}
            />
          </IconButton>
        </Box>
      </Box>
      <ToDoList items={items} onDelete={openDeleteDialog} />
      <ToDoItemCreateDialog
        open={dialogState.open === 'create'}
        title="メモ"
        addItem={addItem}
        onClose={closeDialog}
      />
      {dialogState.open === 'delete' && (
        <ToDoItemDeleteDialog
          open={dialogState.open === 'delete'}
          onClose={closeDialog}
          item={dialogState.item}
          deleteItem={deleteItem}
        />
      )}
    </Box>
  );
};

export default ToDoListContainer;
