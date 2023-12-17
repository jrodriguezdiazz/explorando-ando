import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const PublicLayout = ({ component: Component, layout: Layout, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
};

PublicLayout.propTypes = {
  component: PropTypes.any,
  layout: PropTypes.any,
  rest: PropTypes.any,
};

export default PublicLayout;
