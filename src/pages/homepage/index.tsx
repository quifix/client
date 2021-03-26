import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { User } from '../../lib';

export const Homepage = ({ viewer }: { viewer: User | null }) => {
  const history = useHistory();

  useEffect(() => {
    if (viewer) {
      history.push(`/dashboard/${viewer.id}`);
    }
  }, [viewer, history]);

  return <div>Home</div>;
};
