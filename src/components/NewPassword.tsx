import React from "react";

interface Props {
  setNewSiteName: React.Dispatch<React.SetStateAction<string>>;
  setNewId: React.Dispatch<React.SetStateAction<string>>;
  setNewPassword: React.Dispatch<React.SetStateAction<string>>;
  newPost: (e: React.FormEvent) => void;
}

const NewPassword: React.FC<Props> = ({
  setNewSiteName,
  setNewId,
  setNewPassword,
  newPost,
}) => {
  return (
    <div className="new-password-form" onSubmit={newPost}>
      <form>
        <label htmlFor="">Name of the site</label>
        <input
          type="text"
          placeholder="Name of the site"
          required
          onChange={(e) => setNewSiteName(e.target.value)}
        />
        <label htmlFor="">ID</label>
        <input
          type="text"
          placeholder="ID"
          required
          onChange={(e) => setNewId(e.target.value)}
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default NewPassword;
