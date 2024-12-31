import React from 'react';
import './css/About.css';
import a1 from '../assets/images/aneet/video.mp4';
import a2 from '../assets/images/aneet/imgg1.jpeg';
import a3 from '../assets/images/aneet/img2.jpeg';
import a4 from '../assets/images/aneet/imgg3.jpeg';
import a5 from '../assets/images/aneet/piccc.jpeg';
import a6 from '../assets/images/aneet/pic.jpeg';
import a7 from '../assets/images/aneet/side.jpeg';
import a8 from '../assets/images/aneet/imgh.jpeg';
import a9 from '../assets/images/aneet/des.jpeg';
import a10 from '../assets/images/aneet/fig.jpeg';
import a11 from '../assets/images/aneet/under.jpeg';
import a12 from '../assets/images/aneet/over.png';
import a13 from '../assets/images/aneet/looppppp.jpg';

const About = () => {
    return (
        <div>
            <div className="banner">
                <video autoPlay loop muted playsInline>
                    <source src={a1} type="video/mp4" />
                </video>
                <div className="content">
                    <h5>WHAT WE ARE AND WHY WE DO WHAT WE DO</h5>
                    <h1>ABOUT CELESTIA</h1>
                </div>
            </div>

            <section className="section">
                <div className="img-container">
                    <img src={a2} alt="" height="675" width="500" />
                </div>
                <div className="text-container">
                    <h2>Empowered Elegance</h2>
                    <p>Born from the Cosmos, Celestia was founded on the belief that jewelry should be a symbol of self-expression and empowerment.</p>
                    <p>Our celestial designs are crafted to inspire individuals to shine bright and own their unique story. With a commitment to ethical production and timeless style, every piece is designed to be treasured and passed down for generations.</p>
                    <p>Celestia celebrates the evolution of personal style and the unbridled spirit of those who wear it.</p>
                </div>
                <div className="side-image">
                    <img src={a3} alt="" height="400" />
                </div>
            </section>

            <div className="split-section">
                <div className="split-section-left bg-beige">
                    <img src={a4} alt="" height="430" width="300" />
                    <p className="text-white">Celestia embodies the celestial bond between self and universe, crafting jewelry that inspires limitless expression and empowerment. Wear your truth, shape your destiny, and shine bright in a world where individuality knows no bounds.</p>
                </div>
                <div className="split-section-right" style={{backgroundImage: `url(${a5})`}}>
                    <p>Our Philosophy</p>
                </div>
            </div>

            
            <div className="split-section">
                <div className="split-section-right" style={{backgroundImage: `url(${a9})`}}></div>
                <div className="split-section-left bg-gray">
                    <h2>Style That Transcends Seasons</h2>
                    <p>At Celestia, we believe that fine jewelry should be a treasured investment, not a fleeting expense. Our "Higher Value, Lower Cost Per Wear" approach ensures that every piece is crafted with exceptional quality, timeless design, and premium materials. This means that with each wear, the cost per wear decreases, making our jewelry a savvy investment in your personal style. Whether it's a special occasion or everyday elegance, Celestia's heirloom-quality pieces will be cherished for generations, providing a lifetime of luxury and refinement at a lower cost per wear. Timeless beauty, enduring value.</p>
                </div>
            </div>

            <div className="split-section">
                <div className="split-section-left bg-white">
                    <h2>Where Heart Meets Innovation</h2>
                    <p>We harmoniously blend innovation with sentiment to create truly extraordinary jewelry. Our master craftsmen combine cutting-edge techniques with timeless emotions, resulting in pieces that not only tell a story but also spark meaningful connections. By merging modern design with vintage inspiration and precious materials, we create wearable works of art that transcend generations. Every Celestia piece is a testament to the beauty of innovation and the power of sentiment, making it a treasured possession that resonates with the heart. Where innovation meets emotion, timeless elegance is born.</p>
                </div>
                <div className="split-section-right" style={{backgroundImage: `url(${a10})`}}></div>
            </div>

            <div className="image-grid">
                <div className="image-grid-left">
                    <div className="image-top-left">
                        <img src={a8} alt="Top Left Image" />
                    </div>
                    <div className="image-bottom-right">
                        <img src={a9} alt="Bottom Right Image" />
                    </div>
                </div>
                <div className="split-section-left bg-white">
                    <h2>Affordable Elegance:<br /> Luxury Jewelry for the Modern You</h2>
                    <p>At Celestia, we're committed to transparent and fair pricing for our exquisite jewelry pieces. We believe that luxury shouldn't come with inflated prices, so we avoid unnecessary markups and focus on providing true value for our customers. Our prices reflect the exceptional quality of materials, expert craftsmanship, and attention to detail that goes into each.</p>
                    <p>We use high-quality diamonds, precious metals, and sustainable materials, and our prices are competitive with other luxury jewelers. By cutting out intermediaries and selling directly to our customers, we're able to offer premium jewelry at accessible prices.</p>
                    <p>With Celestia, you can trust that you're getting a fair price for a timeless piece of jewelry that will be treasured for generations to come. Our goal is to make luxury more attainable, without compromising on quality or style.</p>
                </div>
            </div>

            <div className="cta-section" style={{backgroundImage: `url(${a13})`}}>
                <p>Find out first about our launches,<br /> exclusive offers and private pop-ups.</p>
                <p><b>Stay in the Loop</b></p>
                <a href="signup.html">Sign up to be an insider &rarr;</a>
            </div>
        </div>
    );
};

export default About;