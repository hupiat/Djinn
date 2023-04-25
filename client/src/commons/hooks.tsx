import { ReactNode } from "react";
import { BusinessObject, Toaster } from "./types";
import { Notification, useToaster } from "rsuite";
import { MessageType } from "rsuite/esm/Notification/Notification";
import { ToastContainerProps } from "rsuite/esm/toaster/ToastContainer";

export function getToastApiMessage<T extends BusinessObject>(
  message: string,
  obj?: T
): ReactNode {
  return (
    <span>
      <b>[API]</b>
      <br />
      <br />
      {message}
    </span>
  );
}

export const useMyToast = (
  header: string,
  type: MessageType = "info",
  onClose: () => void = () => {},
  awaitAsync: boolean = false
): Toaster => {
  const toaster = useToaster();

  // Render

  const formatMessage = (message: ReactNode): JSX.Element => (
    <Notification header={header} type={type} onClose={onClose} closable>
      {message}
    </Notification>
  );

  // (coercions for typing mismatch in rsuite)
  const opts = {
    placement: "topEnd",
    duration: type === "error" ? 0 : 5000,
  } as ToastContainerProps;

  // Callbacks

  let toast;

  // (same)
  if (awaitAsync) {
    toast = async (message: ReactNode) =>
      (await toaster.push(formatMessage(message), opts)) as string;
  } else {
    toast = (message: ReactNode) =>
      toaster.push(formatMessage(message), opts) as string;
  }

  const clear = (key: string) => toaster.remove(key);
  const clearAll = () => toaster.clear();

  return {
    toast,
    clear,
    clearAll,
  };
};
