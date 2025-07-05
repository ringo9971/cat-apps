import { useEffect, useState } from 'react';

interface RhombusPrefectureData {
  image_number: number;
  prefectures: string[];
  is_base: boolean;
  variant_of?: number;
  description?: string;
}

export const useRhombusPrefectures = () => {
  const [data, setData] = useState<RhombusPrefectureData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/sign/rhombus_prefectures.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};