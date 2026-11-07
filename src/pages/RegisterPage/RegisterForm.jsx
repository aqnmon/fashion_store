import { useState } from "react";
import "./RegisterForm.css";

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [skills, setSkills] = useState([]);
  const [about, setAbout] = useState("");

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setSkills((prev) =>
        checked
          ? [...prev, value]
          : prev.filter((skill) => skill !== value)
      );
    } 
    else {
      switch (name) {
        case "name": setName(value); break;
        case "email": setEmail(value); break;
        case "password": setPassword(value); break;
        case "age": setAge(value); break;
        case "country": setCountry(value); break;
        case "gender": setGender(value); break;
        case "about": setAbout(value); break;
        default: break;
      }
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Имя обязательно";
    if (!email.trim()) newErrors.email = "Email обязателен";
    if (password.length < 6) newErrors.password = "Пароль должен быть минимум 6 символов";
    if (!age || Number(age) < 18) newErrors.age = "Возраст должен быть от 18 лет";
    if (!country) newErrors.country = "Выберите страну";
    if (!gender) newErrors.gender = "Выберите пол";
    if (skills.length === 0) newErrors.skills = "Выберите хотя бы один стиль";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmittedData({ name, email, password, age, country, gender, skills, about });
      setIsSubmitted(true);
    } else {
      setIsSubmitted(false);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setPassword("");
    setAge("");
    setCountry("");
    setGender("");
    setSkills([]);
    setAbout("");
    setErrors({});
    setIsSubmitted(false);
    setSubmittedData(null);
  };

  return (
    <div className="register-container">
      <h1>Регистрация</h1>

      {isSubmitted && submittedData && (
        <div className="success-block">
          <h2>Форма успешно отправлена!</h2>
          <h3>Данные пользователя:</h3>
          <p><strong>Имя:</strong> {submittedData.name}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Возраст:</strong> {submittedData.age}</p>
          <p><strong>Страна:</strong> {submittedData.country}</p>
          <p><strong>Пол:</strong> {submittedData.gender}</p>
          <p><strong>Стиль:</strong> {submittedData.skills.join(", ")}</p>
          <p><strong>О себе:</strong> {submittedData.about}</p>
          <button type="button" onClick={handleReset} className="btn-reset">
            Очистить форму
          </button>
        </div>
      )}

      
      {!isSubmitted && (
        <form onSubmit={handleSubmit} className="register-form">
          
          <div className="form-group">
            <label>Имя</label>
            <input type="text" name="name" value={name} onChange={handleChange} />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={email} onChange={handleChange} />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Пароль</label>
            <input type="password" name="password" value={password} onChange={handleChange} />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label>Возраст</label>
            <input type="number" name="age" value={age} onChange={handleChange} />
            {errors.age && <span className="error">{errors.age}</span>}
          </div>

          <div className="form-group">
            <label>Страна</label>
            <select name="country" value={country} onChange={handleChange}>
              <option value="">Выберите страну</option>
              <option value="Казахстан">Казахстан</option>
              <option value="Россия">Россия</option>
              <option value="США">США</option>
            </select>
            {errors.country && <span className="error">{errors.country}</span>}
          </div>

          <div className="form-group">
            <label>Пол</label>
            <div className="radio-group">
              <label>
                <input type="radio" name="gender" value="Мужской" checked={gender === "Мужской"} onChange={handleChange} />
                Мужской
              </label>
              <label>
                <input type="radio" name="gender" value="Женский" checked={gender === "Женский"} onChange={handleChange} />
                Женский
              </label>
            </div>
            {errors.gender && <span className="error">{errors.gender}</span>}
          </div>

          <div className="form-group">
            <label>Стиль</label>
            <div className="checkbox-group">
              {["Спортивный", "Классика", "Кэжуал", "Винтаж"].map((skill) => (
                <label key={skill}>
                  <input type="checkbox" name="skills" value={skill} checked={skills.includes(skill)} onChange={handleChange} />
                  {skill}
                </label>
              ))}
            </div>
            {errors.skills && <span className="error">{errors.skills}</span>}
          </div>

          <div className="form-group">
            <label>О себе</label>
            <textarea name="about" value={about} onChange={handleChange} rows="4" />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit">Отправить</button>
            <button type="button" onClick={handleReset} className="btn-reset">Сбросить</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default RegisterForm;