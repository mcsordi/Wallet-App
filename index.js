const saveEmail = () => {
  const email = document.getElementById("input-email").value;
  if (email.lenght < 5 || !email.includes("@") || !email.includes(".")) {
    alert("Email invalido");
    return;
  }
  localStorage.setItem("@WalletApp:email", email);
  window.open("./pages/register/index.html", "_self");
};
