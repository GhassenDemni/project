const handleSignUpErrors = (err) => {
  let error = { email: "", password: "" };

    if (err.message.includes("email"))
      error.email = "Merci de verifier Votre Email";
    if (err.message.includes("password"))
      error.password = "Merci de Verifier Votre Password";
  return error;
};

module.exports = handleSignUpErrors;
