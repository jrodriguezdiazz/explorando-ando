import React, {useState} from 'react';
import {Col, Collapse, Container, Row} from 'react-bootstrap';
import {Drawer,} from 'react-bootstrap-drawer';
import 'react-bootstrap-drawer/lib/style.css';
import {Eye} from 'react-bootstrap-icons';
// import {Link} from 'react-router-dom';
//
const links = [
  {
    label: 'Panel General',
    link: '/dashboard',
    icon: <Eye />,
  },
  {
    label: 'Destinos',
    link: '/dashboard/destino',
    icon: <Eye />,
  },
];

const ApplicationDrawer = (props) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);

  return (
    <Drawer {...props}>
      <Drawer.Toggle onClick={handleToggle} />

      <Collapse in={open}>
        <Drawer.Overflow>
          <Drawer.ToC>
            <Drawer.Header href="/">Application</Drawer.Header>
            {links.map(({label, link}) => (
              <Drawer.Nav key={label}>
                <Drawer.Item href={link}>{label}</Drawer.Item>
              </Drawer.Nav>
            ))}
          </Drawer.ToC>
        </Drawer.Overflow>
      </Collapse>
    </Drawer>
  );
};

const MiniDrawer = (props) => {
  return (
    <Container fluid>
      <Row className="flex-xl-nowrap">
        <Col as={ApplicationDrawer} xs={12} md={3} lg={2} />
        <Col xs={12} md={9} lg={10}>{props.children}</Col>
      </Row>
    </Container>
  );
};
export default MiniDrawer;
