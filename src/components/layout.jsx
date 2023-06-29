import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import TopMenu from './topmenu';
import LeftMenu from './leftmenu';
import "./layout.css";

const Layout = ({ children, onItemSelected, onItemRemoved, onItemClonned, topMenu, leftMenu, isBusy }) => {
  return (
    <>
      <TopMenu onItemSelected={onItemSelected} menu={topMenu} isBusy={isBusy} />

      <Row style={{ marginLeft: 0, marginRight: 0 }}>
        <Col lg={3} style={{ paddingLeft: 0, paddingRight: 0 }}>
          <LeftMenu onItemSelected={onItemSelected} onItemRemoved={onItemRemoved} onItemClonned={onItemClonned} menu={leftMenu} />
        </Col>
        <Col style={{ paddingLeft: 0, paddingRight: 0 }}>
          <main>{children}</main>
        </Col>
      </Row>
      <footer style={{
        textAlign: `center`,
        width: `100%`,
        marginTop: `auto`,
        display: `block`
      }}>
        <small style={{ color: `#ccc`}}>© {new Date().getFullYear()}, Built by</small>
        {` `}
        <a href="https://migfig.github.io">@migfig</a>
      </footer>
    </>
  )
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
  onItemSelected: PropTypes.func.isRequired,
  onItemRemoved: PropTypes.func.isRequired,
  onItemClonned: PropTypes.func.isRequired,
  topMenu: PropTypes.array.isRequired,
  leftMenu: PropTypes.array.isRequired,
  isBusy: PropTypes.bool.isRequired,
}

export default Layout
