import React, { useState } from "react";

interface Props {
  verification: (tempPassword: string) => (e: React.FormEvent) => void;
}

const GetPassword: React.FC<Props> = ({ verification }) => {
  const [password, setPassword] = useState<string>("");
  return (
    <form className="verification-form" onSubmit={verification(password)}>
      <label htmlFor="">Write Your Password</label>
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button>Submit</button>
    </form>
  );
};

export default GetPassword;
