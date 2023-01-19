const validadeUser = async (email) => {
  try {
    const result = await fetch(
      `https://mp-wallet-app-api.herokuapp.com/users?email=${email}`
    );
    const user = await result.json();
    return user;
  } catch (error) {
    return error;
  }
};

const onclickLogin = async () => {
  const email = document.getElementById("input-email").value;
  if (email.length < 5 || !email.includes("@") || !email.includes(".")) {
    alert("Email Invalido");
    return;
  }
  const result = await validadeUser(email);
  if (result.error) {
    alert("Falha ao validar e-mail.");
    return;
  }

  localStorage.setItem("@WalletApp:email", result.email);
  localStorage.setItem("@WalletApp:name", result.name);
  localStorage.setItem("@WalletApp:id", result.id);
  window.open("./src/image/register/index.html", "_self");
};
