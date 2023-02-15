import { useState } from 'react';
import s from './style.module.css';
import eye from './svg/eye.svg';
import eyeBlock from './svg/eye-blocked.svg';

export default function PasswordTest() {
  const [passwordType, setPasswordType] = useState<string>('password');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [sectionText, setSectionText] = useState<string>(
    'The password is empty'
  );
  const [spanBgImage, setSpanBgImage] = useState(eye);
  const section = document.getElementById('section') as HTMLLIElement;

  function handleToggleBtn() {
    if (passwordType === 'text') {
      setPasswordType('password');
      setSpanBgImage(eye);
    } else {
      setPasswordType('text');
      setSpanBgImage(eyeBlock);
    }
  }

  function checkPassword(data: string) {
    const letters = new RegExp('(?=.*[a-zA-Z])');
    const digits = new RegExp('(?=.*[0-9])');
    const symbols = new RegExp('(?=.*[-!$%^@&*#()_+|~=`{}:";\'<>?,./])');
    const space = new RegExp('(?=.*[ ])');

    if (space.test(data)) {
      return;
    } else {
      setPasswordValue(data);
    }

    if (data.length > 0 && data.length < 8) {
      section.style.width = '100%';
      section.style.backgroundColor = 'red';
      setSectionText('The password must be more then 8 characters');
    } else {
      section.style.width = '0';
      setSectionText('The password is empty');
      if (digits.test(data) || letters.test(data) || symbols.test(data)) {
        section.style.width = '100px';
        section.style.backgroundColor = 'red';
        setSectionText('The password is easy');
      }
      if (
        (digits.test(data) && letters.test(data)) ||
        (symbols.test(data) && letters.test(data)) ||
        (digits.test(data) && symbols.test(data))
      ) {
        section.style.width = '200px';
        section.style.backgroundColor = 'yellow';
        setSectionText('The password is medium');
      }
      if (digits.test(data) && letters.test(data) && symbols.test(data)) {
        section.style.width = '100%';
        section.style.backgroundColor = 'green';
        setSectionText('The password is strong');
      }
    }
  }
  return (
    <div>
      <div className={s.box}>
        <label className={s.inputBox} htmlFor="password">
          <input
            className={s.password}
            type={passwordType}
            name="password"
            placeholder="Password"
            autoComplete="off"
            id="password"
            value={passwordValue}
            onChange={e => checkPassword(e.target.value)}
          />
          <span
            className={s.toggle}
            onClick={handleToggleBtn}
            style={{ backgroundImage: `url(${spanBgImage})` }}
          ></span>
        </label>
        <div className={s.validation}>
          <span className={s.section} id="section"></span>
        </div>
        <p className={s.text}>{sectionText}</p>
      </div>
    </div>
  );
}
