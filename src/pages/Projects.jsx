import "../styles/Projects.css";
import projectsData from "../assets/data/projects.json";


function Projects() {
  return (
    <div className="projects-container full-width home-container">
      <h1 className="fade-in-title">Mis Proyectos</h1>
      <div className="projects-grid">
        {projectsData.map((project, index) => (
          <div key={index} className="project-card fade-up-text">
            <img src={project.image} alt={project.title} className="project-image" />
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="cta-button glow-button">Ver Proyecto</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;