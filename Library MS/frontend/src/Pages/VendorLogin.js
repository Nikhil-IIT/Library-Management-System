import React, { useState } from 'react'

const LoginSignup = () => {
  const [state,setState] = useState("Login");
  const [formData,setformData] = useState({
    username:"",
    email:"",
    password:""
  })
  const changeHandler =(e)=>{
    setformData({...formData,[e.target.name]:e.target.value})
  }
  console.log(formData);
  const handlebtn=()=>{
    state==="Login"?setState("SignUp"):setState("Login")
  }

  const login = async () => {
    const url = 'http://localhost:3001/vendor_login';
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    };
  
    await fetch(url, requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response is not Ok.");
        }
        return res.json();
      }).then((data) => {
        if (data.success) {
          localStorage.setItem('auth-token', data.token);
          if (data.isAdmin) {
            window.location.replace("/admin_panel");
          } else {
            window.location.replace("/vendor_panel");
          }
        } else {
          alert("Wrong password");
        }
      }).catch(err => {
        console.error("Some error while authentication", err);
      });
  };

  
  const signup= async()=>{
    const url = 'http://localhost:3001/vendor_register'
    const requestOptions={
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    }
    await fetch(url,requestOptions)
    .then((res)=>{
      if(!res.ok){
        throw new Error("Network response is not Ok.");
      }
      return res.json();
    }).then((data)=>{
      if(data.success){
        localStorage.setItem('auth-token',data.token)
        window.location.replace("/");
      }
      else{
        alert("Existing User find with the same email Adress");
      }
    }).catch(err=>{
      console.error("Some error while authentication",err);
    })
  }
  return (
    <div className='loginSignup'>
      <div className='loginSignup-container'>
        
        <h1>{state}</h1>
        
        <div className='loginsignup-fields'>
          {state==="SignUp"?<input defaultValue={formData.username} onChange={changeHandler} name='username' type='text' placeholder='Your Name'/>:<></>}
          <input name='email' defaultValue={formData.email} onChange={changeHandler} type='email' placeholder='Email Adress'/>
          <input name='password' defaultValue={formData.password} onChange={changeHandler} type='password' placeholder='Password'/>
        </div>

        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>

        <p className='loginsignup-login'>{state==="SignUp"?"Alredy have an account?":"Create an Account?"}<button onClick={handlebtn} style={{marginLeft:"4px"}}>Click HERE!!</button></p>
      </div>
    </div>
  )
}

export default LoginSignup;
