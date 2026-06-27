import { useCallback, useEffect, useState } from "react";
import type { MyProfile } from "../types/profile";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useMyProfile = () => {
  const [profile, setProfile] = useState<MyProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [fetchTrigger, setFetchTrigger] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const accessToken = localStorage.getItem("accessToken");

    fetch(`${API_BASE_URL}/users/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json())
      .then(
        (data: {
          isSuccess: boolean;
          message?: string;
          result?: MyProfile;
        }) => {
          if (cancelled) return;
          if (!data.isSuccess) {
            setProfile(null);
            setErrorMessage(data.message ?? "프로필 정보를 불러오지 못했어요.");
            setIsLoading(false);
            return;
          }
          setProfile(data.result ?? null);
          setErrorMessage("");
          setIsLoading(false);
        },
      )
      .catch(() => {
        if (cancelled) return;
        setProfile(null);
        setErrorMessage(
          "프로필 정보를 불러오지 못했어요. 잠시 후 다시 시도해주세요.",
        );
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [fetchTrigger]);

  const refetch = useCallback(() => {
    setIsLoading(true);
    setFetchTrigger((n) => n + 1);
  }, []);

  return {
    profile,
    isLoading,
    isError: Boolean(errorMessage),
    errorMessage,
    refetch,
  };
};
