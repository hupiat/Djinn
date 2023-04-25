import { useDeferredValue, useState, useTransition } from "react";
import { Account } from "../../commons/types";
import { SchemaModel, StringType } from "schema-typed";
import { Button, ButtonToolbar, Form, InputGroup } from "rsuite";
import "./styles.css";
import { Branch, EyeClose, Send, UserBadge, Visible } from "@rsuite/icons";
import { MAX_LENGTH_COMMON, MIN_LENGTH_COMMON } from "../../commons/tools";
import DataStore from "../../commons/middleware/DataStore";
import { useMiddlewareContext } from "../../commons/middleware/context";
import { PATH_LOGIN } from "../../commons/middleware/paths";
import { useNavigate } from "react-router";
import { PATH_ROOT } from "../Sidebar/paths";
import { useMyToaster } from "../../commons/hooks";

type AccountTypingTokenDTO = Pick<Account, "name"> & Pick<Account, "password">;

const schema = SchemaModel<AccountTypingTokenDTO>({
  name: StringType()
    .isRequired()
    .rangeLength(MIN_LENGTH_COMMON, MAX_LENGTH_COMMON),
  password: StringType()
    .isRequired()
    .rangeLength(8, MAX_LENGTH_COMMON)
    .containsLetter()
    .containsNumber()
    .containsUppercaseLetter()
    .containsLowercaseLetter(),
});

const defaultState: AccountTypingTokenDTO = {
  name: "",
  password: "",
};

export default function Login() {
  const { metadataInit, user, setUser } = useMiddlewareContext();
  const [isPassVisible, setPassVisible] = useState<boolean>(false);
  const [typing, setTyping] = useState<AccountTypingTokenDTO>(defaultState);
  const deferredTyping = useDeferredValue(typing);
  const navigate = useNavigate();
  const [transitionPending, startTransition] = useTransition();

  const toaster = useMyToaster("Login", "error", () => setPassVisible(false));

  if (!!user) {
    startTransition(() => navigate(PATH_ROOT));
  }

  const handleCardClick = () => {
    setPassVisible(false);
    setTyping(defaultState);
  };

  const handlePassClick = () => setPassVisible(!isPassVisible);

  const handleLogin = () =>
    startTransition(() => {
      DataStore.doFetch(
        metadataInit?.apiPrefix + "/" + PATH_LOGIN,
        async (url) => {
          const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
              principal: typing.name,
              credentials: typing.password,
            }),
          });
          setUser(await res.json());
          return res;
        },
        false
      )
        .then(() => navigate(PATH_ROOT))
        .catch(() => toaster.toast("Bad credentials"));
    });

  return (
    <div id="login__root">
      <h1>
        <Branch />
        Intranet
      </h1>
      <div id="login__container">
        <Form
          fluid
          formValue={deferredTyping}
          model={schema}
          onChange={(val) => setTyping({ ...deferredTyping, ...val })}
          onSubmit={handleLogin}
        >
          <Form.Group controlId="name">
            <InputGroup>
              <InputGroup.Button onClick={handleCardClick} type="reset">
                <UserBadge />
              </InputGroup.Button>
              <Form.Control name="name" placeholder="Username" />
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="password">
            <InputGroup>
              <InputGroup.Button onClick={handlePassClick}>
                {isPassVisible ? <Visible /> : <EyeClose />}
              </InputGroup.Button>
              <Form.Control
                name="password"
                type={isPassVisible ? undefined : "password"}
                placeholder="Password"
              />
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <ButtonToolbar>
              <Button
                block
                ripple
                appearance="primary"
                endIcon={<Send />}
                loading={transitionPending}
                type="submit"
              >
                Login
              </Button>
            </ButtonToolbar>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}
