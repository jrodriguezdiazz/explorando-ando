import {Col, Row} from 'react-bootstrap';
// import Product from './Product';
// import SummaryBox from './SummaryBox';

const products = [];

const AdminDashboard = () => {
  return (
    <div>
      <h2 style={{paddingBottom: '15px'}}>Panel General</h2>
      <Row style={{marginBottom: '15px'}}>
        <Col lg={3} sm={6} xl={3} xs={12}>
          {/*<SummaryBox*/}
          {/*  Icon={AddShoppingCart}*/}
          {/*  color="pink"*/}
          {/*  title="Boletas vendidas este mes"*/}
          {/*  value="1500k"*/}
          {/*/>*/}
        </Col>
        {/* ... otros SummaryBox aquí */}
      </Row>

      <Row style={{marginBottom: '15px'}}>
        <Col xs>
          {/*<Product data={products} />*/}
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
