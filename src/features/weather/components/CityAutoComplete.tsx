import {
  Box,
  TextField,
  Autocomplete,
  Button,
  FilterOptionsState,
} from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { City } from 'types/weather/City';

interface CityAutoCompleteProps {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  citiesMaster: Array<City>;
  addCity: (cityName: string) => void;
}

export const CityAutoComplete = ({
  text,
  setText,
  citiesMaster,
  addCity,
}: CityAutoCompleteProps): JSX.Element => {
  const filterOptions = (
    options: Array<City>,
    { inputValue }: FilterOptionsState<City>
  ) => {
    const matches = options.filter(
      (option) =>
        option.name.includes(inputValue) ||
        option.hurigana.includes(inputValue) ||
        option.prefecture.includes(inputValue) ||
        option.prefectureHurigana.includes(inputValue)
    );
    return matches;
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="row"
      justifyContent="center"
      pt={1}
    >
      <Autocomplete
        inputValue={text}
        onInputChange={(_, selectedText: string) => {
          setText(selectedText);
        }}
        options={citiesMaster}
        getOptionLabel={(option: City) =>
          `${option.name}（${option.prefecture}）`
        }
        filterOptions={filterOptions}
        sx={{ width: 200 }}
        autoHighlight
        renderInput={(params) => <TextField {...params} placeholder="都市名" />}
        size="small"
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            addCity(text);
          }
        }}
      />
      <Button
        variant="contained"
        onClick={() => addCity(text.split('（')[0])}
        sx={{ marginLeft: '8px' }}
      >
        追加
      </Button>
    </Box>
  );
};

export default CityAutoComplete;
