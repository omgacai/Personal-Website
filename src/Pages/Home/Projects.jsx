import React, { useEffect, useRef, useState } from 'react';
import data from "../../data/index.json";
import { CSSTransition, SwitchTransition } from 'react-transition-group';

export default function Projects() {
    const sectionRef = useRef(null);
    const [isInView, setIsInView] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [projectsPerPage, setProjectsPerPage] = useState(3);

    const totalPages = Math.ceil(data?.portfolio?.length / projectsPerPage);


    useEffect(() => {
        const handleResize = () => {
            setProjectsPerPage(window.innerWidth <= 1200 ? 1 : (window.innerWidth <= 1350 ? 2 : 3));
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) setIsInView(true);
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    const handlePrev = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
    };

    const startIndex = currentPage * projectsPerPage;
    const currentProjects = data?.portfolio?.slice(startIndex, startIndex + projectsPerPage);

    return (
        <section
            id="Projects"
            className={`portfolio--section ${isInView ? 'in-view' : ''}`}
            ref={sectionRef}
        >
            <div className="section--title">
                <h3>My Projects</h3>
                <hr className="section-line" />
            </div>
            <div className="portfolio--section--wrapper">

            <button 
                onClick={handlePrev} 
                disabled={currentPage === 0} 
                className="scroll-arrow left-arrow"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="24" height="24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </button>
            <SwitchTransition mode="out-in">
                <CSSTransition
                    key={currentPage}
                    timeout={300}
                    classNames="fade-slide"
                >
                    <div className="portfolio--section--container">
                        {currentProjects.map((item, index) => (
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
                </CSSTransition>
            </SwitchTransition>     
         
            <button 
                onClick={handleNext} 
                disabled={currentPage === totalPages - 1} 
                className="scroll-arrow right-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="24" height="24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>


            </button>
            </div>
        </section>
    );
}
