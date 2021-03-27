import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  useAppSelector as useSelector,
  getAllProjects,
  createProject
} from '../../redux';
import { ProjectArgs, User } from '../../lib';

export const Dashboard = ({ viewer }: { viewer: User | null }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  const projects = useSelector(state => state.project.projects);
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    title: yup.string().trim().min(3).max(200).required(),
    description: yup.string().trim().min(3).max(500).required(),
    address: yup.string().trim().min(3).max(255).required(),
    country: yup.string().trim().min(3).max(200).required(),
    city: yup.string().trim().min(3).max(128).required(),
    state: yup.string().trim().min(3).max(200).required()
  });

  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: ProjectArgs) => {
    data.userId = viewer?.id || '';
    data.type = 'CONSTRUCTION';
    dispatch(createProject(data));
    // console.log(data);
  };

  useEffect(() => {
    if (isAuthenticated && !isLoading && viewer) {
      dispatch(getAllProjects());
    }
  }, [dispatch, isAuthenticated, isLoading, viewer]);

  if (projects.length > 0) {
    console.log(projects);
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">
            <input
              type="text"
              name="title"
              ref={register}
              placeholder="Enter Title"
            />
          </label>
          {errors.title && <>{errors.title}</>}
        </div>
        <div>
          <label htmlFor="description">
            <input
              type="text"
              name="description"
              ref={register}
              placeholder="Enter Description"
            />
          </label>
          {errors.description && <>{errors.description}</>}
        </div>
        <div>
          <label htmlFor="address">
            <input
              type="text"
              name="address"
              ref={register}
              placeholder="Enter Address"
            />
          </label>
          {errors.address && <>{errors.address}</>}
        </div>
        <div>
          <label htmlFor="country">
            <input
              type="text"
              name="country"
              ref={register}
              placeholder="Enter Country"
            />
          </label>
          {errors.country && <>{errors.country}</>}
        </div>
        <div>
          <label htmlFor="city">
            <input
              type="text"
              name="city"
              ref={register}
              placeholder="Enter City"
            />
          </label>
          {errors.city && <>{errors.city}</>}
        </div>
        <div>
          <label htmlFor="state">
            <input
              type="text"
              name="state"
              ref={register}
              placeholder="Enter State"
            />
          </label>
          {errors.state && <>{errors.state}</>}
        </div>

        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};
