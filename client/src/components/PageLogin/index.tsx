import { Card, Container, Fab } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./styles.css";
import Logo from "../../assets/logo.webp";
import { AddLink, Face4, NotInterested, Visibility } from "@mui/icons-material";
import InputFormStandard from "../forms/InputFormStandard";
import ButtonWithAction from "../forms/ButtonWithAction";
import { useMiddlewareContext } from "../../commons/middleware/context";
import { Account } from "../../commons/types";
import { validateEmail, validatePassword } from "../../commons/tools";
import { PATH_PROJECTS } from "../../commons/middleware/paths";
import { useNavigate } from "react-router-dom";

export default function PageLogin() {
  const [isSuscribing, setIsSuscribing] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const { user, setUser, storeDataAccounts } = useMiddlewareContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(PATH_PROJECTS);
    }
  }, [user, navigate]);

  const validateSchema = (): boolean => {
    if (isSuscribing) {
      return (
        validateEmail(email) &&
        validatePassword(password) &&
        validatePassword(passwordConfirm) &&
        password === passwordConfirm
      );
    } else {
      return validateEmail(email) && validatePassword(password);
    }
  };

  const handleClick = async () => {
    if (isSuscribing) {
      await storeDataAccounts.add({
        email: email,
        username: email,
        password: password,
      });
      setPasswordConfirm("");
    } else {
      await setUser({
        email,
        password,
      } as Account);
    }
  };

  return (
    <Container id="card__login__container">
      <Card id="card__login">
        <img src={Logo} alt="logo Djinn" />
        <InputFormStandard
          icon={<Face4 />}
          label="Email"
          type="email"
          containerClassName="card__login__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputFormStandard
          icon={<Visibility />}
          label="Password"
          type="password"
          containerClassName="card__login__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isSuscribing && (
          <InputFormStandard
            icon={<Visibility />}
            label="Confirm password"
            type="password"
            containerClassName="card__login__input"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        )}
        <ButtonWithAction
          text={isSuscribing ? "Suscribe" : "Login"}
          disabled={!validateSchema()}
          iconPosition="end"
          onClick={handleClick}
        />
      </Card>
      <Fab
        color="secondary"
        id="button__login__suscribe"
        onClick={() => setIsSuscribing(!isSuscribing)}
      >
        {isSuscribing ? <NotInterested /> : <AddLink />}
      </Fab>
    </Container>
  );
}
