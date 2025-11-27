import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  async function handle(e){
    e.preventDefault();
    try{
      const res = await axios.post('/api/auth/login',{email,password});
      alert('Logged in. Token: ' + res.data.token.slice(0,20) + '...');
      // store token in localStorage (for demo)
      localStorage.setItem('token', res.data.token);
      window.location.href = '/';
    }catch(err){
      alert(err?.response?.data?.message || err.message);
    }
  }
  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handle}>
        <div>
          <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div style={{marginTop:8}}>
          <input type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <div style={{marginTop:8}}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
