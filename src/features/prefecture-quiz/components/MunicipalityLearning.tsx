import { useEffect, useMemo, useState } from 'react';

import { PrefectureDetailMap } from './PrefectureDetailMap';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { Municipality } from 'types/prefecture-quiz/Municipality';

export const MunicipalityLearning = () => {
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
  const [cityOnlyMode, setCityOnlyMode] = useState(false);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMunicipalityForMap, setSelectedMunicipalityForMap] =
    useState<Municipality | null>(null);

  useEffect(() => {
    fetch('/geolonia_municipalities.json')
      .then((res) => res.json())
      .then((json) => {
        const formattedData: Municipality[] = [];
        // GeoloniaのJSON構造に合わせてデータをパース
        json.data.forEach((prefData: any) => {
          const prefectureName = prefData.pref;
          const cities = prefData.cities || [prefData];

          cities.forEach((cityData: any) => {
            // 政令指定都市の区を考慮
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
        setMunicipalities(formattedData);
      });
  }, []);

  const PREFECTURE_ORDER = [
    '北海道',
    '青森県',
    '岩手県',
    '宮城県',
    '秋田県',
    '山形県',
    '福島県',
    '茨城県',
    '栃木県',
    '群馬県',
    '埼玉県',
    '千葉県',
    '東京都',
    '神奈川県',
    '新潟県',
    '富山県',
    '石川県',
    '福井県',
    '山梨県',
    '長野県',
    '岐阜県',
    '静岡県',
    '愛知県',
    '三重県',
    '滋賀県',
    '京都府',
    '大阪府',
    '兵庫県',
    '奈良県',
    '和歌山県',
    '鳥取県',
    '島根県',
    '岡山県',
    '広島県',
    '山口県',
    '徳島県',
    '香川県',
    '愛媛県',
    '高知県',
    '福岡県',
    '佐賀県',
    '長崎県',
    '熊本県',
    '大分県',
    '宮崎県',
    '鹿児島県',
    '沖縄県',
  ];

  const filteredAndGroupedMunicipalities = useMemo(() => {
    const groups: { [key: string]: Municipality[] } = {};
    municipalities.forEach((m) => {
      if (cityOnlyMode && !m.name.endsWith('市')) {
        return;
      }

      if (
        searchTerm &&
        !m.name.includes(searchTerm) &&
        !m.prefecture.includes(searchTerm)
      ) {
        return;
      }

      if (!groups[m.prefecture]) {
        groups[m.prefecture] = [];
      }
      groups[m.prefecture].push(m);
    });

    return PREFECTURE_ORDER.filter((pref) => groups[pref]).reduce(
      (obj, key) => {
        obj[key] = groups[key].sort((a, b) => a.name.localeCompare(b.name));
        return obj;
      },
      {} as { [key: string]: Municipality[] }
    );
  }, [municipalities, cityOnlyMode, searchTerm]);

  useEffect(() => {
    if (searchTerm) {
      const newExpanded: string[] = [];
      Object.entries(filteredAndGroupedMunicipalities).forEach(
        ([prefecture, towns]) => {
          if (
            towns.some(
              (town) =>
                town.name.includes(searchTerm) ||
                town.prefecture.includes(searchTerm)
            )
          ) {
            newExpanded.push(prefecture);
          }
        }
      );
      setExpanded(newExpanded);
    } else {
      setExpanded([]);
    }
  }, [searchTerm, filteredAndGroupedMunicipalities]);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded((prevExpanded) => {
        if (isExpanded) {
          setSelectedMunicipalityForMap(null); // 新しい都道府県が選択されたので、市区町村の選択をクリア
          return [...prevExpanded, panel];
        } else {
          setSelectedMunicipalityForMap(null);
          return prevExpanded.filter((p) => p !== panel);
        }
      });
    };

  const handleMunicipalityClick = (municipality: Municipality) => {
    setSelectedMunicipalityForMap(municipality);
  };

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom>
        市区町村検索
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={cityOnlyMode}
            onChange={(e) => setCityOnlyMode(e.target.checked)}
          />
        }
        label="「市」だけ表示モード"
      />
      <TextField
        label="市区町村を検索"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        sx={{ mt: 2, mb: 2 }}
      />
      <Box sx={{ mt: 2 }}>
        {Object.entries(filteredAndGroupedMunicipalities).map(
          ([prefecture, towns]) => (
            <Accordion
              expanded={expanded.includes(prefecture)}
              onChange={handleChange(prefecture)}
              key={prefecture}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${prefecture}-content`}
                id={`${prefecture}-header`}
              >
                <Typography>{prefecture}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {towns.map((town) => (
                    <Button
                      key={town.code}
                      variant={
                        selectedMunicipalityForMap &&
                        town.code === selectedMunicipalityForMap.code
                          ? 'contained'
                          : 'outlined'
                      }
                      size="small"
                      onClick={() => handleMunicipalityClick(town)}
                      sx={{ border: '1px solid #eee', p: 0.5, borderRadius: 1 }}
                    >
                      {town.name}
                    </Button>
                  ))}
                </Box>
                {expanded.includes(prefecture) && (
                  <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                      {prefecture}の地図
                    </Typography>
                    <PrefectureDetailMap
                      prefectureName={prefecture}
                      municipalities={towns}
                      selectedMunicipality={selectedMunicipalityForMap}
                      onMunicipalityClick={handleMunicipalityClick}
                    />
                  </Box>
                )}
              </AccordionDetails>
            </Accordion>
          )
        )}
      </Box>
    </Box>
  );
};
