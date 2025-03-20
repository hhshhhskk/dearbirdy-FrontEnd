import { useEffect, useState } from "react";
import { getBirdData } from "@/services/birdyService";

interface BirdData {
  birdName: string;
  traits: string;
  explanation: string;
  color: string;
  background: string;
}

export const useFetchBirdData = (birdType: string) => {
  const [birdData, setBirdData] = useState<BirdData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getBirdData(birdType);
      setBirdData(data as BirdData); // ✅ TypeScript가 올바르게 추론할 수 있도록 강제 변환
      setLoading(false);
    };

    fetchData();
  }, [birdType]);

  return { birdData, loading };
};
