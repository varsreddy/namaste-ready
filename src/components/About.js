import AboutClass from "./AboutClass";

const About = ({name, location, contact}) => {
    return (
        <>
        <div className="about-container">
            <h1>About Us</h1>
            <p>This is a sample React application to demonstrate routing and component structure.</p>
            <h3>Name: {name}</h3>
            <h3>Location: {location}</h3>
            <h4>Contact: {contact}</h4>
        </div>
         <AboutClass name={name} location={location} contact={contact} />
        </>
    )
}

export default About;