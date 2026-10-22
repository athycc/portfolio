import { $, escapeHTML as esc, tags } from './dom.js';

export function renderContent(data) {
  $('#timeline').innerHTML = data.experience.map((entry, index) => `
    <article class="timeline-item">
      <div class="period">${esc(entry.period)}</div>
      <div>
        <h3 class="role">${esc(entry.role)}</h3>
        <div class="org">${esc(entry.org)}</div>
        <p>${esc(entry.summary)}</p>
        <details>
          <summary>Responsibilities & scope <span aria-hidden="true">＋</span></summary>
          <ul>${entry.bullets.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>
        </details>
      </div>
      <span class="number">0${index + 1}</span>
    </article>`).join('');
  $('#volunteer-list').innerHTML = data.volunteering.map(([role, period, description]) => `
    <article class="volunteer-item"><h3>${esc(role)}</h3>
      <p>${esc(period)}<br>${esc(description)}</p>
    </article>`).join('');
  $('#skills').innerHTML = data.skills.map(([title, ...items]) => `
    <div class="skill-group"><h3>${esc(title)}</h3><div class="tags">${tags(items)}</div></div>`).join('');
  $('#certifications').innerHTML = data.certifications.map(([title, date]) => `
    <div class="cert-item"><span>${esc(title)}</span><time>${esc(date)}</time></div>`).join('');
  $('#awards').innerHTML = data.awards.map(([place, title, description]) => `
    <article class="award"><span class="placing">${esc(place)}</span>
      <h3>${esc(title)}</h3><p>${esc(description)}</p>
    </article>`).join('');

  $('#resume-preview').innerHTML = `
    <section>
      <h3>Professional experience</h3>
      ${data.experience.map((entry) => `
        <p><strong>${esc(entry.role)} — ${esc(entry.org)}</strong><br>
          ${esc(entry.period)}<br>${entry.bullets.map(esc).join('<br>')}</p>`).join('')}
    </section>
    <section>
      <h3>Projects</h3>
      ${data.projects.map((project) => `
        <p><strong>${esc(project.title)}</strong> · ${esc(project.status)}<br>${esc(project.summary)}
          ${project.archive ? `<br><a class="external-label" href="${esc(project.archive)}" target="_blank" rel="noopener noreferrer">Project folder ↗</a>` : ''}
          ${project.url ? `<br><a class="external-label" href="${esc(project.url)}" target="_blank" rel="noopener noreferrer">${esc(project.url)}</a>` : ''}
        </p>`).join('')}
    </section>
    <section><h3>Leadership</h3>
      <p>AWS Student Builder Group Alpha · Founder & CEO · September 2025–Present.<br>
        AWS Student Builder Group Lead · November 2025–Present.<br>
        SCD Mega Manila Event Head · 390 attendees, 52 volunteers, 5 sponsors.<br>
        RTU Student Council Department of Archives · October 2023–August 2024.</p>
    </section>
    <section><h3>Education</h3>
      <p>Rizal Technological University · BS Information Technology · 2023–Present.<br>
        Academic Achiever.<br>
        Scholarships: Quezon City Youth Development Organization; Data Engineering Pilipinas DataCamp; AWS AI & ML.</p>
    </section>
    <section><h3>Technical skills</h3>
      ${data.skills.map(([title, ...items]) => `<p><strong>${esc(title)}:</strong> ${items.map(esc).join(', ')}</p>`).join('')}
    </section>
    <section><h3>Certifications & training</h3>
      ${data.certifications.map(([title, date]) => `<p>${esc(title)} · ${esc(date)}</p>`).join('')}
    </section>
    <section><h3>Competitions</h3>
      ${data.awards.map((award) => `<p>${esc(award.join(' · '))}</p>`).join('')}
    </section>
    <section><h3>Volunteering</h3>
      ${data.volunteering.map((entry) => `<p>${esc(entry.join(' · '))}</p>`).join('')}
    </section>`;
}
