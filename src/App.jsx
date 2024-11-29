import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {
  const [user, setUser] = useState([]);

  useEffect(()=>{
    const loadData = async ()=>{
      const response = await fetch('http://localhost:5000/users')
      const data = await response.json()
      setUser(data);
    }
    loadData()
  },[])

  const handleUserSent = (event)=>{
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const email= form.email.value;
    const user = {name, email}
    console.log(user);
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        "content-type": 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res=> res.json())
    .then(data =>{
      console.log(data)
    })
  }
  return (
    <>
    <h1>user management client site</h1>
    <form onSubmit={handleUserSent}>
      <input type="text" name="name" />
      <br />
      <input type="email" name="email" />
      <br />
      <input type="submit" />
    </form>      
    {
      <h1>current user is {user.length}</h1>
    }
    </>
  )
}

export default App
