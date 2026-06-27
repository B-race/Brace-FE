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

const getFirstApplicantId = (
  applicants: ManagedApplicant[],
  projectId: number,
) =>
  applicants.find((applicant) => applicant.projectId === projectId)?.id ?? null;

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
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const refetch = useCallback(() => {
    setIsLoading(true);

    try {
      const initialProjectId = mockApplicantProjects[0]?.id ?? null;

      setProjects(mockApplicantProjects);
      setManagedApplicants(mockManagedApplicants);
      setSelectedProjectId(initialProjectId);
      setSelectedApplicantId(
        initialProjectId
          ? getFirstApplicantId(mockManagedApplicants, initialProjectId)
          : null,
      );
      setErrorMessage("");
    } catch {
      setProjects([]);
      setManagedApplicants([]);
      setSelectedProjectId(null);
      setSelectedApplicantId(null);
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
    },
    [managedApplicants],
  );

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
    applicants,
    selectedProject,
    selectedProjectId,
    selectedApplicant,
    selectedApplicantId,
    isLoading,
    isError: Boolean(errorMessage),
    errorMessage,
    selectProject,
    selectApplicant: setSelectedApplicantId,
    reviewApplicant,
    refetch,
  };
};
