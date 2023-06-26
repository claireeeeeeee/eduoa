import React, {Component} from 'react';
import './html.css'
import {Row, Col, Button} from 'antd';

class Home extends Component {
    handleClick = e => {
        this.props.history.push(e.key)
    }

    render() {
        return (
            <Row>
                <Col span={14}>
                    <img id={'homeImg'} src={process.env.PUBLIC_URL + '/home.png'} alt={'Home'}/>
                </Col>
                <Col span={10}>
                    <div id={'homeDiv'}>
                        <p id={'atitle'}>EdUoA</p>
                        <p id={'subtitle'}>For a bright future</p>
                        <p id={'subtitle2'}>Register now for a fun-filled learning experience!</p>
                        <Row>
                            <Col span={2} offset={8}>
                                <Button type='primary' href={"/signup"}>
                                    Register
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default Home;