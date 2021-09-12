import React, { useState, useRef, useEffect } from "react";
import Header from "./components/Header";
import GetPassword from "./components/GetPassword";
import NewPassword from "./components/NewPassword";
import ViewPMList from "./components/ViewPMList";
import "./styles/global.scss";
import { DataInterface } from "./utils/interfaces";

const { ipcRenderer } = window.require("electron");

const App: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(true);
  const [newSiteName, setNewSiteName] = useState<string>("");
  const [newId, setNewId] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [data, setData] = useState<DataInterface[]>();

  const viewNewPasswordRef = useRef<HTMLDivElement>(null);
  const viewPMListRef = useRef<HTMLDivElement>(null);
  const viewNewPasswordBtnRef = useRef<HTMLButtonElement>(null);
  const viewPMListBtnRef = useRef<HTMLButtonElement>(null);

  const verification = (tempPassword: string) => (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerified(true);
    setPassword(tempPassword);
    ipcRenderer.invoke("decrypt", password).then((result: DataInterface[]) => {
      alert(result);
      setData(result);
    });
  };

  const newPost = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: DataInterface = {
      userPassword: password,
      siteName: newSiteName,
      username: newId,
      password: newPassword,
    };
    const result = await ipcRenderer.invoke("encrypt", data);
    if (result !== "ok") {
      alert("error has occurred. Try ot again later");
    }
  };

  const setViewNewPassword = () => {
    if (viewNewPasswordRef.current?.classList.contains("hidden")) {
      viewNewPasswordBtnRef.current!.innerText = "Hide Form";
    } else {
      viewNewPasswordBtnRef.current!.innerText = "New Data";
    }

    viewNewPasswordRef.current?.classList.toggle("hidden");
    viewNewPasswordBtnRef.current?.classList.toggle("button-active");
  };

  const setViewPMList = () => {
    if (viewPMListRef.current?.classList.contains("hidden")) {
      viewPMListBtnRef.current!.innerText = "Hide List of Passwords";
    } else {
      viewPMListBtnRef.current!.innerText = "List of Passwords";
    }

    viewPMListRef.current!.classList.toggle("hidden");
    viewPMListBtnRef.current?.classList.toggle("button-active");
  };

  return (
    <div className="App">
      <Header />
      <main>
        <GetPassword verification={verification} />
        {isVerified ? (
          <div className="display-btn">
            <button onClick={setViewNewPassword} ref={viewNewPasswordBtnRef}>
              New Data
            </button>
            <button onClick={setViewPMList} ref={viewPMListBtnRef}>
              List of Passwords
            </button>
          </div>
        ) : null}
        <div className="cards">
          <div ref={viewNewPasswordRef} className="">
            <NewPassword
              setNewSiteName={setNewSiteName}
              setNewId={setNewId}
              setNewPassword={setNewPassword}
              newPost={newPost}
            />
          </div>
          <div ref={viewPMListRef} className="">
            <ViewPMList />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
