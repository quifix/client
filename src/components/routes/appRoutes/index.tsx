import { PublicRoutes } from './publicRoutes';
import { PrivateRoutes } from './privateRoutes';
import { useAuthAxios } from '../../../hooks';

export const Approutes = (): JSX.Element => {
  const { viewer } = useAuthAxios();

  return (
    <>
      <PublicRoutes viewer={viewer} />
      <PrivateRoutes viewer={viewer} />
    </>
  );
};
