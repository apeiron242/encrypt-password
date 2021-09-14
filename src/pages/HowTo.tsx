import React from "react";

const HowTo: React.FC = () => {
  return (
    <div className="howto">
      <div>
        <h2>How does it work?</h2>
        <ol>
          <li>
            This app generates hash of the password which you use for this app
          </li>
          <li>
            And, it uses the hash to encrypt the information that you want to
            store
          </li>
          <li>It will encrypt the username and the password</li>
          <li>
            When the data is encrypted, it's stored in to your local computer by
            SQLite3
          </li>
          <li>
            So unless your password for this app is exposed, it is impossible to
            decrypt the information you've stored
          </li>
          <li>Also, your password for this app isn't stored in the database</li>
          <li>
            This app uses SHA256 algorithm to hash your password for this app,
            and AES for encrypting/decrypting your information
          </li>
        </ol>
      </div>
      <div>
        <h2>How to use this app?</h2>
        <ol>
          <li>Make a password for this app</li>
          <li>Write a new data with required information</li>
          <li>
            You can have various password for this app, but if the password is
            not equal to the one which you used to encrypt, the data wouldn't be
            decrypted
          </li>
        </ol>
      </div>
    </div>
  );
};

export default HowTo;
