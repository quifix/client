import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Project } from '../../../lib';

interface State {
  loading: boolean;
  projects: Project[];
  currentProject: Project | null;
  error: AxiosError<string> | null;
}

const initialState: State = {
  loading: false,
  projects: [],
  currentProject: null,
  error: null
};

export const projectReducer = createSlice({
  name: 'project',
  initialState,
  reducers: {
    // CREATE PROJECT
    createProjectStart: (state: State): void => {
      state.loading = true;
    },
    createProjectSuccess: (
      state: State,
      action: PayloadAction<Project>
    ): void => {
      state.loading = false;
      state.error = null;
      state.projects.push(action.payload);
    },
    createProjectFail: (
      state,
      action: PayloadAction<AxiosError<string>>
    ): void => {
      state.loading = false;
      state.error = action.payload;
    },

    // READ PROJECTS
    getProjectsStart: (state: State): void => {
      state.loading = true;
      state.error = null;
    },
    getProjectsSuccess: (
      state: State,
      action: PayloadAction<Project[]>
    ): void => {
      state.loading = false;
      state.projects = action.payload;
    },
    getProjectsFail: (
      state: State,
      action: PayloadAction<AxiosError<string>>
    ): void => {
      state.loading = false;
      state.error = action.payload;
    },

    // READ PROJECT
    getCurrentProjectStart: (state: State): void => {
      state.loading = true;
      state.error = null;
    },
    getCurrentProjectSuccess: (
      state: State,
      action: PayloadAction<Project>
    ): void => {
      state.loading = false;
      state.currentProject = action.payload;
    },
    getCurrentProjectFail: (
      state: State,
      action: PayloadAction<AxiosError<string>>
    ): void => {
      state.loading = false;
      state.error = action.payload;
    },

    // UPDATE PROJECT
    updateProjectStart: (state: State): void => {
      state.loading = true;
      state.error = null;
    },
    updateProjectSuccess: (
      state: State,
      action: PayloadAction<Project>
    ): void => {
      const foundProject: Project[] = state.projects.filter(
        project => project.id === action.payload.id
      );

      const updatedProject: Project = { ...foundProject[0], ...action.payload };

      state.projects.push(updatedProject);
      state.loading = false;
    },
    updateProjectFail: (
      state: State,
      action: PayloadAction<AxiosError<string>>
    ): void => {
      state.loading = false;
      state.error = action.payload;
    },

    // REMOVE PROJECT
    removeProjectStart: (state: State): void => {
      state.loading = true;
      state.error = null;
    },
    removeProjectSuccess: (
      state: State,
      action: PayloadAction<string>
    ): void => {
      const foundProject = state.projects.filter(
        project => project.id === action.payload
      );
      const index = state.projects.indexOf(foundProject[0]);
      state.projects.splice(index, 1);
      state.loading = false;
    },
    removeProjectFail: (
      state: State,
      action: PayloadAction<AxiosError<string>>
    ): void => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});
