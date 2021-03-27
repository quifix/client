import { ComponentType, ReactNode } from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

interface Props {
  children?: ReactNode;
  component?:
    | ComponentType<RouteComponentProps<ReactNode>>
    | ComponentType<ReactNode>;
  render?: (props: RouteComponentProps<ReactNode>) => ReactNode;
  exact?: boolean;
  path: string;
}

export const PrivateRoute = ({
  children,
  ...otherProps
}: Props): JSX.Element => {
  const { isAuthenticated, user } = useAuth0();

  return (
    <Route
      {...otherProps}
      render={() => {
        if (isAuthenticated && user) {
          return <>{children}</>;
        } else {
          return <Redirect to="/" />;
        }
      }}></Route>
  );
};
