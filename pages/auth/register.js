import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [email,setEmail]=useState('');
  const [name,setName]=useState('');
  const [password,setPassword]=useState('');
  async function handle(e){
    e.preventDefault();
    try{
      const res = await axios.post('/api/auth/register',{email,password,name});
      alert('Registered. Token: ' + res.data.token.slice(0,20) + '...');
      localStorage.setItem('token', res.data.token);
      window.location.href = '/';
    }catch(err){
      alert(err?.response?.data?.message || err.message);
    }
  }
  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handle}>
        <div><input placeholder="name" value={name} onChange={e=>setName(e.target.value)} /></div>
        <div style={{marginTop:8}}><input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} /></div>
        <div style={{marginTop:8}}><input type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
        <div style={{marginTop:8}}><button type="submit">Register</button></div>
      </form>
    </div>
  );
}
