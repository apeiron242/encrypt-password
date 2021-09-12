import React from "react";

interface Props {
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  verification: (e: React.FormEvent) => void;
}

const GetPassword: React.FC<Props> = ({ setPassword, verification }) => {
  return (
    <form className="verification-form" onSubmit={verification}>
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
