import { Box, Tab, Tabs } from '@mui/material';
import FoodMenuContainer from 'features/market/containers/FoodMenu';
import ToDoListContainer from 'features/market/containers/ToDoList';
import WishListContainer from 'features/market/containers/WishList';
import { useRef, useState } from 'react';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

export const MarketPage = (): JSX.Element => {
  const [tabpage, setTabpage] = useState(0);
  const swiperRef = useRef<SwiperCore | null>(null);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabpage(newValue);
    swiperRef.current?.slideTo(newValue);
  };

  return (
    <Box>
      <Tabs value={tabpage} onChange={handleTabChange}>
        <Tab label="買い物" />
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
          <WishListContainer />
        </SwiperSlide>
        <SwiperSlide>
          <FoodMenuContainer />
        </SwiperSlide>
        <SwiperSlide>
          <ToDoListContainer />
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default MarketPage;
