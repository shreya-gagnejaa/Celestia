import React from 'react'
import l1 from "../assets/images/aneet/signnnn.jpeg"
import "./css/Login.css"
function Login() {
  return (
    <>
     <div className="containerlo">
        
        <img src={l1} className="imglo" alt="Newsletter" style={{width: '100%', height:'99.9vh'}}/>
        <div className="centered">
            <h1  className='h1lo'>Lets be Friends</h1>
            <h3 className="h3lo"> SIGN UP HERE AND BE THE FIRST TO HEAR ABOUT NEW PRODUCTS, POP-UPS, EXCLUSIVES, AND EVENTS. UNSUBSCRIBE ANYTIME </h3>
            <form action="/action_page.php" method="get">
                <label for="fname">FIRST NAME</label>
                <input className='inlo' type="text" id="fname" name="fname"/><br/><br/>
                <label for="email">EMAIL</label>
                <input className='inlo' type="email" id="email" name="email"/><br/><br/>
                <input className='inlo' type="submit" value="Send"></input>
            </form>
        </div>
    </div>
      
    </>
  )
}

export default Login
