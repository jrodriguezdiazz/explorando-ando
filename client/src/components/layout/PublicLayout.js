import {Fragment} from 'react';
import {Container} from 'react-bootstrap';
import AppBar from '../common/AppBar';
import FooterPublic from '../common/FooterPublic';

const PublicLayout = ({children}) => {
  return (
    <Fragment>
      <AppBar />
      <Container>
        <main>{children}</main>
      </Container>
      <FooterPublic />
    </Fragment>
  );
};


export default PublicLayout;
