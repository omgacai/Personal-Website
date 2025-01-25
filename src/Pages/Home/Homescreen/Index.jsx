import HeroSection from "../HeroSection";
import AboutMe from "../AboutMe";
import Projects from "../Projects";
import Experience from "../Experience";
import ContactMe from "../ContactMe";


export default function Home() {
    return (
        <>
            <HeroSection/>
            <AboutMe />
            <Projects />
            <Experience />
            <ContactMe />
        </>
    )
}