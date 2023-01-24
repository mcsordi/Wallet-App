const onLoadCategories = async () => {
  const selectId = document.getElementById("item-category");
  const result = await fetch(
    "https://mp-wallet-app-api.herokuapp.com/categories"
  );
  const resultJson = await result.json();
  try {
    resultJson.map((category) => {
      const option = document.createElement("option");
      const name = document.createTextNode(category.name);
      name.id = `category_${category.id}`;
      name.value = category.id;
      option.appendChild(name);
      selectId.append(option);
    });
  } catch (error) {
    alert("Erro ao exibir categorias");
  }
};
const tableItems = (data) => {
  const table = document.getElementById("items-table");

  data.map((item) => {
    const tableTr = document.createElement("tr");

    const itemTable = document.createElement("td");
    const title = document.createTextNode(item.title);
    itemTable.appendChild(title);
    tableTr.appendChild(itemTable);

    const itemCategory = document.createElement("td");
    const Category = document.createTextNode(item.name);
    itemCategory.appendChild(Category);
    tableTr.appendChild(itemCategory);

    const itemData = document.createElement("td");
    const date = document.createTextNode(
      new Date(item.date).toLocaleDateString()
    );
    itemData.appendChild(date);
    tableTr.appendChild(itemData);

    const itemValue = document.createElement("td");

    const value = document.createTextNode(
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(item.value)
    );
    if (item.value < 0) {
      itemValue.style.color = "#c50000";
    } else if (item.value > 0) {
      itemValue.style.color = "#239d60";
    }
    itemValue.className = "center";
    itemValue.appendChild(value);
    tableTr.appendChild(itemValue);

    const itemexcludes = document.createElement("td");
    const exclude = document.createTextNode("Excluir");
    itemexcludes.className = "right";
    itemexcludes.appendChild(exclude);
    tableTr.appendChild(itemexcludes);

    table.appendChild(tableTr);
  });
};

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
  textCard1.style.color = "#5936cd";
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
  if (receive > 0) {
    textCard2.style.color = "#239d60";
  } else if (receive === 0) {
    textCard2.style.color = "#010400";
  }
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
  if (expenses < 0) {
    textCard3.style.color = "#c50000";
  } else if (expenses === 0) {
    textCard3.style.color = "#010400";
  }
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
  tableItems(data);
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

  pageClosed = () => {
    const element = document.getElementById("modal");
    element.style.display = "none";
  };
  pageOpen = () => {
    const element = document.getElementById("modal");
    element.style.display = "flex";
  };
};

window.onload = () => {
  onLoadUserInfo();
  onLoadFinances();
  pageClosed();
  onLoadCategories();
};
