import { useRef, useState, useEffect} from "react";
import { faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from '../api/axios';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const NAME_REGEX = /^[a-zA-Z][a-zA-Z]{3,23}$/;
const PWD_REGEX = /^(?=.[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/auth/register';

const Register = () => {
    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [firstname, setFirstname] = useState('');
    const [validFirstname, setValidFirstname] = useState(false);
    const [firstnameFocus, setFirstnameFocus] = useState(false);

    const [lastname, setLastname] = useState('');
    const [validLastname, setValidLastname] = useState(false);
    const [lastnameFocus, setLastnameFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (emailRef.current) {
            emailRef.current.focus();
        }
    }, [])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = NAME_REGEX.test(firstname);
        console.log(result);
        console.log(firstname);
        setValidFirstname(result);
    }, [firstname])

    useEffect(() => {
        const result = NAME_REGEX.test(lastname);
        console.log(result);
        console.log(lastname);
        setValidLastname(result);
    }, [lastname])

    useEffect(() => {
        const result = PWD_REGEX.test(password);
        console.log(result);
        console.log(password);
        setValidPwd(result);
        const match = password === matchPwd;
        setValidMatch(match);
    }, [password, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [email, password, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = EMAIL_REGEX.test(email);
        const v2 = PWD_REGEX.test(password);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            console.log(JSON.stringify(firstname, lastname, email, password));
            const response = await axios.post(REGISTER_URL, JSON.stringify({firstname, lastname, email, password}),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
            console.log(response.data)
            console.log(response.accessToken);
            setSuccess(true);
            // clear input fields out of registeration fields
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Email already exists!');
            } else {
                setErrMsg('Registeration Failed');
            }
            if(errRef.current) {
                errRef.current.focus();
            }
        }
    }
    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="src/frontend/src/Components/Register#">Sign In</a>
                    </p>
                </section>
            ) : (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstname">
                    First name:
                </label>
                <input
                    type="text"
                    id="firstname"
                    autoComplete="off"
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                    aria-invalid={validFirstname? "false" : "true"}
                    onFocus={() => setFirstnameFocus(true)}
                    onBlur={() => setFirstnameFocus(false)}
                />
                <p id="uidnote" className={firstnameFocus && firstname && !validFirstname ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 characters.<br />
                    Only Letters allowed.
                </p>

                <label htmlFor="lastname">
                    Last name:
                </label>
                <input
                    type="text"
                    id="lastname"
                    autoComplete="off"
                    onChange={(e) => setLastname(e.target.value)}
                    required
                    aria-invalid={validLastname? "false" : "true"}
                    onFocus={() => setLastnameFocus(true)}
                    onBlur={() => setLastnameFocus(false)}
                />
                <p id="uidnote" className={lastnameFocus && lastname && !validLastname ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 characters.<br />
                    Only Letters allowed.
                </p>

                <label htmlFor="email">
                    Email:
                    <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                </label>
                <input
                    type="text"
                    id="email"
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-invalid={validEmail? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                />
                <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Invalid Email.<br />
                    Example: example@email.com
                </p>

                <label htmlFor="password">
                    Password:
                    <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validPwd || !password ? "hide" : "invalid"} />
                </label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must include uppercase and lowercase letters, a number and a special character.<br />
                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                </p>


                <label htmlFor="confirm_pwd">
                    Confirm Password:
                    <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                </label>
                <input
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password input field.
                </p>
                <button disabled={!validEmail || !validPwd || !validMatch}>Sign Up</button>
            </form>
            <p>
                Already registered?<br />
                <span className="line">
                            {/*put router link here*/}
                    <a href="src/frontend/src/Components/Register#">Sign In</a>
                        </span>
            </p>
        </section>)}
        </>
    )
}

export default Register;