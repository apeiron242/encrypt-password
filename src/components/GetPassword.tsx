import React, { useRef, useState } from "react";

interface Props {
  verification: (
    tempPassword: string,
    passwordRef: React.RefObject<HTMLInputElement>
  ) => (e: React.FormEvent) => void;
}

const GetPassword: React.FC<Props> = ({ verification }) => {
  const [password, setPassword] = useState<string>("");
  const passwordRef = useRef<HTMLInputElement>(null);
  return (
    <form
      className="verification-form"
      onSubmit={verification(password, passwordRef)}
    >
      <label htmlFor="">Password for this app</label>
      <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        ref={passwordRef}
        required
      />
      <button>Submit</button>
    </form>
  );
};

export default GetPassword;
