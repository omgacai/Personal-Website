import React, { useState, useEffect, useRef } from "react";
import emailjs from "emailjs-com"; // Import EmailJS
import data from "../../data/index.json";

export default function ContactMe() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: ""
    });
    const [messageSent, setMessageSent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); // State to track submission
    const sectionRef = useRef(null); // Ref for the section element
    const [isInView, setIsInView] = useState(false); // State to track if the section is in view

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    setIsInView(true);
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Set submission state to true

        const templateParams = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            message: formData.message
        };

        emailjs.send('service_nkzig2c', 'template_w028jxb', templateParams, 'nvpuDzBUQuqeM3Wpa')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                setMessageSent(true);
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    message: ""
                });
                setIsSubmitting(false); // Set submission state to false
            }, (err) => {
                console.error('FAILED...', err);
                setIsSubmitting(false); // Set submission state to false
            });
    };

    return (
        <section
            id="Contact"
            className={`contact--section ${isInView ? 'in-view' : ''}`} // Apply the animation class when in view
            ref={sectionRef}
        >
            <div className="section--title">
                <h3>Let's keep in touch!</h3>
                <hr className="section-line"></hr>
            </div>
            <div className="contact-container">

                <div className="contact-items">
                    {data?.contact?.map((item, index) => (
                        <div key={index} className="contact-item">
                            <a href={item.link} className="contact-link" target="_blank" rel="noopener noreferrer">
                                <button className="contact-item-content">
                                    <img src={item.src} alt="Icon" className="contact-item-icon" />
                                    <code className="contact-item-description">{item.description}</code>
                                </button>
                            </a>
                        </div>
                    ))}
                    <img className="contact-img" src="/assets/pusheen.gif"></img>
                </div>

                {/* Contact Form */}
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                    <button type="submit" className={`submit-btn ${messageSent ? 'submitted' : ''} ${isSubmitting ? 'spinning' : ''}`}>
                        {messageSent ? "Submitted!" : "Send Message"} <span className="carrot-icon">
                            {messageSent ? <img src="./assets/happy.png" alt="Carrot Icon" /> : <img src="./assets/send.png" alt="Carrot Icon" /> }
                        </span>
                        {isSubmitting && <div className="loading-spinner"></div>} {/* Loading spinner */}
                    </button>
                </form>
            </div>

            <div className="contact-footer">
                <hr className="contact-footer-line"></hr>
                <code className="contact-footer-text">Last updated: 27 Jan 2025</code>

            </div>
        </section>
    );
}
