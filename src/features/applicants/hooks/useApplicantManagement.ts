import { useCallback, useEffect, useMemo, useState } from "react";
import {
  mockApplicantProjects,
  mockManagedApplicants,
} from "../api/applicant.mock";
import type {
  ApplicantProject,
  ApplicantReviewStatus,
  ManagedApplicant,
} from "../types/applicant";

const APPLICANT_PAGE_SIZE = 5;
const MOCK_APPLICANT_REPEAT_COUNT = 4;

const getFirstApplicantId = (
  applicants: ManagedApplicant[],
  projectId: number,
) =>
  applicants.find((applicant) => applicant.projectId === projectId)?.id ?? null;

const createMockApplicantPages = () =>
  Array.from({ length: MOCK_APPLICANT_REPEAT_COUNT }, (_, pageIndex) =>
    mockManagedApplicants.map((applicant) =>
      pageIndex === 0
        ? applicant
        : {
            ...applicant,
            id: applicant.id + pageIndex * 1000,
            appliedAt: new Date(
              new Date(applicant.appliedAt).getTime() - pageIndex * 3600000,
            ).toISOString(),
            profile: {
              ...applicant.profile,
              id: applicant.profile.id + pageIndex * 1000,
              name: `${applicant.profile.name} ${pageIndex + 1}`,
            },
          },
    ),
  ).flat();

const getProjectsWithApplicantCount = (applicants: ManagedApplicant[]) =>
  mockApplicantProjects.map((project) => ({
    ...project,
    applicantCount: applicants.filter(
      (applicant) => applicant.projectId === project.id,
    ).length,
  }));

export const useApplicantManagement = () => {
  const [projects, setProjects] = useState<ApplicantProject[]>([]);
  const [managedApplicants, setManagedApplicants] = useState<
    ManagedApplicant[]
  >([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null,
  );
  const [selectedApplicantId, setSelectedApplicantId] = useState<number | null>(
    null,
  );
  const [visibleApplicantCount, setVisibleApplicantCount] =
    useState(APPLICANT_PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const refetch = useCallback(() => {
    setIsLoading(true);

    try {
      const initialProjectId = mockApplicantProjects[0]?.id ?? null;
      const applicants = createMockApplicantPages();

      setProjects(getProjectsWithApplicantCount(applicants));
      setManagedApplicants(applicants);
      setSelectedProjectId(initialProjectId);
      setSelectedApplicantId(
        initialProjectId
          ? getFirstApplicantId(applicants, initialProjectId)
          : null,
      );
      setVisibleApplicantCount(APPLICANT_PAGE_SIZE);
      setErrorMessage("");
    } catch {
      setProjects([]);
      setManagedApplicants([]);
      setSelectedProjectId(null);
      setSelectedApplicantId(null);
      setVisibleApplicantCount(APPLICANT_PAGE_SIZE);
      setErrorMessage(
        "지원자 정보를 불러오지 못했어요. 잠시 후 다시 시도해주세요.",
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

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) ?? null,
    [projects, selectedProjectId],
  );

  const applicants = useMemo(
    () =>
      selectedProjectId
        ? managedApplicants.filter(
            (applicant) => applicant.projectId === selectedProjectId,
          )
        : [],
    [managedApplicants, selectedProjectId],
  );

  const visibleApplicants = useMemo(
    () => applicants.slice(0, visibleApplicantCount),
    [applicants, visibleApplicantCount],
  );

  const hasMoreApplicants = visibleApplicantCount < applicants.length;

  const selectedApplicant = useMemo(
    () =>
      applicants.find((applicant) => applicant.id === selectedApplicantId) ??
      null,
    [applicants, selectedApplicantId],
  );

  const selectProject = useCallback(
    (projectId: number) => {
      setSelectedProjectId(projectId);
      setSelectedApplicantId(getFirstApplicantId(managedApplicants, projectId));
      setVisibleApplicantCount(APPLICANT_PAGE_SIZE);
    },
    [managedApplicants],
  );

  const loadMoreApplicants = useCallback(() => {
    if (isLoadingMore || !hasMoreApplicants) {
      return;
    }

    setIsLoadingMore(true);

    window.setTimeout(() => {
      setVisibleApplicantCount((currentCount) =>
        Math.min(currentCount + APPLICANT_PAGE_SIZE, applicants.length),
      );
      setIsLoadingMore(false);
    }, 250);
  }, [applicants.length, hasMoreApplicants, isLoadingMore]);

  const reviewApplicant = useCallback(
    (applicantId: number, status: ApplicantReviewStatus) => {
      setManagedApplicants((currentApplicants) =>
        currentApplicants.map((applicant) =>
          applicant.id === applicantId ? { ...applicant, status } : applicant,
        ),
      );
    },
    [],
  );

  return {
    projects,
    applicants: visibleApplicants,
    selectedProject,
    selectedProjectId,
    selectedApplicant,
    selectedApplicantId,
    isLoading,
    isLoadingMore,
    hasMoreApplicants,
    isError: Boolean(errorMessage),
    errorMessage,
    selectProject,
    selectApplicant: setSelectedApplicantId,
    loadMoreApplicants,
    reviewApplicant,
    refetch,
  };
};
