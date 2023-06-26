import React, { useState } from 'react'
import { Input, Button, message } from 'antd'
import axios from '@/axios'
import Nav from '../../components/nav'
import { Row, Col } from 'antd';
import './index.css'

export default function Signup (props) {
  const [Email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  function submit (e) {
    if (password !== confirmPassword) {
      message.error('Please confirm your password!')
    } else {
      axios
        .post('/Register', { email: Email, password: password })
        .then(res => {
          message.success('Register success!')
          window.localStorage.setItem('jwt', res.data.token)
          props.history.push('/update')
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
  }

  return (
    <div id={'signupDiv'}>
        <Nav/>
        <Row>
            <Col span={10} offset={7} id={'form'}>

                <p id={'aatitle'}>Sign Up</p>
                <p className={'chagne'}>
                    Enter your email:
                </p>
                  <Input placeholder='Email' onChange={e => setEmail(e.target.value)} />
                <br/>
                <p className={'chagne'}>
                    Enter your password:
                </p>
                  <Input
                    type='password'
                    placeholder='Password'
                    onChange={e => setPassword(e.target.value)}
                  />
                <p className={'chagne'}>
                    Enter your password again:
                </p>
                  <Input
                    type='password'
                    placeholder='Confirm Password'
                    onChange={e => setConfirmPassword(e.target.value)}
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
