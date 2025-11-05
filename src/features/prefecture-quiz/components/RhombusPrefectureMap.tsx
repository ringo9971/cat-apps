import { useMemo, useState } from 'react';

import { useRhombusPrefectures } from '../hooks/useRhombusPrefectures';
import { JapanMapD3 } from './JapanMapD3';
import { Box, Button, CircularProgress, Typography } from '@mui/material';

interface RhombusPrefectureData {
  image_number: number;
  prefectures: string[];
  is_base: boolean;
  variant_of?: number;
  description?: string;
}

export const RhombusPrefectureMap = () => {
  const { data, loading, error } = useRhombusPrefectures();
  const [selectedPrefectures, setSelectedPrefectures] = useState<string[]>([]);

  const processedData = useMemo(() => {
    const groups: {
      [key: number]: {
        base: RhombusPrefectureData;
        variants: RhombusPrefectureData[];
      };
    } = {};
    const standalone: RhombusPrefectureData[] = [];

    data.forEach((item) => {
      if (item.is_base) {
        groups[item.image_number] = { base: item, variants: [] };
      }
    });

    data.forEach((item) => {
      if (!item.is_base && item.variant_of !== undefined) {
        if (groups[item.variant_of]) {
          groups[item.variant_of].variants.push(item);
        } else {
          // If a variant's base is not found, treat it as standalone
          standalone.push(item);
        }
      }
    });

    // Separate base items that have no variants into standalone
    Object.values(groups).forEach((group) => {
      if (group.variants.length === 0) {
        standalone.push(group.base);
        delete groups[group.base.image_number];
      }
    });

    return { grouped: Object.values(groups), standalone };
  }, [data]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  const handleRhombusClick = (prefectures: string[]) => {
    setSelectedPrefectures(prefectures);
  };

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom>
        ひし形マーク
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        {processedData.grouped.map((group) => (
          <Box
            key={group.base.image_number}
            sx={{
              border: '1px solid #eee',
              p: 0.5,
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Button
              onClick={() => handleRhombusClick(group.base.prefectures)}
              size="small"
            >
              <img
                src={`/sign/sign${group.base.image_number}.png`}
                alt={`Sign ${group.base.image_number}`}
                style={{ width: 30 }}
              />
            </Button>
            {group.variants.map((variant) => (
              <Button
                key={variant.image_number}
                onClick={() => handleRhombusClick(variant.prefectures)}
                size="small"
              >
                <img
                  src={`/sign/sign${variant.image_number}.png`}
                  alt={`Sign ${variant.image_number}`}
                  style={{ width: 30 }}
                />
                {variant.description && (
                  <Typography variant="caption" sx={{ ml: 0.5 }}>
                    {variant.description}
                  </Typography>
                )}
              </Button>
            ))}
          </Box>
        ))}
        {processedData.standalone.map((item) => (
          <Button
            key={item.image_number}
            onClick={() => handleRhombusClick(item.prefectures)}
            size="small"
          >
            <img
              src={`/sign/sign${item.image_number}.png`}
              alt={`Sign ${item.image_number}`}
              style={{ width: 30 }}
            />
            {item.description && (
              <Typography variant="caption" sx={{ ml: 0.5 }}>
                {item.description}
              </Typography>
            )}
          </Button>
        ))}
      </Box>
      <Box sx={{ mt: 2 }}>
        <JapanMapD3
          onSelect={() => {}}
          highlightColors={{}}
          hintRegionPrefectures={[]}
          selectedPrefectures={selectedPrefectures}
        />
      </Box>
    </Box>
  );
};
