import { Route } from 'react-router-dom';
import { Homepage } from '../../../../pages';
import { User } from '../../../../lib';

export const PublicRoutes = ({ viewer }: { viewer: User | null }) => {
  return (
    <>
      <Route exact path="/" render={props => <Homepage viewer={viewer} />} />
    </>
  );
};
