const text = (window.onload = () => {
  const email = localStorage.getItem("@WalletApp:Email");
  const firstName = localStorage
    .getItem("@WalletApp:Name")
    .charAt(0)
    .toLocaleUpperCase();
  const navbarAvatar = document.getElementById("navbar-logo-avatar");
  const navbarUserInfo = document.getElementById("navbar-container");

  const create = document.createElement("p");
  const login = document.createTextNode(email);
  create.appendChild(login);
  navbarUserInfo.appendChild(create);

  const link = document.createElement("a");
  const exit = document.createTextNode("sair");
  link.appendChild(exit);
  navbarUserInfo.appendChild(link);

  const type = document.createElement("h3");
  const firstletter = document.createTextNode(firstName);
  type.appendChild(firstletter);
  navbarAvatar.appendChild(type);
});
