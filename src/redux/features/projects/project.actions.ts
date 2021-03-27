import axios from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { Project, ProjectArgs, ProjectUpdateArgs } from '../../../lib';
import { projectReducer } from './project.slice';

const {
  createProjectFail,
  createProjectStart,
  createProjectSuccess,
  getCurrentProjectFail,
  getCurrentProjectStart,
  getCurrentProjectSuccess,
  getProjectsFail,
  getProjectsStart,
  getProjectsSuccess,
  updateProjectStart,
  updateProjectSuccess,
  updateProjectFail,
  removeProjectStart,
  removeProjectSuccess,
  removeProjectFail
} = projectReducer.actions;

const URL = process.env.REACT_APP_BASE_API_URL;

axios.defaults.withCredentials = true;

// Create Project
export const createProject = (projectData: ProjectArgs) => async (
  dispatch: Dispatch
): Promise<void> => {
  try {
    dispatch(createProjectStart());

    const { data }: { data: Project } = await axios.post<Project>(
      `${URL}/api/projects`,
      projectData
    );
    dispatch(createProjectSuccess(data));
  } catch ({ message }) {
    dispatch(createProjectFail(message));
  }
};

// Get Projects
export const getAllProjects = () => async (
  dispacth: Dispatch
): Promise<void> => {
  try {
    dispacth(getProjectsStart());

    const { data }: { data: Project[] } = await axios.get(
      `${URL}/api/projects`
    );
    dispacth(getProjectsSuccess(data));
  } catch ({ message }) {
    dispacth(getProjectsFail(message));
  }
};

// Get Project
export const getCurrentProject = (projectId: string) => async (
  dispatch: Dispatch
): Promise<void> => {
  try {
    dispatch(getCurrentProjectStart);

    const { data }: { data: Project } = await axios.get(
      `/api/projects/${projectId}`
    );
    dispatch(getCurrentProjectSuccess(data));
  } catch ({ message }) {
    dispatch(getCurrentProjectFail(message));
  }
};

// Update Project
export const updateProject = (
  projectId: string,
  updateArgs: ProjectUpdateArgs
) => async (dispatch: Dispatch): Promise<void> => {
  try {
    dispatch(updateProjectStart());

    const { data }: { data: Project } = await axios.put(
      `/api/projects/${projectId}`,
      updateArgs
    );
    dispatch(updateProjectSuccess(data));
  } catch ({ message }) {
    dispatch(updateProjectFail(message));
  }
};

// Remove Project
export const removeProject = (projectId: string) => async (
  dispatch: Dispatch
): Promise<void> => {
  try {
    dispatch(removeProjectStart());

    await axios.delete(`/api/projects/${projectId}`);
    dispatch(removeProjectSuccess(projectId));

    getAllProjects();
  } catch ({ message }) {
    dispatch(removeProjectFail(message));
  }
};
