import React, { useState } from 'react';
import { Font, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';

Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf', fontWeight: 300 },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 400,
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf', fontWeight: 500,
    },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 600 },
  ],
})

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
      profession: '',
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

  const resumeDocumentGenerate = () => {
    const document = (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.name}>{personalInfo.name}</Text>
            <Text style={styles.contact}>
              {personalInfo.email} | {personalInfo.phone}
            </Text>
            <Text style={styles.contact}>
              Мессенджер: {personalInfo.messenger} | GitHub: {personalInfo.github}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.heading}>Опыт работы</Text>
            {experience.map((exp, index) => (
              <View key={index} style={styles.experience}>
                <Text style={styles.title}>{exp.title}</Text>
                <Text style={styles.company}>{exp.company}</Text>
                <Text style={styles.period}>
                  {exp.startDate} - {exp.endDate}
                </Text>
                <Text style={styles.description}>{exp.description}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.heading}>Образование</Text>
            {education.map((edu, index) => (
              <View key={index} style={styles.education}>
                <Text style={styles.title}>{edu.profession}</Text>
                <Text style={styles.company}>{edu.university}</Text>
                <Text style={styles.period}>
                  {edu.startDate} - {edu.endDate}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.heading}>Навыки</Text>
            <Text style={styles.skills}>{skills.join(', ')}</Text>
          </View>
        </Page>
      </Document>
    );

    return document;
  };

  const styles = StyleSheet.create({
   page: {
    fontFamily: 'Roboto',
    padding: 20,
    fontSize: 12,
    lineHeight: 1.5,
    color: '#333',
  },
  header: {
    marginBottom: 30,
    textAlign: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007bff',
  },
  contact: {
    marginBottom: 5,
    fontSize: 14,
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007bff',
  },
  experience: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
  },
  education: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  company: {
    marginBottom: 5,
  },
  period: {
    marginBottom: 5,
    fontSize: 12,
    color: '#777',
  },
  description: {
    marginBottom: 10,
  },
  skills: {
    marginBottom: 10,
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillItem: {
    backgroundColor: '#e9e9e9',
    padding: 8,
    borderRadius: 20,
    fontSize: 12,
    color: '#333',
  }, 
  });


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

      <PDFDownloadLink
        className="generate-button generate-button__generate"
        document={resumeDocumentGenerate()}
        fileName="my-resume.pdf"
        style={{ textDecoration: 'none', color: 'blue' }}
      >
        {({ loading }) => (loading ? 'Загрузка...' : 'Скачать мое резюме PDF')}
      </PDFDownloadLink>
    </div>
  );
}

export default ResumeGenerator;
