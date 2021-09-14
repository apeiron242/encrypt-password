# Encrypt Password

This app enables you to encrypt your username and password data and save it to your local computer

## How does it work?

- This app generates hash of the password which you use for this app
- And, it **uses the hash to encrypt the information** that you want to store
- It will encrypt the username and the password
- When the data is encrypted, it's stored in to your local computer
- So unless your password for this app is exposed, it is impossible to decrypt the information you've stored
- Also, your password for this app isn't stored in the database
- This app uses SHA256 algorithm to hash your password for this app, and AES for encrypting you information

## How to use this app?

- Download the app from [Here](https://github.com/apeiron242/encrypt-password/releases)
- Make a password for this app
- Write a new data with required information
- You can have various password for this app, but if the password is not equal to the one which you used to encrypt, the data wouldn't be decrypted
