import React from "react"
import PropTypes from "prop-types"

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const Header = ({ children }) => (
  <header
    style={{
      // background: `#007acc`,
      // background: `white`,
      color: `white`,
      marginBottom: `0.15rem`,
    }}
  >
    <div
      style={{
        padding: `0.75rem 0 0 0.75rem`,
      }}
    >
      <Row style={{ marginRight: 0, marginLeft: 0 }}>
        <Col lg={12}>          
            {children}
        </Col>
      </Row>
    </div>
  </header>
)

Header.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Header
