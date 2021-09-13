import React, { useRef } from "react";

interface Props {
  setNewSiteName: React.Dispatch<React.SetStateAction<string>>;
  setNewId: React.Dispatch<React.SetStateAction<string>>;
  setNewPassword: React.Dispatch<React.SetStateAction<string>>;
  newPost: (
    inputRef: React.RefObject<HTMLInputElement>[]
  ) => (e: React.FormEvent) => void;
}

const NewPassword: React.FC<Props> = ({
  setNewSiteName,
  setNewId,
  setNewPassword,
  newPost,
}) => {
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const inputRef3 = useRef<HTMLInputElement>(null);

  const inputRefs = [inputRef1, inputRef2, inputRef3];

  return (
    <div className="new-password-form" onSubmit={newPost(inputRefs)}>
      <form>
        <label htmlFor="">Name of the site</label>
        <input
          type="text"
          placeholder="Name of the site"
          required
          ref={inputRef1}
          onChange={(e) => setNewSiteName(e.target.value)}
        />
        <label htmlFor="">ID</label>
        <input
          type="text"
          placeholder="ID"
          required
          ref={inputRef2}
          onChange={(e) => setNewId(e.target.value)}
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          placeholder="Password"
          required
          ref={inputRef3}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default NewPassword;
