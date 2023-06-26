import React from 'react'
import Nav from '../../components/nav'
import Home from "../../components/Home";

// import { useStore } from '@/store'
// import axios from '@/axios'

export default function Index () {
  // const [state, dispatch] = useStore()

  function handleClick (e) {
    // axios.get('http://localhost:3000')
    // console.log(state)
    // dispatch({ type: 'set', value: e.target.innerHTML })
    // console.log(state)
  }

  return (
    <div onClick={handleClick}>
      <Nav />
      <Home />
    </div>
  )
}
