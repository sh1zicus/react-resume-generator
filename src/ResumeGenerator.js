import React, { useState } from 'react';

function ResumeGenerator() {
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
    messenger: '',
    github: '',
  });

  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);

  const handlePersonalInfoChange = (e) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value,
    });
  };

  const addExperience = () => {
    setExperience([...experience, {
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
    }]);
  };

  const handleExperienceChange = (e, index) => {
    const newExperience = [...experience];
    newExperience[index][e.target.name] = e.target.value;
    setExperience(newExperience);
  };

  const deleteExperience = (index) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  const addEducation = () => {
    setEducation([...education, {
      profession: '',
      university: '',
      startDate: '',
      endDate: '',
    }]);
  };

  const handleEducationChange = (e, index) => {
    const newEducation = [...education];
    newEducation[index][e.target.name] = e.target.value;
    setEducation(newEducation);
  };

  const deleteEducation = (index) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const handleSkillsChange = (e) => {
    setSkills(e.target.value.split(',').map(skill => skill.trim()));
  };

  const generateResume = () => {
    console.log(personalInfo, experience, education, skills);
  };

  return (
    <div className="resume-container">
      <h1>Резюме генератор</h1>

      <div className='personal-info'  >
<h2>Персональная информация</h2>
      <input type="text" name="name" placeholder="Имя" value={personalInfo.name} onChange={handlePersonalInfoChange} />
      <input type="email" name="email" placeholder="Email" value={personalInfo.email} onChange={handlePersonalInfoChange} />
      <input type="tel" name="phone" placeholder="Телефон" value={personalInfo.phone} onChange={handlePersonalInfoChange} />
      <input type="url" name="messenger" placeholder="Мессенжер" value={personalInfo.messenger} onChange={handlePersonalInfoChange} />
      <input type="url" name="github" placeholder="GitHub" value={personalInfo.github} onChange={handlePersonalInfoChange} />
      </div>
 
      <div className="experience">
      <h2>Опыт работы</h2>
      {experience.map((exp, index) => (
        <div key={index}>
          <input type="text" name="title" placeholder="Должность" value={exp.title} onChange={(e) => handleExperienceChange(e, index)} />
          <input type="text" name="company" placeholder="Компания" value={exp.company} onChange={(e) => handleExperienceChange(e, index)} />
          <input type="date" name="startDate" placeholder="Начал" value={exp.startDate} onChange={(e) => handleExperienceChange(e, index)} />
          <input type="date" name="endDate" placeholder="Закончил" value={exp.endDate} onChange={(e) => handleExperienceChange(e, index)} />
          <textarea name="description" placeholder="Описание" value={exp.description} onChange={(e) => handleExperienceChange(e, index)} />
          <button className="generate-button generate-button__delete" onClick={() => deleteExperience(index)}>Удалить</button>
        </div>
      ))}
      <button className="generate-button" onClick={addExperience}>Добавить компанию</button>
      </div>

      <div className="education">
      <h2>Образование</h2>
      {education.map((edu, index) => (
        <div key={index}>
          <input type="text" name="profession" placeholder="Степень" value={edu.profession} onChange={(e) => handleEducationChange(e, index)} />
          <input type="text" name="university" placeholder="Учебное заведение" value={edu.university} onChange={(e) => handleEducationChange(e, index)} />
          <input type="date" name="startDate" placeholder="Начал" value={edu.startDate} onChange={(e) => handleEducationChange(e, index)} />
          <input type="date" name="endDate" placeholder="Закончил" value={edu.endDate} onChange={(e) => handleEducationChange(e, index)} />
          <button className="generate-button generate-button__delete" onClick={() => deleteEducation(index)}>Удалить</button>
        </div>
      ))}
      <button className="generate-button" onClick={addEducation}>Добавить образование</button>
      </div>

      <div className="skills">
      <h2>Навыки</h2>
      <p>Введите навыки через запятую</p>
      <textarea placeholder="Введите навыки через запятую" value={skills.join(', ')} onChange={handleSkillsChange} />
      </div>

      <button className="generate-button" onClick={generateResume}>Сгенерировать резюме</button>
    </div>
  );
}

export default ResumeGenerator;
