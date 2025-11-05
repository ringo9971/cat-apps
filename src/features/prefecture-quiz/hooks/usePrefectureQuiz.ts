import { useEffect, useMemo, useState } from 'react';

import { Municipality } from 'types/prefecture-quiz/Municipality';

const regionMap: { [key: string]: string } = {
  北海道: '北海道地方',
  青森県: '東北地方',
  岩手県: '東北地方',
  宮城県: '東北地方',
  秋田県: '東北地方',
  山形県: '東北地方',
  福島県: '東北地方',
  茨城県: '関東地方',
  栃木県: '関東地方',
  群馬県: '関東地方',
  埼玉県: '関東地方',
  千葉県: '関東地方',
  東京都: '関東地方',
  神奈川県: '関東地方',
  新潟県: '中部地方',
  富山県: '中部地方',
  石川県: '中部地方',
  福井県: '中部地方',
  山梨県: '中部地方',
  長野県: '中部地方',
  岐阜県: '中部地方',
  静岡県: '中部地方',
  愛知県: '中部地方',
  三重県: '近畿地方',
  滋賀県: '近畿地方',
  京都府: '近畿地方',
  大阪府: '近畿地方',
  兵庫県: '近畿地方',
  奈良県: '近畿地方',
  和歌山県: '近畿地方',
  鳥取県: '中国地方',
  島根県: '中国地方',
  岡山県: '中国地方',
  広島県: '中国地方',
  山口県: '中国地方',
  徳島県: '四国地方',
  香川県: '四国地方',
  愛媛県: '四国地方',
  高知県: '四国地方',
  福岡県: '九州地方',
  佐賀県: '九州地方',
  長崎県: '九州地方',
  熊本県: '九州地方',
  大分県: '九州地方',
  宮崎県: '九州地方',
  鹿児島県: '九州地方',
  沖縄県: '九州地方',
};

export const usePrefectureQuiz = (cityOnly: boolean = false) => {
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Municipality | null>(
    null
  );
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedPrefecture, setSelectedPrefecture] = useState<string | null>(
    null
  );
  const [hint, setHint] = useState<string | null>(null);
  const [hintRegionPrefectures, setHintRegionPrefectures] = useState<string[]>(
    []
  );
  const [hintUsed, setHintUsed] = useState(false);

  const highlightColors = useMemo(() => {
    const newHighlightColors: { [key: string]: string } = {};

    if (answered) {
      const correctPrefectureJapanese = currentQuestion?.prefecture || '';

      if (selectedPrefecture === correctPrefectureJapanese) {
        if (correctPrefectureJapanese) {
          newHighlightColors[correctPrefectureJapanese] = 'yellow';
        }
      } else {
        if (selectedPrefecture) {
          newHighlightColors[selectedPrefecture] = 'blue';
        }
        if (correctPrefectureJapanese) {
          newHighlightColors[correctPrefectureJapanese] = 'red';
        }
      }
    }
    return newHighlightColors;
  }, [answered, selectedPrefecture, currentQuestion]);

  useEffect(() => {
    fetch('/geolonia_municipalities.json')
      .then((res) => res.json())
      .then((json) => {
        let formattedData: Municipality[] = [];
        json.data.forEach((prefData: any) => {
          const prefectureName = prefData.pref;
          const cities = prefData.cities || [prefData];

          cities.forEach((cityData: any) => {
            const cityName = cityData.ward
              ? `${cityData.city}${cityData.ward}`
              : cityData.city;
            if (cityData.point && cityData.point.length === 2) {
              formattedData.push({
                name: cityName,
                prefecture: prefectureName,
                latitude: cityData.point[1],
                longitude: cityData.point[0],
                code: cityData.code,
              });
            }
          });
        });

        if (cityOnly) {
          formattedData = formattedData.filter((m) => m.name.endsWith('市'));
        }

        setMunicipalities(formattedData);
        setCurrentQuestion(
          formattedData[Math.floor(Math.random() * formattedData.length)]
        );
      });
  }, [cityOnly]);

  const handleAnswer = (prefecture: string) => {
    if (!currentQuestion) return;
    setSelectedPrefecture(prefecture);
    if (prefecture === currentQuestion.prefecture) {
      setScore(score + 1);
    }
    setAnswered(true);
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(
      municipalities[Math.floor(Math.random() * municipalities.length)]
    );
    setAnswered(false);
    setSelectedPrefecture(null);
    setHint(null);
    setHintRegionPrefectures([]);
    setHintUsed(false);
  };

  const getHint = () => {
    if (currentQuestion) {
      const region = regionMap[currentQuestion.prefecture];
      setHint(region);
      const prefecturesInRegion = Object.keys(regionMap).filter(
        (key) => regionMap[key] === region
      );
      setHintRegionPrefectures(prefecturesInRegion);
      setHintUsed(true);
    }
  };

  return {
    currentQuestion,
    score,
    answered,
    handleAnswer,
    handleNextQuestion,
    municipalities,
    selectedPrefecture,
    highlightColors,
    hint,
    getHint,
    hintRegionPrefectures,
    hintUsed,
  };
};
