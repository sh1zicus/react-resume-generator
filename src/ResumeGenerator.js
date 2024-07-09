import React, { useState } from 'react';

function ResumeGenerator() {
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    messenger: "",
    github: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;

    setPersonalInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));

    validateInput(name, value);
  };

  const validateInput = (name, value) => {
    let errors = {};

    switch (name) {
      case "name":
        if (!value || value.trim() === "") {
          errors.name = "Имя не может быть пустым";
        } else if (!/^[а-яА-ЯёЁa-zA-Z\s]+$/.test(value)) {
          errors.name = "Имя должно состоять из букв";
        }
        break;
      case "email":
        if (!value || value.trim() === "") {
          errors.email = "Email не может быть пустым";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errors.email = "Некорректный формат email";
        }
        break;
      case "phone":
        if (!value || value.trim() === "") {
          errors.phone = "Телефон не может быть пустым";
        } else if (!/^\+?\d{10,15}$/.test(value)) {
          errors.phone = "Некорректный формат телефона";
        }
        break;
      case "messenger":
        if (value && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(value)) {
          errors.messenger = "Некорректный URL мессенджера";
        }
        break;
      case "github":
        if (value && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(value)) {
          errors.github = "Некорректный URL GitHub";
        }
        break;
      default:
        break;
    }

    setValidationErrors(errors);
  };
  const [experience, setExperience] = useState([
    {
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
    }
  ]);

  const [education, setEducation] = useState([
    {
      degree: '',
      university: '',
      startDate: '',
      endDate: '',
    }
  ]); const [skills, setSkills] = useState([]);

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
    if (experience.length > 1) {
      setExperience(experience.filter((_, i) => i !== index));
    }
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
    if (education.length > 1) {
      setEducation(education.filter((_, i) => i !== index));
    }
  };

  const handleSkillsChange = (e) => {
    setSkills(e.target.value.split(',').map(skill => skill.trim()));
  };

  const generateResume = () => {
    console.log(personalInfo, experience, education, skills);
  };

  return (
    <div className="resume-container">
      <h1>РЕЗЮМЕ ГЕНЕРАТОР</h1>

      <div className="personal-info">
        <h2>Персональная информация</h2>
        <input
          type="text"
          name="name"
          placeholder="Имя"
          value={personalInfo.name}
          onChange={handlePersonalInfoChange}
        />
        {validationErrors.name && <span className="error">{validationErrors.name}</span>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={personalInfo.email}
          onChange={handlePersonalInfoChange}
        />
        {validationErrors.email && <span className="error">{validationErrors.email}</span>}
        <input
          type="tel"
          name="phone"
          placeholder="Телефон"
          value={personalInfo.phone}
          onChange={handlePersonalInfoChange}
        />
        {validationErrors.phone && <span className="error">{validationErrors.phone}</span>}
        <input
          type="url"
          name="messenger"
          placeholder="Мессенжер"
          value={personalInfo.messenger}
          onChange={handlePersonalInfoChange}
        />
        {validationErrors.messenger && <span className="error">{validationErrors.messenger}</span>}
        <input
          type="url"
          name="github"
          placeholder="GitHub"
          value={personalInfo.github}
          onChange={handlePersonalInfoChange}
        />
        {validationErrors.github && <span className="error">{validationErrors.github}</span>}
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
            {index < experience.length - 1 && (
              <button className="generate-button generate-button__delete" onClick={() => deleteExperience(index)}>Удалить</button>
            )}
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
            {index < education.length - 1 && (
              <button className="generate-button generate-button__delete" onClick={() => deleteEducation(index)}>Удалить</button>
            )}
          </div>
        ))}
        <button className="generate-button" onClick={addEducation}>Добавить образование</button>
      </div>

      <div className="skills">
        <h2>Навыки</h2>
        <p>Введите навыки через запятую</p>
        <textarea placeholder="Введите навыки через запятую" value={skills.join(', ')} onChange={handleSkillsChange} />
      </div>

      <button className="generate-button generate-button__generate" onClick={generateResume}>Сгенерировать резюме</button>
    </div >
  );
}

export default ResumeGenerator;
