import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import CategoryList from "../categories/CategoryList";
import ProductList from "../products/ProductList";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Container className="bg-light shadow p-3 rounded">
          <Row>
            <Col className="border-right" sm="3">
              <CategoryList />
            </Col>
            <Col sm="9">
              <ProductList />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Dashboard;
