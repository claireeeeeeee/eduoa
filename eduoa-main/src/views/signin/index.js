import React, { useState } from 'react'
import { Input, Button, message } from 'antd'
import axios from '@/axios'
import Nav from '../../components/nav'
import { useHistory } from 'react-router'
import { Row, Col } from 'antd';
import './aindex.css'

export default function Signin (props) {
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const history = useHistory()

  function submit () {
    axios
      .post('/Login', { email: Email, password: Password })
      .then(res => {
        message.success('Login success!')
        window.localStorage.setItem('jwt', res.data.token)
        history.push('/app')
      })
      .catch(e => {
        if (e.response) {
          for (const i in e.response.data.errors) {
            if (typeof e.response.data.errors[i] === 'string') {
              message.error(e.response.data.errors[i])
            } else {
              for (const j of e.response.data.errors[i]) {
                message.error(j)
              }
            }
          }
        }
      })
  }

  return (
    <div id={'signupDiv'}>
      <Nav />
        <Row>
            <Col span={10} offset={7} id={'form'}>
                <p id={'aatitle'}>Sign In</p>
                <br/>
                <p className={'chagne'}>
                    Enter your email:
                </p>
              <Input placeholder='Email' onChange={e => setEmail(e.target.value)} />
                <p className={'chagne'}>
                    Enter your password:
                </p>
              <Input
                type='password'
                placeholder='Password'
                onChange={e => setPassword(e.target.value)}
              />
                <br/>
                <br/>
                <Row>
                    <Col span={2} offset={10}>
                      <Button type='primary' onClick={e => submit(e)}>
                        Submit
                      </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
  )
}
