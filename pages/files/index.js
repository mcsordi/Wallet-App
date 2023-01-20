const onCallRegister = async (email, name) => {
  try {
    const data = {
      email,
      name,
    };
    const response = await fetch(
      "https://mp-wallet-app-api.herokuapp.com/users",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
      }
    );
    const user = await response.json();
    return user;
  } catch (error) {
    return { error };
  }
};

const onRegister = async () => {
  const email = document.getElementById("input-email").value;
  const name = document.getElementById("input-name").value;
  if (name.length < 3) {
    alert("Nome deve conter mais de 3 caracteres");
    return;
  }
  if (email.length < 5 || !email.includes("@") || !email.includes(".")) {
    alert("E-mail inválido");
    return;
  }

  const result = await onCallRegister(email, name);
  if (result.error) {
    alert("Falha ao cadastrar e-mail");
    return;
  }
  localStorage.setItem("@WalletApp:Email", result.email);
  localStorage.setItem("@WalletApp:Name", result.name);
  localStorage.setItem("@WalletApp:Id", result.id);
  window.open("../../register/index.html", "_self");
};
window.onload = () => {
  const register = document.getElementById("register-submit");
  register.onsubmit = (event) => {
    event.preventDefault();
    onRegister();
  };
};
