import { User } from '../../../../lib';
import { Dashboard } from '../../../../pages';
import { PrivateRoute } from './privateRoute';

export const PrivateRoutes = ({ viewer }: { viewer: User | null }) => {
  return (
    <>
      <PrivateRoute exact path={`/dashboard/${viewer?.id}`}>
        {viewer && <Dashboard viewer={viewer} />}
      </PrivateRoute>
    </>
  );
};
