(() => {
  const ACTIVE_KEY = 'pulsecv_active_user';
  const DRAFT_KEY = 'pulsecv_draft_v1';

  const roleTemplates = {
    'Frontend Engineer': {
      summary: 'Front-end engineer building resilient, accessible experiences with measurable UX lift. Designs scalable design-systems and ships fast, secure interfaces.',
      skills: ['React', 'TypeScript', 'Next.js', 'Design systems', 'Accessibility', 'GraphQL', 'Testing Library', 'CI/CD'],
      keywords: ['Lighthouse 90+', 'Core Web Vitals', 'A/B testing', 'Storybook', 'ARIA', 'Performance budgets'],
      prompts: [
        'Reduced bundle size by __% via code-splitting, image optimization, and dependency audits.',
        'Improved activation by __% after redesigning onboarding with A/B tested microcopy.',
        'Cut UI bugs by __% by introducing visual regression tests in CI.',
      ],
    },
    'Full-Stack Engineer': {
      summary: 'Product-minded full-stack engineer shipping reliable APIs and polished UIs end-to-end. Obsessed with latency, observability, and maintainability.',
      skills: ['Node.js', 'Express', 'PostgreSQL', 'Prisma', 'React', 'TypeScript', 'Docker', 'AWS'],
      keywords: ['Observability', 'Tracing', 'API contracts', 'Load testing', 'Caching', 'SLOs'],
      prompts: [
        'Lowered p95 latency by __% by adding read replicas + caching strategy.',
        'Migrated legacy service to typed GraphQL/REST, cutting error rate by __%.',
        'Implemented zero-downtime deploys with blue/green and health checks.',
      ],
    },
    'Data Scientist': {
      summary: 'Data scientist translating messy data into product decisions. Blends experimentation, feature engineering, and clear storytelling.',
      skills: ['Python', 'Pandas', 'SQL', 'scikit-learn', 'A/B testing', 'Airflow', 'Tableau', 'Feature engineering'],
      keywords: ['Uplift modeling', 'Experiment design', 'p-value', 'Confidence intervals', 'MDE', 'Feature store'],
      prompts: [
        'Designed experiment that increased conversion by __% with p-value < 0.05.',
        'Built churn model (AUC __) that informed retention playbooks.',
        'Automated data quality checks reducing broken dashboards by __%.',
      ],
    },
    'Machine Learning Engineer': {
      summary: 'ML engineer productionizing models with reproducible pipelines, monitoring, and cost-aware deployment.',
      skills: ['Python', 'PyTorch', 'TensorFlow', 'MLflow', 'Kubeflow', 'Feature store', 'Vector DB', 'API serving'],
      keywords: ['Model monitoring', 'Drift detection', 'Latency', 'GPU utilization', 'Batch and streaming', 'Canary deploys'],
      prompts: [
        'Shipped real-time inference service with p95 < __ms and auto-scaling.',
        'Reduced inference cost by __% via quantization/distillation.',
        'Implemented drift alerts leading to __% fewer bad predictions in prod.',
      ],
    },
    'Product Manager': {
      summary: 'Product manager blending research, prioritization, and delivery to ship outcomes. Aligns teams with crisp problem statements and metrics.',
      skills: ['Product discovery', 'Roadmapping', 'PRDs', 'A/B testing', 'User research', 'SQL basics', 'Prioritization'],
      keywords: ['North star metrics', 'Impact/effort', 'OKRs', 'Activation', 'Retention', 'Experiment readouts'],
      prompts: [
        'Shipped feature that improved activation by __% within first quarter.',
        'Led roadmap re-prioritization, reducing cycle time by __%.',
        'Ran user research with __ participants to define problem/solution fit.',
      ],
    },
    'UX Designer': {
      summary: 'UX designer crafting intentional interfaces with accessibility and measurable UX improvements.',
      skills: ['Figma', 'Design systems', 'Prototyping', 'User research', 'Interaction design', 'Accessibility', 'Usability testing'],
      keywords: ['WCAG', 'Heuristic reviews', 'Design tokens', 'Design ops', 'Microcopy', 'Information architecture'],
      prompts: [
        'Increased task success by __% after usability study-driven redesign.',
        'Built design tokens to unify brand + engineering handoff.',
        'Cut time-to-first-meaningful-action by __% with new IA.',
      ],
    },
    'Marketing Manager': {
      summary: 'Full-funnel marketer running experiments, content, and lifecycle to grow sustainable demand.',
      skills: ['Lifecycle', 'Email/SMS', 'Paid social', 'SEO', 'Analytics', 'Copywriting', 'Funnel analysis'],
      keywords: ['CAC:LTV', 'Attribution', 'Lead scoring', 'Cohort analysis', 'Content strategy', 'Retention'],
      prompts: [
        'Reduced CAC by __% by shifting budget to high-ROAS channels.',
        'Lifted MQL->SQL by __% via revamped nurture flows.',
        'Grew organic traffic by __% through content + technical SEO.',
      ],
    },
  };

  const state = {
    name: 'Alex Rivera',
    title: 'Senior Frontend Engineer',
    location: 'Austin, TX | Remote-ready',
    email: 'alex.rivera@email.com',
    phone: '+1 (555) 123-4567',
    website: 'alexrivera.dev',
    portfolioUrl: 'https://yourportfolio.com',
    photoData: '',
    summary: '',
    skills: [],
    keywords: [],
    experiences: [
      {
        company: 'Nimbus Labs',
        title: 'Frontend Lead',
        period: '2022 - Present',
        impact: 'Rebuilt onboarding with progressive disclosure + experimentation, driving +14% activation and +11% retention. Cut bundle size 32% via code-splitting and asset budgets.',
      },
    ],
    projects: [
      {
        title: 'Design system revamp',
        link: 'https://dribbble.com',
        stack: 'React, Storybook, Figma',
        outcome: 'Built token-based system adopted by 6 squads; reduced UI defects by 21% and handoff time by 30%.',
      },
    ],
    education: 'B.S. Computer Science - Georgia Tech (2020)',
  };

  const qs = (id) => document.getElementById(id);
  const inputs = {
    name: qs('nameInput'),
    title: qs('titleInput'),
    location: qs('locationInput'),
    email: qs('emailInput'),
    phone: qs('phoneInput'),
    website: qs('websiteInput'),
    portfolio: qs('portfolioInput'),
    photo: qs('photoInput'),
    summary: qs('summaryInput'),
    eduSchool: qs('eduSchool'),
    eduDegree: qs('eduDegree'),
  };

  const collections = {
    skills: qs('skillsChips'),
    keywords: qs('keywordChips'),
    previewSkills: qs('previewSkills'),
    previewKeywords: qs('previewKeywords'),
    experienceList: qs('experienceList'),
    previewExperience: qs('previewExperience'),
    projectList: qs('projectList'),
    previewProjects: qs('previewProjects'),
  };

  const applyRoleTemplate = (role) => {
    const template = roleTemplates[role];
    if (!template) return;
    state.summary = template.summary;
    state.skills = [...template.skills];
    state.keywords = [...template.keywords];
    renderRolePrompts(template);
    syncInputs();
    render();
  };

  const renderRolePrompts = (template) => {
    const el = qs('rolePromptText');
    if (!el || !template) return;
    el.innerHTML = template.prompts.map((p) => `- ${p}`).join('<br>');
  };

  const renderChips = (arr, target, key, readOnly = false) => {
    if (!target) return;
    target.innerHTML = '';
    arr.forEach((val, idx) => {
      const chip = document.createElement('span');
      chip.className = 'chip';
      chip.textContent = val;
      if (!readOnly) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = 'x';
        btn.addEventListener('click', () => {
          state[key].splice(idx, 1);
          render();
        });
        chip.appendChild(btn);
      }
      target.appendChild(chip);
    });
  };

  const renderLists = () => {
    const expTarget = collections.experienceList;
    const expPrev = collections.previewExperience;
    if (expTarget) expTarget.innerHTML = '';
    if (expPrev) expPrev.innerHTML = '';

    state.experiences.forEach((exp, idx) => {
      const base = document.createElement('div');
      base.className = 'list-item';
      base.innerHTML = `<strong>${exp.title}</strong> | ${exp.company} <span class="subtext">${exp.period}</span><br><span class="muted">${exp.impact}</span>`;
      const remove = document.createElement('button');
      remove.className = 'btn btn-text';
      remove.type = 'button';
      remove.textContent = 'Remove';
      remove.addEventListener('click', () => {
        state.experiences.splice(idx, 1);
        render();
      });
      base.appendChild(remove);
      expTarget?.appendChild(base);

      const prev = document.createElement('div');
      prev.className = 'list-item';
      prev.innerHTML = `<strong>${exp.title}</strong> | ${exp.company} <span class="subtext">${exp.period}</span><br><span class="muted">${exp.impact}</span>`;
      expPrev?.appendChild(prev);
    });

    const projTarget = collections.projectList;
    const projPrev = collections.previewProjects;
    if (projTarget) projTarget.innerHTML = '';
    if (projPrev) projPrev.innerHTML = '';

    state.projects.forEach((proj, idx) => {
      const card = document.createElement('div');
      card.className = 'project-card';
      const stackTags = (proj.stack || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
        .map((s) => `<span class="tag">${s}</span>`)
        .join(' ');
      card.innerHTML = `<div class="project-meta"><strong>${proj.title}</strong>${
        proj.link ? ` | <a href="${proj.link}" target="_blank" rel="noreferrer">link</a>` : ''
      }</div><p class="muted">${proj.outcome}</p><div class="chip-row">${stackTags}</div>`;
      const remove = document.createElement('button');
      remove.className = 'btn btn-text';
      remove.type = 'button';
      remove.textContent = 'Remove';
      remove.addEventListener('click', () => {
        state.projects.splice(idx, 1);
        render();
      });
      card.appendChild(remove);
      projTarget?.appendChild(card);

      const prev = document.createElement('div');
      prev.className = 'project-card';
      prev.innerHTML = `<div class="project-meta"><strong>${proj.title}</strong>${
        proj.link ? ` | <a href="${proj.link}">${proj.link}</a>` : ''
      }</div><p class="muted">${proj.outcome}</p><div class="chip-row">${stackTags}</div>`;
      projPrev?.appendChild(prev);
    });
  };

  const render = () => {
    qs('previewName').textContent = state.name || 'Your Name';
    qs('previewTitle').textContent = state.title || 'Role headline';
    qs('previewLocation').textContent = state.location || 'Location';
    qs('previewContact').textContent = [state.email, state.phone, state.website].filter(Boolean).join(' | ');
    qs('previewPortfolio').textContent = state.portfolioUrl ? `Portfolio: ${state.portfolioUrl}` : '';
    const avatar = qs('previewPhoto');
    if (avatar) {
      avatar.style.backgroundImage = state.photoData ? `url('${state.photoData}')` : 'none';
    }
    qs('previewSummary').textContent = state.summary || 'Concise, role-aware summary goes here.';
    qs('previewEducation').textContent = state.education || 'Add your education.';

    renderChips(state.skills, collections.skills, 'skills');
    renderChips(state.keywords, collections.keywords, 'keywords');
    renderChips(state.skills, collections.previewSkills, 'skills', true);
    renderChips(state.keywords, collections.previewKeywords, 'keywords', true);
    renderLists();
  };

  const addChipFromInput = (inputId, key) => {
    const input = qs(inputId);
    if (!input) return;
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        const value = input.value.trim();
        if (!value) return;
        if (!state[key].includes(value)) state[key].push(value);
        input.value = '';
        render();
      } else if (e.key === 'Backspace' && !input.value && state[key].length) {
        state[key].pop();
        render();
      }
    });
  };

  const addExperience = () => {
    const company = qs('expCompany').value.trim();
    const title = qs('expTitle').value.trim();
    const period = qs('expPeriod').value.trim();
    const impact = qs('expImpact').value.trim();
    if (!company || !title || !impact) {
      alert('Please add company, title, and impact.');
      return;
    }
    state.experiences.unshift({ company, title, period, impact });
    ['expCompany', 'expTitle', 'expPeriod', 'expImpact'].forEach((id) => (qs(id).value = ''));
    render();
  };

  const addProject = () => {
    const title = qs('projTitle').value.trim();
    const link = qs('projLink').value.trim();
    const stack = qs('projStack').value.trim();
    const outcome = qs('projOutcome').value.trim();
    if (!title || !outcome) {
      alert('Add a project title and outcome.');
      return;
    }
    state.projects.unshift({ title, link, stack, outcome });
    ['projTitle', 'projLink', 'projStack', 'projOutcome'].forEach((id) => (qs(id).value = ''));
    render();
  };

  const bindBasics = () => {
    Object.entries(inputs).forEach(([key, el]) => {
      if (!el) return;
      if (key === 'photo') return;
      const stateKey = key === 'eduSchool' || key === 'eduDegree' ? null : key;
      el.addEventListener('input', () => {
        if (key === 'portfolio') {
          state.portfolioUrl = el.value;
        } else if (stateKey) {
          state[stateKey] = el.value;
        } else {
          state.education = `${inputs.eduSchool.value}`.trim() + (inputs.eduDegree.value ? ` - ${inputs.eduDegree.value}` : '');
        }
        render();
      });
    });
    if (inputs.photo) {
      inputs.photo.addEventListener('change', (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          state.photoData = reader.result;
          render();
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const syncInputs = () => {
    inputs.name.value = state.name;
    inputs.title.value = state.title;
    inputs.location.value = state.location;
    inputs.email.value = state.email;
    inputs.phone.value = state.phone;
    inputs.website.value = state.website;
    if (inputs.portfolio) inputs.portfolio.value = state.portfolioUrl || '';
    inputs.summary.value = state.summary;
    if (inputs.eduSchool && inputs.eduDegree && state.education.includes(' - ')) {
      const [school, degree] = state.education.split(' - ').map((s) => s.trim());
      inputs.eduSchool.value = school;
      inputs.eduDegree.value = degree;
    }
  };

  const copyATS = async () => {
    const text = [
      `${state.name} - ${state.title}`,
      [state.location, state.email, state.phone, state.website, state.portfolioUrl].filter(Boolean).join(' | '),
      '',
      'Summary:',
      state.summary,
      '',
      'Skills:',
      state.skills.join(', '),
      '',
      'Experience:',
      ...state.experiences.map((exp) => `${exp.title} at ${exp.company} (${exp.period}) - ${exp.impact}`),
      '',
      'Projects:',
      ...state.projects.map((p) => `${p.title} (${p.stack}) - ${p.outcome}`),
      '',
      'Education:',
      state.education,
      'Portfolio:',
      state.portfolioUrl,
      '',
      'Keywords:',
      state.keywords.join(', '),
    ].join('\n');
    try {
      await navigator.clipboard.writeText(text);
      alert('ATS-friendly text copied to clipboard.');
    } catch (e) {
      alert('Copy failed. You can still select and copy manually.');
    }
  };

  const saveDraft = (silent = false) => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(state));
    if (!silent) alert('Draft saved locally.');
  };

  const loadDraft = (notify = true) => {
    try {
      const data = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null');
      if (!data) {
        if (notify) alert('No saved draft yet.');
        return;
      }
      Object.assign(state, data);
      syncInputs();
      render();
      if (notify) alert('Draft loaded.');
    } catch {
      if (notify) alert('Could not load draft.');
    }
  };

  const clearData = () => {
    if (!confirm('Reset all fields?')) return;
    state.skills = [];
    state.keywords = [];
    state.experiences = [];
    state.projects = [];
    state.education = '';
    applyRoleTemplate(qs('roleSelect').value);
    syncInputs();
    render();
  };

  const hydrateUserBadge = () => {
    const badge = qs('userBadge');
    if (!badge) return;
    try {
      const active = JSON.parse(localStorage.getItem(ACTIVE_KEY) || 'null');
      badge.textContent = active ? `${active.name || active.email}` : 'Guest mode';
    } catch {
      badge.textContent = 'Guest mode';
    }
  };

  const downloadHtml = () => {
  saveDraft(true);
  const exportArea = qs('exportArea');
  if (!exportArea) return;
  const clone = exportArea.cloneNode(true);
  const avatar = clone.querySelector('#previewPhoto');
  if (avatar) {
    avatar.style.backgroundImage = state.photoData ? `url('${state.photoData}')` : 'none';
  }
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${state.name || 'Resume'} - PulseCV</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  ${clone.outerHTML}
</body>
</html>`;
  const blob = new Blob([html], { type: 'text/html' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'resume.html';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};

  const openLocalView = () => {
    saveDraft(true);
    const previewUrl = new URL('resume-view.html', window.location.href).href;
    window.open(previewUrl, '_blank');
  };

  const bindButtons = () => {
    qs('addExperience')?.addEventListener('click', addExperience);
    qs('addProject')?.addEventListener('click', addProject);
    qs('copyATS')?.addEventListener('click', copyATS);
    qs('saveDraft')?.addEventListener('click', () => saveDraft());
    qs('loadDraft')?.addEventListener('click', () => loadDraft(true));
    qs('clearData')?.addEventListener('click', clearData);
    qs('exportPdf')?.addEventListener('click', () => window.print());
    qs('downloadHtml')?.addEventListener('click', downloadHtml);
    qs('viewLocal')?.addEventListener('click', openLocalView);
  };

  const init = () => {
    const roleSelect = qs('roleSelect');
    hydrateUserBadge();
    bindBasics();
    addChipFromInput('skillsInput', 'skills');
    addChipFromInput('keywordInput', 'keywords');
    bindButtons();

    roleSelect?.addEventListener('change', (e) => applyRoleTemplate(e.target.value));

    applyRoleTemplate(roleSelect?.value || 'Frontend Engineer');
    loadDraft(false);
    syncInputs();
    render();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

