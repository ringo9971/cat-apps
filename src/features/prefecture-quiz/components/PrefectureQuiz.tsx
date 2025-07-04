import { usePrefectureQuiz } from '../hooks/usePrefectureQuiz';
import { Box, Button, CircularProgress, Container, Typography, FormControlLabel, Switch } from '@mui/material';
import { JapanMapD3 } from './JapanMapD3';
import { useState } from 'react';

export const PrefectureQuiz = () => {
  const [cityOnlyMode, setCityOnlyMode] = useState(false);
  const { currentQuestion, score, answered, handleAnswer, handleNextQuestion, highlightColors, hint, getHint } = usePrefectureQuiz(cityOnlyMode);

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
          control={<Switch checked={cityOnlyMode} onChange={(e) => setCityOnlyMode(e.target.checked)} />}
          label="「市」だけ出題モード"
        />
        <Typography variant="h5" component="h2">
          市区町村: {currentQuestion.name}
        </Typography>
        <Typography variant="h6">スコア: {score}</Typography>
        <Button variant="outlined" onClick={getHint} sx={{ mt: 2 }} disabled={answered}> {/* 常に表示し、answeredの場合は無効化 */}
          ヒントを見る
        </Button>
        {hint && (
          <Typography variant="body1" sx={{ mt: 1 }}>
            地域: {hint}
          </Typography>
        )}
        <Box sx={{ mt: 2 }}>
          <JapanMapD3
            onSelect={(prefecture: string) => {
              if (!answered) {
                handleAnswer(prefecture);
              }
            }}
            highlightColors={highlightColors}
          />
        </Box>
        {answered && (
          <Box sx={{ mt: 2 }}>
            <Typography>正解は {currentQuestion.prefecture} です。</Typography>
            <Button variant="contained" onClick={handleNextQuestion} sx={{ mt: 2 }}>
              次の問題へ
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};
