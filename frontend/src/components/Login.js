import { useState } from "react";

function Login({ onLogin }) {
  const [values, setValues] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values.email, values.password);
  }

  return (
    <section className="register">
      <div className="register__container">
        <h2 className="register__header">Вход</h2>
        <form className="register__form" onSubmit={handleSubmit}>
          <input
            className="register__input"
            type="email"
            placeholder="Email"
            value={values.email ?? ""}
            onChange={handleChange}
            required
            name="email"
          />
          <input
            className="register__input"
            type="password"
            placeholder="Password"
            value={values.password ?? ""}
            onChange={handleChange}
            required
            name="password"
          />
          <button className="register__button">Войти</button>
        </form>
      </div>
    </section>
  );
}

export default Login;
