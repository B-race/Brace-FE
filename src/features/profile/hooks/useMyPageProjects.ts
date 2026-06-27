import { useCallback, useEffect, useState } from "react";
import { mockMyPageProjectLists } from "../api/mypageProject.mock";
import type {
  MyPageProjectCardItem,
  MyPageProjectListType,
} from "../types/mypageProject";

interface UseMyPageProjectsParams {
  listType: MyPageProjectListType;
}

export const useMyPageProjects = ({ listType }: UseMyPageProjectsParams) => {
  const [items, setItems] = useState<MyPageProjectCardItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const refetch = useCallback(() => {
    setIsLoading(true);

    try {
      setItems(mockMyPageProjectLists[listType]);
      setErrorMessage("");
    } catch {
      setItems([]);
      setErrorMessage(
        "프로젝트 목록을 불러오지 못했어요. 잠시 후 다시 시도해주세요.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [listType]);

  useEffect(() => {
    const loadTimer = window.setTimeout(refetch, 0);

    return () => {
      window.clearTimeout(loadTimer);
    };
  }, [refetch]);

  return {
    items,
    isLoading,
    isError: Boolean(errorMessage),
    errorMessage,
    refetch,
  };
};
