import { useCallback, useEffect, useState } from "react";
import { mockMyProfile } from "../api/profile.mock";
import type { MyProfile } from "../types/profile";

export const useMyProfile = () => {
  const [profile, setProfile] = useState<MyProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const refetch = useCallback(() => {
    setIsLoading(true);

    try {
      setProfile(mockMyProfile);
      setErrorMessage("");
    } catch {
      setProfile(null);
      setErrorMessage(
        "프로필 정보를 불러오지 못했어요. 잠시 후 다시 시도해주세요.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadTimer = window.setTimeout(refetch, 0);

    return () => {
      window.clearTimeout(loadTimer);
    };
  }, [refetch]);

  return {
    profile,
    isLoading,
    isError: Boolean(errorMessage),
    errorMessage,
    refetch,
  };
};
