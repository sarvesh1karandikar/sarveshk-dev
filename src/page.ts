import { content } from './content';
import { renderNav, renderHero, renderExperience, renderProjects, renderEducation, renderAcademic, renderSkills, renderContact, renderFooter } from './render';

export function renderPage(): string {
  return renderNav(content.links) + '<main id="main" tabindex="-1">' +
    renderHero(content.links) + renderExperience(content.experience) +
    renderProjects(content.projects) + renderEducation(content.education) +
    renderAcademic(content.academic, content.links.github) +
    renderSkills(content.skills) + renderContact(content.links) +
    '</main>' + renderFooter();
}
