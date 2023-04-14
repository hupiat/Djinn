import { useEffect } from "react";

export const useEffectWhenSync = (
  isSync: () => boolean,
  callback: () => void,
  ...deps: any[]
) => {
  let tmpDeps = isSync() ? deps : undefined;
  if (tmpDeps) {
    tmpDeps = [...tmpDeps, callback, isSync];
  }

  console.log(deps, tmpDeps);

  useEffect(() => {
    if (isSync()) {
      callback();
    }
  }, tmpDeps);
};
