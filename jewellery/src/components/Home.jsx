import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/Home.css';
import o1 from "../assets/images/shreya/backvid.mp4";
import o2 from "../assets/images/shreya/celestiafinal.png";
import o3 from "../assets/images/shreya/final-blend.jpeg";
import o4 from "../assets/images/shreya/take.jpeg";
import o5 from "../assets/images/shreya/neckimg-champayne.jpeg";
import o6 from "../assets/images/shreya/green2.jpeg";
import o7 from "../assets/images/shreya/green3.jpeg";
import o8 from "../assets/images/shreya/green1.jpeg";
import o9 from "../assets/images/shreya/water.jpeg";
import o10 from "../assets/images/shreya/sleeves.jpeg";
import o11 from "../assets/images/shreya/sabrina.jpeg";
import o12 from "../assets/images/shreya/lana.jpeg";
import o13 from "../assets/images/shreya/gomez.jpeg";
import o14 from "../assets/images/shreya/Nature.jpeg";
import JewelryShop from './JewelryShop';

const Home = () => {
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');

  useEffect(() => {
    setShowNewsletter(true);
  }, []);

  const closeNewsletter = () => {
    setShowNewsletter(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('Sending...');

    const formData = new FormData();
    formData.append('access_key', 'a15363cd-bdf1-4a1d-9379-f5d5fb768ae3');
    formData.append('name', firstName);
    formData.append('email', email);
    formData.append('subject', 'Newsletter Subscription');
    formData.append('message', `Thank you for subscribing to our newsletter, ${firstName}!`);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('Thank you for subscribing!');
        setFirstName('');
        setEmail('');
        setTimeout(() => {
          closeNewsletter();
          setSubmitStatus('');
        }, 3000);
      } else {
        setSubmitStatus('Submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      {showNewsletter && (
        <div className="newsletter-overlay">
          <div className="newsletter-popup">
            <button className="close-button" onClick={closeNewsletter} style={{color:'black'}} aria-label="Close newsletter popup">
              &times;
            </button>
            <img src={o2} alt="Newsletter" style={{ width: '100%' }} />
            <div className="newsletter-content">
              <h2>Join our Circle</h2>
              <p>SIGN UP HERE AND BE THE FIRST TO HEAR ABOUT NEW PRODUCTS, POP-UPS, EXCLUSIVES, AND EVENTS. UNSUBSCRIBE ANYTIME</p>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="fname">FIRST NAME</label>
                  <input 
                    type="text" 
                    id="fname" 
                    name="fname" 
                    className="text-black"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">EMAIL</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="text-black"
                    name="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
                <button type="submit" className="submit-button">
                  SEND
                </button>
              </form>
              {submitStatus && <p className="submit-status">{submitStatus}</p>}
            </div>
          </div>
        </div>
      )}

      <div className="vid">
        <video autoPlay loop muted playsInline className="back">
          <source src={o1} type="video/mp4" />
        </video>
        <div className="content">
          <h1>Celestia</h1>
          <h2>Crafted for Your Celestial Moments</h2>
          <Link to="/shop">SHOP OUR COLLECTION</Link>
        </div>
      </div>
      
      <section className="aftervid">
        <div style={{ paddingTop: '8%', display: 'flex', justifyContent: 'center', paddingBottom: '4%' }}>
          <div className="img1" style={{ paddingLeft: '6%', marginBottom: '5%', animation: 'img1 4s ease-in 0s 1 normal forwards' }}>
            <img src={o3} alt="" height="675" width="500" />
          </div>
          <div style={{ paddingLeft: '5%', paddingRight: '1%', paddingTop: '4%', lineHeight: '1.5', letterSpacing: '0 36px' }}>
            <h4 style={{ color: '#a0a0a0', fontFamily: 'Prospectus-Bold', textTransform: 'uppercase', fontSize: '100%' }}>
              <b>MEET CELESTIA</b>
            </h4>
            <h2 style={{ color: '#a0a0a0', fontFamily: 'Prospectus-Bold', textTransform: 'uppercase', fontSize: '200%' }}>
              <b>Built to withstand, change, and move through life with you.</b>
            </h2>
            <p style={{ fontSize: '110%', color: '#a0a0a0' }}>
              We create design-forward, customizable fine jewelry that empowers modern women to buy for themselves, on their own terms.
            </p>
            <Link to="/our-story" style={{ textDecoration: 'none' }}>
              <h2 style={{ color: '#c95813', textAlign: 'center', lineHeight: '5', fontFamily: 'Prospectus-Bold', fontSize: '150%' }}>Learn More &rarr;</h2>
            </Link>
          </div>
          <div style={{ paddingLeft: '6%', paddingTop: '10%', paddingRight: '9%' }}>
            <img src={o4} alt="" height="400" />
          </div>
        </div>
      </section>
<JewelryShop/>
      <section className="collection">
        <div style={{ paddingTop: '7%', display: 'flex', justifyContent: 'center' }}>
          <div className="img1" style={{ paddingLeft: '7%', marginBottom: '10%', animation: 'img1 4s ease-in 0s 1 normal forwards' }}>
            <img src={o5} alt="" height="600" width="400" />
          </div>
          <div style={{ paddingLeft: '5%', lineHeight: '1.5', letterSpacing: '0 36px', paddingRight: '10%' }}>
            <h4 style={{ color: '#ffffff', fontFamily: 'Prospectus-Bold', fontSize: '100%', letterSpacing: '5px' }}>NEW</h4>
            <h2 style={{ color: '#ffffff', fontFamily: 'Prospectus-Bold', textTransform: 'uppercase', fontSize: '200%' }}>
              <b>Interstellar Collection</b>
            </h2>
            <p style={{ color: '#36561F', fontFamily: 'Prospectus-Bold', textTransform: 'uppercase', fontSize: '150%', textAlign: 'center' }}>
              Inspired by the infinite possibilities of the universe. Each piece is crafted with love and care, to bring you closer to your celestial moments.
            </p>
          </div>
          <div style={{ paddingTop: '10%', paddingRight: '7%' }}>
            <img src={o6} alt="" height="300" width="270" />
            <p style={{ fontSize: '90%', color: '#36561F', justifyContent: 'center', paddingTop: '10%' }}>
              Thoughtful design combinations and adaptable elements mirror our own shifting connections with the world around us.
              Featuring community-curated sets, lustrous pearls, golden cuffs, and danglers provide perennial style pieces that come together in myriad ways, allowing you to link pieces as you like, creating a distinct expression of self that is ever-evolving.
            </p>
          </div>
        </div>
      </section>

      <section className="step">
        <h1 style={{ textAlign: 'center', fontSize: '250%', paddingBottom: '3%' }}>3 Simple Steps</h1>
        <div className="design">
          <h2 style={{ fontSize: '150%', letterSpacing: '5px', textAlign: 'center' }}>DESIGN FOR YOURSELF</h2><br />
          <img src={o7} className="design-img1" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '50%', height: '600px', borderRadius: '10%' }} alt="Design step 1" />
          <img src={o8} className="design-img2" style={{ display: 'block', marginLeft: '12%', marginRight: 'auto', width: '20%', marginTop: '16%', borderRadius: '10%' }} alt="Design step 2" />
        </div><br /><br />
        <div className="boxes">
          <div className="box1">
            <h3>step 1</h3>
            <h2>Select Jewelry Type</h2>
          </div>
          <div className="box2">
            <h3>step 2</h3>
            <h2>Select Your Base</h2>
          </div>
          <div className="box3">
            <h3>step 3</h3>
            <h2>Add Danglers</h2>
          </div>
          <div className="box4">
            <Link to="/step" style={{ textDecoration: 'none', color: '#c95813' }}><h2>Create Your Jewelry Now &rarr;</h2></Link>
          </div>
        </div>
      </section>

      <section className="build">
        <div className="companion" style={{ display: 'flex' }}>
          <div className="companion-some" style={{ paddingTop: '7%', paddingRight: '20%', paddingBottom: '7%', paddingLeft: '15%', animation: 'water 4s ease-in 0s 1 normal forwards' }}>
            <h2 style={{ color: '#ffffff', fontFamily: 'Prospectus-Bold', fontSize: '120%', letterSpacing: '5px', fontWeight: 'lighter', textAlign: 'center' }}>BUILD YOUR OWN SETS</h2><br />
            <img src={o9} alt="Build your own sets" height="500" /><br /><br />
            <div className="finest">
              <h1 style={{ fontSize: '200%', textAlign: 'center' }}>Our finest jewelry</h1><br />
              <Link to="/luxury" style={{ textDecoration: 'none' }}><h2 style={{ color: '#c95813', textAlign: 'center', fontFamily: 'Prospectus-Bold', fontSize: '150%' }}>Shop Luxury Collection &rarr;</h2></Link>
            </div>
          </div>
          <div className="sleeves" style={{ display: 'flex', justifyContent: 'end', height: '890px' }}>
            <img src={o10} width="696" alt="Sleeves" />
          </div>
        </div>
      </section>

      <section className="media">
        <div className="press" style={{ textAlign: 'center', paddingTop: '7%' }}>
          <h2 style={{ fontFamily: 'Prospectus-Bold', fontSize: '100%', letterSpacing: '10px', textAlign: 'center' }}>MEDIA</h2><br />
          <h2 style={{ textAlign: 'center', fontSize: '250%', paddingBottom: '3%' }}>Press</h2>
        </div>
        <div className="media-people" style={{ paddingBottom: '53%' }}>
          <div className="people-container">
            <div className="people">
              <img src={o11} style={{ width: '100%', paddingLeft: '7%', height: '650px', paddingBottom: '3%' }} alt="Sabrina Carpenter" />
              <h1 style={{ fontSize: '200%', textAlign: 'center' }}>Sabrina Carpenter</h1><br />
              <h2 style={{ textAlign: 'center', fontSize: '120%', color: '#5a5858' }}>13 Up and Coming Jewelry Designers to Look Out For</h2>
            </div>
            <div className="people">
              <img src={o12} style={{ width: '100%', height: '650px', paddingBottom: '3%' }} alt="Lana Del Ray" />
              <h1 style={{ fontSize: '200%', textAlign: 'center' }}>Lana Del Ray</h1><br />
              <h2 style={{ textAlign: 'center', fontSize: '120%', color: '#5a5858' }}>Fine jewelry brand does customization like you've never seen it</h2>
            </div>
            <div className="people">
              <img src={o13} style={{ width: '100%', paddingRight: '7%', height: '650px', paddingBottom: '3%' }} alt="Selena Gomez" />
              <h1 style={{ fontSize: '200%', textAlign: 'center' }}>Selena Gomez</h1><br />
              <h2 style={{ textAlign: 'center', fontSize: '120%', color: '#5a5858' }}>Women Designers and CEOS Who Revolutionized the Fashion Industry in 2016</h2>
            </div>
          </div>
        </div>
      </section>

      <div style={{
        backgroundImage: `url(${o14})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '95vh',
        width: '98.9vw',
        left: 0,
        marginBottom: '5%',
        color: '#ffffff',
        fontFamily: 'Prospectus-Bold'
      }}>
        <p style={{ paddingTop: '4%', paddingLeft: '5%', fontSize: '150%' }}>Find out first about our launches,<br /> exclusive offers and private pop-ups.</p>
        <p style={{ paddingLeft: '5%', paddingTop: '15%', fontSize: '500%' }}><b>Stay in the Loop</b></p>
        <Link to="/signup" style={{ color: '#ffffff', paddingLeft: '5%', fontSize: '150%', lineHeight: 3 }}>Sign up to be an insider  &rarr;</Link>
      </div>
    </div>
  );
};

export default Home;