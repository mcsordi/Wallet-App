const validationEmail = async (email) => {
  try {
    const result = await fetch(
      `https://mp-wallet-app-api.herokuapp.com/users?email=${email}`
    );
    const user = await result.json(email);
    return user;
  } catch (error) {
    return { error };
  }
};

onclickLogin = async () => {
  const email = document.getElementById("input-email").value;
  if (email.length < 5 || !email.includes("@") || !email.includes(".")) {
    alert("e-mail invalido");
    return;
  }
  const result = await validationEmail(email);
  if (result.error) {
    alert("Falha ao validar e-mail");
    return;
  }
  localStorage.setItem("@WalletApp:Email", result.email);
  localStorage.setItem("@WalletApp:Name", result.name);
  localStorage.setItem("@WalletApp:Id", result.id);
  window.open("./home/index.html", "_self");
};
