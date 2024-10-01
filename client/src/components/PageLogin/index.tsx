import { Card, Container } from "@mui/material";
import React, { useState } from "react";
import "./styles.css";
import Logo from "../../assets/logo.webp";
import { Face4, Visibility } from "@mui/icons-material";
import InputFormStandard from "../InputFormStandard";
import ButtonWithAction from "../ButtonWithAction.tsx";
import { useMiddlewareContext } from "../../commons/middleware/context";
import { Account } from "../../commons/types";
import { validateEmail, validatePassword } from "../../commons/tools";

export default function PageLogin() {
  const [isSuscribing, setIsSuscribing] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const { setUser } = useMiddlewareContext();

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
        <ButtonWithAction
          text="Login"
          disabled={!validateSchema()}
          iconPosition="end"
          onClick={async () => {
            await setUser({
              email,
              password,
            } as Account);
          }}
        />
      </Card>
    </Container>
  );
}
