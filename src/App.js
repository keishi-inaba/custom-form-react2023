import { useState } from 'react';
import './App.css';

function App() {
  const initialValues = {username: "", mailaddress: "", password: ""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handelChange = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //ログイン情報を送信する
    //バリテーションチェックする
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    if(!values.username) {
      errors.username = "Please enter your user name!";
    }
    if(!values.mailaddress) {
      errors.mailaddress = "Please enter your user address!";
    } else if (!regex.test(values.mailaddress)) {
      errors.mailaddress = "Please enter your correct email address!";
    }
    if(!values.password) {
      errors.password = "Please enter your user password!";
    } else if (values.password.length < 4) {
      errors.password = "Please enter a password of at least 4 and no more than 15 characters!";
    } else if (values.password.length > 15) {
      errors.password = "Please enter a password of at least 4 and no more than 15 characters!";
    }
    return errors;
  }

  return (
    <div className="formContainer">
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>Login Form</h1>
        <hr />
        <div className="uiForm">
          <div className="formField">
            <label>username</label>
            <input type="text" placeholder="username" name="username" onChange={(e) => handelChange(e)}/>
          </div>
          <p className="errorMsg">{formErrors.username}</p>

          <div className="formField">
            <label>Email</label>
            <input type="text" placeholder="mailaddress" name="mailaddress" onChange={(e) => handelChange(e)}/>
          </div>
          <p className="errorMsg">{formErrors.mailaddress}</p>

          <div className="formField">
            <label>password</label>
            <input type="text" placeholder="password" name="password" onChange={(e) => handelChange(e)}/>
          </div>
          <p className="errorMsg">{formErrors.password}</p>

          <button className="submitButton">Login</button>
          {Object.keys(formErrors).length === 0 && isSubmit && (
            <div className="msgOk">Successfully logged in.</div>
          )}
        </div>
      </form>
    </div>
  );
}

export default App;
