import { PublicRoutes } from './publicRoutes';
import { useAuthAxios } from '../../../hooks';
// import { PrivateRoute } from './privateRoutes';

export const Approutes = (): JSX.Element => {
  const { viewer } = useAuthAxios();

  return (
    <>
      <PublicRoutes viewer={viewer} />
    </>
  );
};
