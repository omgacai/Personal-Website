import { useTypewriter, Cursor, Typewriter } from "react-simple-typewriter";
import { useState, useEffect } from "react";
export default function HeroSection() {

    

    const [text1] = useTypewriter({
        words: ["           Yong Sook Mun", "Sook Mun"],
        loop: 1,
        typingSpeed: 600,
        delaySpeed: 20,
        deleteSpeed: 100
    });

    return (
        <section id="heroSection" className="hero-section">
            <div className="hero-section-box">
                <div className="Hero-section-content">
                    <h4 className="title">
                        Hello! My name is
                    </h4>
             
                            <h1 className="hero-section-title">
                            <span>{text1}</span>
                            <span style={{ color: '#7a7a7a', fontWeight: 'lighter', fontSize: '1em' }}>
                                <Cursor />
                            </span>
                            </h1>
                    <div className="hero-desc-all">
                        <h2 className="hero-bza">
                            Business Analytics student at NUS
                        </h2>
                        <h4 className="hero-data">
                            Aspiring Data Analyst | Scientist | Engineer 👩‍💻
                        </h4>

                    </div>
                
                </div>
                <button className="btn btn-primary"  onClick={() => window.open('/assets/resume.pdf', '_blank')}>
                    
                    Download My Resume   <img src="/assets/downloads.png" alt="Download Icon" style={{ width: '16px', marginRight: '14px' }} />
                    </button>
            </div>
            <div className="hero-img">
                <img src="/assets/hero-img.jpg" alt="Hero Section"  />

            </div>

        </section>
    )
}