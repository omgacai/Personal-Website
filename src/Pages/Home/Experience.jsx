import data from "../../data/index.json";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";


export default function Experience() {
    let iconStyles = { background: "#06D6A0" };

    return (
        <section id="Experience" className = "experience--section">
            <div className="section--title">
                <h3>
                    My Experience
                </h3>
                <hr className="section-line"></hr>
            </div>

            <div >
                <VerticalTimeline>
                    {data?.timeline?.map((item, index) => (
                        <VerticalTimelineElement 
                            key={index} 
                            date={item.date} 
                            dateClassName="date" 
                            iconStyle={iconStyles} 
                            icon={<img src={item.icon} alt="icon" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />}
                            contentArrowStyle={{ borderRight: '7px solid rgb(192, 192, 192)', borderRadius: '5px' }}
                            contentStyle={{ 
                                borderRadius: "15px", 
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)" ,
                                transition: "all 0.5s ease-in-out",
                                className: "timeline-element"
                            }}            
                            animation="fade-in"
                            >

                           <h4 className="experience-title">{item.title}</h4>
                           <h5 className="experience-subtitle">{item.place}</h5>

                        
                           <ul className="desc-container">
                                {item.description.map((desc, descIndex) => (
                                    <li key={descIndex} className="tooltip1">{desc.point}</li> 
                                ))}
                            </ul>        
                        </VerticalTimelineElement>
                    )
                )}
                </VerticalTimeline>
            </div>
    </section>
  );
}