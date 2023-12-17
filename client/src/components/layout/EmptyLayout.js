import PropTypes from 'prop-types';

const EmptyLayout = ({children}) => {

  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

EmptyLayout.propTypes = {
  children: PropTypes.element,
};

export default EmptyLayout;
