import React, { useRef } from "react";
import { DataInterface } from "../utils/interfaces";

interface Props {
  data: DataInterface;
  setData: React.Dispatch<React.SetStateAction<DataInterface[] | undefined>>;
}

const { ipcRenderer } = window.require("electron");

const ViewPMList: React.FC<Props> = ({ data, setData }) => {
  const passwordRef = useRef<HTMLSpanElement>(null);
  const generateHash = (password: string) => {
    let hash = "";
    for (let i = 0; i < password.length; i++) {
      hash += "*";
    }
    return hash;
  };

  const togglePassword = (password: string) => {
    if (password === passwordRef.current!.innerText) {
      passwordRef.current!.innerText = generateHash(password);
    } else {
      passwordRef.current!.innerText = password;
    }
  };

  const deletePassword = (id: string, sitename: string) => {
    const confirm = window.confirm(
      `Do you really want to delete the password of ${sitename}`
    );

    if (!confirm) return;

    ipcRenderer.invoke("delete", id).then((result: string) => {
      if (result !== "ok") {
        alert(result);
        return;
      }

      setData((data) => data?.filter((elem) => elem.id !== id));
    });
  };
  return (
    <div className="view-PM">
      <div key={data.id}>
        <h3>{data.sitename}</h3>
        <p>
          Username: <span>{data.username}</span>
        </p>
        <p onClick={() => togglePassword(data.password)} className="password">
          Password:
          <span ref={passwordRef}>{generateHash(data.password)}</span>
        </p>
        <button onClick={() => deletePassword(data.id!, data.sitename)}>
          ❌
        </button>
      </div>
    </div>
  );
};

export default ViewPMList;
