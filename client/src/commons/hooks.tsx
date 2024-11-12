import { useEffect } from "react";
import { useMiddlewareContext } from "./middleware/context";
import { useNavigate } from "react-router-dom";
import { PATH_LOGIN } from "./middleware/paths";

export const useRedirectToLogin = () => {
  const { user } = useMiddlewareContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      navigate(PATH_LOGIN);
    }
  }, [user]);
};
