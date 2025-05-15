import React, { useState, useEffect, useRef } from 'react';

export default function AboutMe() {
    const [imageIndex, setImageIndex] = useState(0); // State to track the current image index
    const images = ['data.jpg', 'dance.JPG']; // Array of image URLs
    const sectionRef = useRef(null); // Ref for the section element
    const imgRef = useRef(null); // Ref for the image element
    const [isInView, setIsInView] = useState(false); // State to track if the section is in view
    const [hasBeenViewed, setHasBeenViewed] = useState(false); // State to track if the section has been viewed

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting && !hasBeenViewed) {
                    setIsInView(true);
                    imgRef.current.classList.add('tilt'); // Add class to start tilting animation
                    setHasBeenViewed(true); // Set flag to true after the first view
                }
            },
            { threshold: 0.3 } // Trigger when 30% of the section is in view
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [hasBeenViewed]);

    const handleMouseEnter = () => {
        setImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Cycle images
    };

    const handleMouseLeave = () => {
        setImageIndex(0); // Reset to the first image when mouse leaves
    };

    return (
        <section
            id="AboutMe"
            className={`about--section ${isInView ? 'in-view' : ''}`} // Apply the animation class when in view
            ref={sectionRef}
        >
            <div className="section--title">
                <h3>About Me</h3>
                <hr className="section-line" />
            </div>
            <div className="about--content">
                <div 
                    className={`about-img ${isInView ? 'in-view' : ''}`} //
                    ref={imgRef}
                >
                    <img
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        src={`/assets/${images[imageIndex]}`}
                        alt="About Me Section"
                    />
                </div>
                <div className="about--section--desc">
                    <p>
                        As a dancer turned AI enthusiast, I believe storytelling 
                        lies at the heart of both movement and artificial intelligence. 
                        I’m passionate about finding rhythm and patterns—whether on stage 
                        or within complex data and models 🩰🤖—to uncover the insights they reveal.
                    </p>
                    <p>              
                        I enjoy working across the AI development lifecycle: from curating 
                        and preparing data, to building, training, and deploying machine 
                        learning models that deliver real-world impact. My goal is to translate 
                        data into intelligent solutions that bridge the gap between raw information 
                        and transformative outcomes. I am continually learning and eager to push 
                        the boundaries of AI to solve meaningful, human-centered problems.
                    </p>
                </div>
            </div>
        </section>
    );
}

