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
                        I am a Year 2 Business Analytics student from NUS specialising in Machine Learning. I enjoy all things data! The process of turning big data into meaningful insights brings me great sense of fulfilment! I look forward to further enhancing my skills and explore the endless possibilities of the world of data 🥳.
                    </p>
                    <p>
                        When I'm not coding, I'm dancing! I currently teach Ballet 🩰 and is the Dance Captain of NUS Dance Synergy 💃🏻. My dedication and success in this art form is a testament to the sheer grit and determination I possess in pursuing my goals. And now, I aim to expand my knowledge and dedicate my time to data.
                    </p>
                </div>
            </div>
        </section>
    );
}
