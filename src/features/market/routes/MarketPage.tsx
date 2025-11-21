import { useRef, useState } from 'react';

import { Box, Tab, Tabs } from '@mui/material';
import MenuContainer from 'features/market/containers/Menu/Menu';
import RefrigeratorContainer from 'features/market/containers/RefrigeratorContainer';
import ToDoListContainer from 'features/market/containers/ToDoList';
import WishListContainer from 'features/market/containers/WishList';
import useWishItemsOperation from 'hooks/market/useWishItemsOperation';
import SwiperCore from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

export const MarketPage = () => {
  const [tabpage, setTabpage] = useState(0);
  const swiperRef = useRef<SwiperCore | null>(null);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabpage(newValue);
    swiperRef.current?.slideTo(newValue);
  };

  const {
    wishList,
    refrigeratorList,
    dialogState,
    openCreateDialog,
    openDeleteDialog,
    closeDialog,
    createWishItem,
    deleteWishItem,
    toggleAndMoveWishItem,
    sortWishList,
  } = useWishItemsOperation();

  return (
    <Box>
      <Tabs value={tabpage} onChange={handleTabChange}>
        <Tab label="買い物" />
        <Tab label="冷蔵庫" />
        <Tab label="献立" />
        <Tab label="ToDo" />
      </Tabs>
      <Swiper
        onSlideChange={(swiper) => setTabpage(swiper.activeIndex)}
        onBeforeInit={(swiper) => (swiperRef.current = swiper)}
        initialSlide={tabpage}
        spaceBetween={16}
        slidesPerView={1}
        touchStartPreventDefault={false}
        noSwipingClass="dnd-item"
      >
        <SwiperSlide>
          <WishListContainer
            wishList={wishList}
            dialogState={dialogState}
            openCreateDialog={openCreateDialog}
            openDeleteDialog={openDeleteDialog}
            closeDialog={closeDialog}
            createWishItem={createWishItem}
            deleteWishItem={deleteWishItem}
            toggleAndMoveWishItem={toggleAndMoveWishItem}
            sortWishList={sortWishList}
          />
        </SwiperSlide>
        <SwiperSlide>
          <RefrigeratorContainer
            refrigeratorList={refrigeratorList}
            dialogState={dialogState}
            openDeleteDialog={openDeleteDialog}
            closeDialog={closeDialog}
            deleteWishItem={deleteWishItem}
            toggleAndMoveWishItem={toggleAndMoveWishItem}
          />
        </SwiperSlide>
        <SwiperSlide>
          <MenuContainer />
        </SwiperSlide>
        <SwiperSlide>
          <ToDoListContainer />
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default MarketPage;
