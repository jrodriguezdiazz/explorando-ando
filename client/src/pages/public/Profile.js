import React from 'react';
import {Col, Container, Image, Nav, Row} from 'react-bootstrap';

const UserProfile = () => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <div className="profile-header" style={{background: 'linear-gradient(to right, #ff758c 0%, #ff7eb3 100%)'}}>
            <Image src="path_to_profile_image.jpg" roundedCircle />
            <h2>John Doe</h2>
            <span>john.doe@gmail.com</span>
          </div>

          <Nav variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
              Cuenta
            </Nav.Item>
            <Nav.Item>
              Option 2
            </Nav.Item>
            <Nav.Item>

              Disabled
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
