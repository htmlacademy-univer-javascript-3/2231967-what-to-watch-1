import { FC, FormEvent, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { logInAction } from '../../store/api-actions';
import AuthorizationStatus from '../../types/authorization-status';

const SignInPage: FC = () => {
  const { authorizationStatus } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  if (authorizationStatus === AuthorizationStatus.Authorized) {
    return (<Navigate to={AppRoute.Main} />);
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (emailRef.current !== null && passwordRef.current !== null) {
      dispatch(logInAction({email: emailRef.current.value, password: passwordRef.current.value}));
      navigate(-1);
    }
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">Sign in</h1>
      </header>
      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" ref={emailRef} />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" ref={passwordRef} />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>
      <footer className="page-footer">
        <Logo isLight />
        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
};

export default SignInPage;
