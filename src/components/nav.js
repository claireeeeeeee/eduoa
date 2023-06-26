import React from 'react'
import { withRouter } from 'react-router-dom'
import { Menu } from 'antd'
import './html.css'
import { Row, Col } from 'antd';

class Nav extends React.Component {
  handleClick = e => {
    this.props.history.push(e.key)
  }

  render () {
    return (
        <Row>
            <Col span={19}>
              <Menu mode='horizontal'>
                  <Menu.Item onClick={this.handleClick} key='/index'>
                      <img src={process.env.PUBLIC_URL + '/logo.png' } width={"180px"} height={"64px"} alt={"logo"}></img>
                  </Menu.Item>
              </Menu>
            </Col>
              <Col span={5}>
                  <Menu mode='horizontal'>
                        <Menu.Item onClick={this.handleClick} key='/signup'>
                            <p>Sign Up</p>
                        </Menu.Item>
                        <Menu.Item onClick={this.handleClick} key='/signin'>
                            <p>Sign In</p>
                        </Menu.Item>
                  </Menu>
              </Col>
        </Row>
    )
  }
}

export default withRouter(Nav)
