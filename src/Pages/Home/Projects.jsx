import React, { useEffect, useRef, useState } from 'react';
import data from "../../data/index.json";

export default function Projects() {
    const sectionRef = useRef(null); // Ref for the section element
    const [isInView, setIsInView] = useState(false); // State to track if the section is in view

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    setIsInView(true); // Set state to true when the section is in view
                }
            },
            { threshold: 0.1 } // Trigger when 10% of the section is in view
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section
            id="Projects"
            className={`portfolio--section ${isInView ? 'in-view' : ''}`} // Apply the animation class when in view
            ref={sectionRef}
        >
            <div className="section--title">
                <h3>My Projects</h3>
                <hr className="section-line" />
            </div>

            <div className="portfolio--section--container">
                {data?.portfolio?.map((item, index) => (
                    <div key={index} className="portfolio--section--card">
                        <div className="portfolio--section--img">
                            <img src={item.src} alt="Placeholder" />
                        </div>
                        <div className="portfolio--section--card--content">
                            <div>
                                <code className="portfolio--section--title">{item.title}</code>
                                <h5 className="text-md">{item.description}</h5>
                            </div>

                            <p className="text-sm portfolio--link">
                                {item.link && (
                                    <div className="portfolio--section-button--container">
                                        <a 
                                            href={item.link} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="portfolio--section--link"
                                        >
                                            <button className="portfolio--section--button">
                                                <p1>View</p1>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 20 19"
                                                    fill="none"
                                                    className="button-icon"
                                                >
                                                    <path
                                                        d="M4.66667 1.66675H18V15.0001M18 1.66675L2 17.6667L18 1.66675Z"
                                                        stroke="currentColor"
                                                        strokeWidth="2.66667"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </button>
                                        </a>
                                    </div>
                                )}
                            </p>

                            <div className="tech-stack-icons">
                                {item.techStack.map((tech, index) => (
                                    <div key={index} className="tech-icon-container">
                                        <img src={tech.icon} alt={tech.name} className="tech-icon" />
                                        <div className="tooltip">{tech.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
