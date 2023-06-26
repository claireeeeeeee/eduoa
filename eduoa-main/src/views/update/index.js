import React, { useState } from 'react'
import { Input, Switch, Button, message } from 'antd'
import { Row, Col } from 'antd';
import './index.css'
import axios from '@/axios'
import { useHistory } from 'react-router';
// import Nav from "../../components/nav";

export default function Update () {
  const [Role, setRole] = useState('student')
  const [Firstname, setFirstname] = useState('')
  const [Lastname, setLastname] = useState('')
  const [Phone, setPhone] = useState('')
  const [Bio, setBio] = useState('')
  const history = useHistory()

  function submit () {
    axios
      .post(`${Role}UpdateProfile`, {
        firstname: Firstname,
        lastname: Lastname,
        phone: Phone,
        bio: Bio
      })
      .then(res => {
        message.success('Update success!')
        history.push("/signin")
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
          <Row>
              <Col span={10} offset={7} id={'form'}>
                  <p id={'aatitle'}>Update Your Information</p>
                  <br/>
                  <p className={'chagne'}>
                      Enter your FirstName:
                  </p>
              <Input
                placeholder='Firstname'
                onChange={e => setFirstname(e.target.value)}
              />
                  <p className={'chagne'}>
                      Enter your LastName:
                  </p>
              <Input
                placeholder='Lastname'
                onChange={e => setLastname(e.target.value)}
              />
                  <p className={'chagne'}>
                      Enter your Phone Number:
                  </p>
              <Input placeholder='Phone' onChange={e => setPhone(e.target.value)} />
                  <p className={'chagne'}>
                      Enter your Bio:
                  </p>
              <Input placeholder='Bio' onChange={e => setBio(e.target.value)} />
                  <p className={'chagne'}>
                      Choose the role (student or teacher):
                  </p>
              <Switch
                  checked={Role === 'teacher'}
                  checkedChildren='Teacher'
                  unCheckedChildren='Student'
                  onChange={e => {
                      setRole(Role === 'teacher' ? 'student' : 'teacher')
                  }}
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
