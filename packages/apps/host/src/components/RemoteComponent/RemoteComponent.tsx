import React, { Suspense, useEffect, useState } from "react";
import useScript from "../../hooks/useScript";

interface ExtendedWindow extends Window {
  Widgets: { [name: string]: any };
}

interface Props {
  widgetUrl: string;
  [propName: string]: any;
}

const RemoteComponent: React.FC<Props> = ({ widgetUrl, ...props }) => {
  const [RemoteModule, setRemoteModule] = useState<React.ComponentType<any>>();

  const { ready, failed } = useScript(widgetUrl);

  useEffect(() => {
    if (!ready || failed || RemoteModule) {
      return;
    }

    const widgetUrlParts = widgetUrl.split("/");
    const widgetName = widgetUrlParts[widgetUrlParts.length - 1];

    const cachedWidgets = (window as ExtendedWindow & typeof globalThis)
      .Widgets;

    const content = cachedWidgets && cachedWidgets[widgetName];

    if (content) {
      setRemoteModule(() => content.default);
    }
  }, [ready, failed, RemoteModule, props, widgetUrl]);

  if (!ready) {
    return <div>Component is loading...</div>;
  }

  if (failed) {
    return <div>There was an error :(</div>;
  }

  return (
    <Suspense fallback={<div>loading...</div>}>
      {RemoteModule && <RemoteModule {...props} />}
    </Suspense>
  );
};

export default RemoteComponent;
