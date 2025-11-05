import { useEffect, useState } from 'react';

import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Card, CardContent, Checkbox, IconButton } from '@mui/material';
import { WishItem } from 'types/market/WishItem';

type WishItemCardProps = {
  wishItem: WishItem;
  onDelete: (
    wishItem: WishItem,
    listType: 'wishList' | 'refrigeratorList'
  ) => void;
  onCheck: (wishItem: WishItem) => void;
  listType: 'wishList' | 'refrigeratorList';
};

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

const WishItemCard = ({
  wishItem,
  onDelete,
  onCheck,
  listType,
}: WishItemCardProps): JSX.Element => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: wishItem.id });

  return (
    <Card
      key={wishItem.id}
      ref={setNodeRef}
      {...attributes}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: 'grab',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'stretch',
          flexGrow: 1,
        }}
        {...listeners}
      >
        <Box
          sx={{
            width: 16,
            backgroundColor: getTagColor(wishItem.tag),
          }}
        />
        <CardContent>{wishItem.name}</CardContent>
      </Box>
      <Box display="flex" justifyContent="flex-end" sx={{ flexGrow: 1 }}>
        <Checkbox
          checked={wishItem.check}
          onClick={(e) => {
            e.stopPropagation();
            onCheck(wishItem);
          }}
        />
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

type WishListProps = {
  isMobile: boolean;
  wishList: Array<WishItem>;
  onDelete: (
    wishItem: WishItem,
    listType: 'wishList' | 'refrigeratorList'
  ) => void;
  onCheck: (wishItem: WishItem) => void;
  onDragEnd: (WishList: Array<WishItem>) => void;
};

const WishList = ({
  isMobile,
  wishList,
  onDelete,
  onCheck,
  onDragEnd,
}: WishListProps): JSX.Element => {
  const pointerSensor = useSensor(PointerSensor, {});
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { tolerance: 5, delay: 500 },
  });
  const sensors = useSensors(...(isMobile ? [touchSensor] : [pointerSensor]));

  const modifiers = [restrictToVerticalAxis];

  const [isDragging, setIsDragging] = useState(false); // DnD が開始されたかどうか

  useEffect(() => {
    if (isDragging) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isDragging]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setIsDragging(false);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = wishList.findIndex((item) => item.id === active.id);
    const newIndex = wishList.findIndex((item) => item.id === over.id);
    const newWishList = arrayMove(wishList, oldIndex, newIndex);
    onDragEnd(newWishList);
  };

  return (
    <Box>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={modifiers}
      >
        <SortableContext
          items={wishList}
          strategy={verticalListSortingStrategy}
        >
          {wishList.map((wishItem) => (
            <WishItemCard
              key={wishItem.id}
              wishItem={wishItem}
              onDelete={(item) => onDelete(item, 'wishList')}
              onCheck={onCheck}
              listType={'wishList'}
            />
          ))}
        </SortableContext>
      </DndContext>
    </Box>
  );
};

export default WishList;
