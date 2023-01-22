const renderFinancesInfo = (data) => {
  const totalItems = data.length;
  const receive = data
    .filter((item) => Number(item.value) > 0)
    .reduce((acc, item) => acc + Number(item.value), 0);
  const expenses = data
    .filter((item) => Number(item.value) < 0)
    .reduce((acc, item) => acc + Number(item.value), 0);
  const totalValue = receive + expenses;

  const valueCard1 = document.getElementById("value-card1");
  const textCard1 = document.createElement("h1");
  const total = document.createTextNode(totalItems);
  textCard1.classList = "mt-smaller";
  textCard1.appendChild(total);
  valueCard1.append(textCard1);

  const valueCard2 = document.getElementById("value-card2");
  const textCard2 = document.createElement("h1");
  const totalReceive = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(receive)
  );
  textCard2.classList = "mt-smaller";
  textCard2.appendChild(totalReceive);
  valueCard2.append(textCard2);

  const valueCard3 = document.getElementById("value-card3");
  const textCard3 = document.createElement("h1");
  const totalExpenses = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(expenses)
  );
  textCard3.classList = "mt-smaller";
  textCard3.appendChild(totalExpenses);
  valueCard3.append(textCard3);

  const valueCard4 = document.getElementById("value-card4");
  const textCard4 = document.createElement("h1");
  textCard4.style.color = "#5936cd";
  const value = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(totalValue)
  );
  textCard4.classList = "mt-smaller";
  textCard4.appendChild(value);
  valueCard4.append(textCard4);
};
const onLoadFinances = async () => {
  const email = localStorage.getItem("@WalletApp:Email");
  const date = "2022-12-15";
  const result = await fetch(
    `https://mp-wallet-app-api.herokuapp.com/finances?date=${date}`,
    {
      method: "GET",
      headers: {
        email: email,
      },
    }
  );
  const data = await result.json();
  renderFinancesInfo(data);
  return data;
};

const onLoadUserInfo = () => {
  const email = localStorage.getItem("@WalletApp:Email");
  const firstName = localStorage.getItem("@WalletApp:Name");

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
  const firstletter = document.createTextNode(
    firstName.charAt(0).toLocaleUpperCase()
  );
  type.appendChild(firstletter);
  navbarAvatar.appendChild(type);
};
window.onload = () => {
  onLoadUserInfo();
  onLoadFinances();
};
