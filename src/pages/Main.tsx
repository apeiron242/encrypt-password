import React, { useState, useRef, useEffect } from "react";
import GetPassword from "../components/GetPassword";
import NewPassword from "../components/NewPassword";
import ViewPMList from "../components/ViewPMList";
import { DataInterface } from "../utils/interfaces";

const { ipcRenderer } = window.require("electron");

const Main: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [newSiteName, setNewSiteName] = useState<string>("");
  const [newId, setNewId] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [data, setData] = useState<DataInterface[]>();
  const [finalData, setFinalData] = useState<DataInterface[]>();
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const viewNewPasswordRef = useRef<HTMLDivElement>(null);
  const viewPMListRef = useRef<HTMLDivElement>(null);
  const viewNewPasswordBtnRef = useRef<HTMLButtonElement>(null);
  const viewPMListBtnRef = useRef<HTMLButtonElement>(null);

  const verification =
    (tempPassword: string, passwordRef: React.RefObject<HTMLInputElement>) =>
    (e: React.FormEvent) => {
      e.preventDefault();
      setIsVerified(true);
      setPassword(tempPassword);
      ipcRenderer
        .invoke("decrypt", tempPassword)
        .then((result: DataInterface[]) => {
          setData(result);
          setData((data) =>
            data?.filter((elem) => elem.username && elem.password)
          );
        });
      passwordRef.current!.value = "";
    };

  const newPost =
    (inputRef: React.RefObject<HTMLInputElement>[]) =>
    async (e: React.FormEvent) => {
      e.preventDefault();
      const data: DataInterface = {
        userPassword: password,
        sitename: newSiteName,
        username: newId,
        password: newPassword,
      };
      const result = await ipcRenderer.invoke("encrypt", data);
      if (result !== "ok") {
        alert("error has occurred. Try ot again later");
      }
      ipcRenderer
        .invoke("decrypt", password)
        .then((result: DataInterface[]) => {
          setData(result);
          setData((data) =>
            data?.filter((elem) => elem.username && elem.password)
          );
        });

      inputRef.forEach((elem) => {
        elem.current!.value = "";
      });
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

  useEffect(() => {
    setFinalData(data);
    if (searchKeyword) {
      setFinalData(
        data?.filter((elem) =>
          elem.sitename.toLowerCase().includes(searchKeyword.toLowerCase())
        )
      );
    }
  }, [searchKeyword, data]);

  return (
    <div className="Main">
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
          <div ref={viewNewPasswordRef} className="hidden">
            <NewPassword
              setNewSiteName={setNewSiteName}
              setNewId={setNewId}
              setNewPassword={setNewPassword}
              newPost={newPost}
            />
          </div>
          <div ref={viewPMListRef} className="hidden">
            {data && data.length > 0 ? (
              <div className="pm-list">
                <input
                  type="text"
                  placeholder="Search Data"
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="search-input"
                />
                {finalData?.map((elem) => (
                  <ViewPMList data={elem} setData={setData} key={elem.id} />
                ))}
              </div>
            ) : (
              <h3 className="info">No Data</h3>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
