import { Toaster } from "react-hot-toast";

import { usePWA, InstallState } from "./hooks/providers/pwa";
import { GreenpillProvider } from "./hooks/providers/greenpill";

import { Appbar } from "./components/Layout/AppBar";
import { CircleLoader } from "./components/Loader/Circle";
import { PWAPrompt } from "./components/Layout/PWAPrompt";
import { OnlyMobile } from "./components/Layout/OnlyMobile";

import Views from "./views";

export function App() {
  const { installState, ...pwaData } = usePWA();

  const Onboard: Record<InstallState, React.ReactNode> = {
    idle: (
      <div className="w-screen h-screen pb-20 bg-[#e9e3dd] grid place-items-center z-30 fixed top-0 left-0">
        <CircleLoader />
      </div>
    ),
    installed: null,
    prompt:
      installState === "unsupported" ? (
        <PWAPrompt {...pwaData} installState={installState} />
      ) : null,
    unsupported: <OnlyMobile />,
  };

  return (
    <GreenpillProvider>
      {Onboard[installState]}
      {installState !== "unsupported" && (
        <>
          <Appbar />
          <Views />
        </>
      )}
      <Toaster containerClassName="" />
    </GreenpillProvider>
  );
}
