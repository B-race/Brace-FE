import { useCallback, useEffect, useState } from "react";
import type {
  MyPageProjectCardItem,
  MyPageProjectListType,
} from "../types/mypageProject";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BOOKMARK_STORAGE_KEY = "brace-bookmarked-projects";

const ENDPOINT_MAP: Record<MyPageProjectListType, string> = {
  myProjects: "/users/me/projects",
  applications: "/users/me/applications",
  bookmarks: "/users/me/bookmarks",
};

const readStoredBookmarkProjects = (): MyPageProjectCardItem[] => {
  const rawBookmarks = localStorage.getItem(BOOKMARK_STORAGE_KEY);
  if (!rawBookmarks) return [];
  try {
    return JSON.parse(rawBookmarks) as MyPageProjectCardItem[];
  } catch {
    return [];
  }
};

const mergeBookmarkProjects = (
  apiItems: MyPageProjectCardItem[],
  storedItems: MyPageProjectCardItem[],
) => {
  const apiItemIds = new Set(apiItems.map((item) => item.projectId));
  const storedOnlyItems = storedItems.filter(
    (item) => !apiItemIds.has(item.projectId),
  );
  return [
    ...storedItems.filter((item) => apiItemIds.has(item.projectId)),
    ...storedOnlyItems,
    ...apiItems.filter(
      (item) =>
        !storedItems.some(
          (storedItem) => storedItem.projectId === item.projectId,
        ),
    ),
  ];
};

interface UseMyPageProjectsParams {
  listType: MyPageProjectListType;
}

export const useMyPageProjects = ({ listType }: UseMyPageProjectsParams) => {
  const [items, setItems] = useState<MyPageProjectCardItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [fetchTrigger, setFetchTrigger] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const accessToken = localStorage.getItem("accessToken");

    fetch(`${API_BASE_URL}${ENDPOINT_MAP[listType]}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json())
      .then(
        (data: {
          isSuccess: boolean;
          message?: string;
          result?: { content?: MyPageProjectCardItem[] };
        }) => {
          if (cancelled) return;
          if (!data.isSuccess) {
            setItems([]);
            setErrorMessage(data.message ?? "목록을 불러오지 못했어요.");
            setIsLoading(false);
            return;
          }
          const apiItems = data.result?.content ?? [];
          setItems(
            listType === "bookmarks"
              ? mergeBookmarkProjects(apiItems, readStoredBookmarkProjects())
              : apiItems,
          );
          setErrorMessage("");
          setIsLoading(false);
        },
      )
      .catch(() => {
        if (cancelled) return;
        if (listType === "bookmarks") {
          const storedBookmarkProjects = readStoredBookmarkProjects();
          setItems(storedBookmarkProjects);
          setErrorMessage(
            storedBookmarkProjects.length > 0
              ? ""
              : "프로젝트 목록을 불러오지 못했어요. 잠시 후 다시 시도해주세요.",
          );
          setIsLoading(false);
          return;
        }
        setItems([]);
        setErrorMessage(
          "프로젝트 목록을 불러오지 못했어요. 잠시 후 다시 시도해주세요.",
        );
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [listType, fetchTrigger]);

  const refetch = useCallback(() => {
    setIsLoading(true);
    setFetchTrigger((n) => n + 1);
  }, []);

  return {
    items,
    isLoading,
    isError: Boolean(errorMessage),
    errorMessage,
    refetch,
  };
};
