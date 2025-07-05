import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { useState } from 'react';

import { JapanMapD3 } from './JapanMapD3';
import { usePrefectureQuiz } from '../hooks/usePrefectureQuiz';

export const PrefectureQuiz = () => {
  const [cityOnlyMode, setCityOnlyMode] = useState(false);
  const {
    currentQuestion,
    score,
    answered,
    handleAnswer,
    handleNextQuestion,
    highlightColors,
    getHint,
    hintRegionPrefectures,
    hintUsed,
  } = usePrefectureQuiz(cityOnlyMode);

  if (!currentQuestion) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          都道府県当てクイズ
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={cityOnlyMode}
              onChange={(e) => setCityOnlyMode(e.target.checked)}
            />
          }
          label="「市」だけ出題モード"
        />
        <Typography variant="h5" component="h2">
          市区町村: {currentQuestion.name}
        </Typography>
        <Typography variant="h6">スコア: {score}</Typography>
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button
            variant="outlined"
            onClick={getHint}
            disabled={answered || hintUsed}
          >
            ヒントを見る
          </Button>
          {answered && (
            <Button variant="contained" onClick={handleNextQuestion}>
              次の問題へ
            </Button>
          )}
        </Box>
        <Box sx={{ mt: 2 }}>
          <JapanMapD3
            onSelect={(prefecture: string) => {
              if (!answered) {
                handleAnswer(prefecture);
              }
            }}
            highlightColors={highlightColors}
            hintRegionPrefectures={hintRegionPrefectures}
          />
        </Box>
        {answered && (
          <Typography sx={{ mt: 2 }}>
            正解は {currentQuestion.prefecture} です。
          </Typography>
        )}
      </Box>
    </Container>
  );
};
