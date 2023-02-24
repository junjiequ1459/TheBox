import "./AboutPage.css";
import ConsoleNavBar from "../ConsoleNavBar/ConsoleNavBar";

function AboutPage() {
  return (
    <>
      <ConsoleNavBar name={"about"} />
      <div className="console-container">
        <div className="team-member-container">
          <div className="image-icon-container">
            <div id="img-div">
              <img
                src="https://the-box-project.s3.amazonaws.com/pfp/37ab184e003b034a4fa821b24849a0d4.png"
                alt="no img"
              ></img>
            </div>
            <div>
              <a
                href="https://github.com/ZahiAhmed"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/zahiahmed/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a href="https://angel.co/" target="_blank" rel="noreferrer">
                <i className="fa-brands fa-angellist"></i>
              </a>
            </div>
            <h2>Backend Lead
            <br/> EXPRESS COOK
            </h2>
          </div>
          <div className="image-icon-container">
            <div id="img-div">
              {" "}
              <img
                id="kevin-img"
                src="https://the-box-project.s3.amazonaws.com/pfp/kevin.jpeg"
                alt="no img"
              ></img>
            </div>{" "}
            <div>
              <a
                href="https://github.com/kliu33"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/kevin-liu-3a5b96158/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a href="https://angel.co/" target="_blank" rel="noreferrer">
                <i className="fa-brands fa-angellist"></i>
              </a>
            </div>
            <h2>Frontend Lead
            <br/> REACT COOK
            </h2>
          </div>
          <div className="image-icon-container">
            <div id="img-div">
              {" "}
              <img
                src="https://the-box-project.s3.amazonaws.com/pfp/3db6a70a95a9616403861bfe9b1cf517.jpeg"
                alt="no img"
              ></img>
            </div>{" "}
            <div>
              <a
                href="https://github.com/junjiequ1459"
                target="_blank"
                rel="noreferr er"
              >
                <i className="fa-brands fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/junjie-qu-239070169/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a href="https://angel.co/" target="_blank" rel="noreferrer">
                <i className="fa-brands fa-angellist"></i>
              </a>
            </div>
            <h2>Team Lead/Frontend
              <br/> CSS AWS COOK
            </h2>
          </div>
          <div className="image-icon-container">
            <div id="img-div">
              {" "}
              <img
                id="joey-img"
                src="https://the-box-project.s3.amazonaws.com/pfp/joey.jpg"
                alt="no img"
              ></img>
            </div>
            <div>
              <a
                href="https://github.com/joeytsui1"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/joey-tsui-5836a2240/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a href="https://angel.co/" target="_blank" rel="noreferrer">
                <i className="fa-brands fa-angellist"></i>
              </a>
            </div>
            <h2>FullStack Lead
            <br/> SOCKET COOK
            </h2>
          </div>
        </div>
        <div className="team-member-description">
          <div className="about-description">
            Welcome! I'm 25 years old, and my name is Zahi Ahmed. Being a
            Full-Stack Software Engineer for Aspring, coding is my life's work.
            My motivation in life has always been to a drive to develop, learn,
            and have a constructive influence on the world and I'm a computer
            science graduate.
          </div>
          <div className="about-description">
            Welcome! My name is Kevin Liu, and I am 25 years old. I am
            Aspiring Software Engineer, and I am passionate about life.
            Throughout my life, I have been driven by a desire to learn, grow,
            and make a positive impact on the world around me. [Add any personal
            details, achievements, or experiences that you feel are relevant]. I
            am excited to [Connect with/Provide Value to/Share my experiences
            with] the [Community/Organization/Platform] and look forward to [Any
            Goals or Objectives]. Thank you for taking the time to get to know
            me, and I hope we can work together to achieve great things.
          </div>
          <div className="about-description">
            Hello! JunJieQu(Rex) is my name, and I am 23 years old. I am a
            future SWE. I've been motivated to study, develop, and have a
            positive impact on the world all of my life. I am eager to discuss
            my experiences while attending App Academy. I appreciate you taking
            the time to get to know me, and I look forward to working with you
            to accomplish great things.
          </div>
          <div className="about-description">
             Welcome! Joey Tsui is my name, and I'm 24 years old. I have a degree
             in computer information and am pursuing a career as a full stack developer. 
             I have a passion for coding and I have been motivated to learn, develop, and have a positive 
             influence on the world around me throughout my life.I appreciate you taking 
             the time to get to know me, and I look forward to working with you to 
             accomplish amazing things.
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
