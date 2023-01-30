const clickExit = () => {
  localStorage.clear;
  window.open("../index.html", "_self");
};
const onDeleteItems = async (id) => {
  try {
    const email = localStorage.getItem("@WalletApp:Email");
    await fetch(`https://mp-wallet-app-api.herokuapp.com/finances/${id}`, {
      method: "DELETE",
      headers: {
        email: email,
      },
    });
    onLoadFinances();
  } catch (error) {
    alert("Erro ao deletar item");
  }
};
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
      option.id = `category_${category.id}`;
      option.value = category.id;
      option.appendChild(name);
      selectId.append(option);
    });
  } catch (error) {
    alert("Erro ao exibir categorias");
  }
};
const tableItems = (data) => {
  const table = document.getElementById("items-table");
  table.innerHTML = "";

  const titleSubText = document.createTextNode("Titulo");
  const titleSubTextElement = document.createElement("th");
  titleSubTextElement.appendChild(titleSubText);
  table.appendChild(titleSubTextElement);

  const categorySubText = document.createTextNode("Categoria");
  const categorySubTextElement = document.createElement("th");
  categorySubTextElement.appendChild(categorySubText);
  table.appendChild(categorySubTextElement);

  const dateSubText = document.createTextNode("Data");
  const dateSubTextElement = document.createElement("th");
  dateSubTextElement.appendChild(dateSubText);
  table.appendChild(dateSubTextElement);

  const valueSubText = document.createTextNode("Valor");
  const valueSubTextElement = document.createElement("th");
  valueSubTextElement.className = "center";
  valueSubTextElement.appendChild(valueSubText);
  table.appendChild(valueSubTextElement);

  const actionSubText = document.createTextNode("Ação");
  const actionSubTextElement = document.createElement("th");
  actionSubTextElement.className = "right";
  actionSubTextElement.appendChild(actionSubText);
  table.appendChild(actionSubTextElement);

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

    const deleteTd = document.createElement("td");
    deleteTd.onclick = () => onDeleteItems(item.id);
    deleteTd.className = "right";

    const itemExcludes = document.createElement("img");
    itemExcludes.src = "../src/image/trash-icon.png";
    itemExcludes.style.cursor = "pointer";
    itemExcludes.className = "image-trash";
    deleteTd.appendChild(itemExcludes);
    tableTr.appendChild(deleteTd);
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
  valueCard1.innerHTML = "";
  const totalSubtext = document.createTextNode("Total de lançamentos");
  const totalSubtextElement = document.createElement("h3");
  totalSubtextElement.appendChild(totalSubtext);
  valueCard1.appendChild(totalSubtextElement);
  const textCard1 = document.createElement("h1");
  textCard1.id = "textCard1";
  textCard1.style.color = "#5936cd";
  const total = document.createTextNode(totalItems);
  textCard1.classList = "mt-smaller";
  textCard1.appendChild(total);
  valueCard1.append(textCard1);

  const valueCard2 = document.getElementById("value-card2");
  valueCard2.innerHTML = "";
  const receiveSubtext = document.createTextNode("Receitas");
  const receiveSubtextElement = document.createElement("h3");
  receiveSubtextElement.appendChild(receiveSubtext);
  valueCard2.appendChild(receiveSubtextElement);

  const textCard2 = document.createElement("h1");
  textCard2.id = "textCard2";
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
  valueCard3.innerHTML = "";
  const expensesSubtext = document.createTextNode("Despesas");
  const expensesSubtextElement = document.createElement("h3");
  expensesSubtextElement.appendChild(expensesSubtext);
  valueCard3.appendChild(expensesSubtextElement);

  const textCard3 = document.createElement("h1");
  textCard3.id = "textCard3";
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
  valueCard4.innerHTML = "";
  const balanceSubtext = document.createTextNode("Balanço");
  const balanceSubtextElement = document.createElement("h3");
  balanceSubtextElement.appendChild(balanceSubtext);
  valueCard4.appendChild(balanceSubtextElement);
  const textCard4 = document.createElement("h1");
  textCard4.id = "textCard4";
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
  link.onclick = () => {
    clickExit();
  };

  link.appendChild(exit);
  navbarUserInfo.appendChild(link);

  const type = document.createElement("h3");
  const firstletter = document.createTextNode(
    firstName.charAt(0).toLocaleUpperCase()
  );
  type.appendChild(firstletter);
  navbarAvatar.appendChild(type);
};

const pageClosed = () => {
  const element = document.getElementById("modal");
  element.style.display = "none";
};
const pageOpen = () => {
  const element = document.getElementById("modal");
  element.style.display = "flex";
};
const onFinanceApi = async (data) => {
  try {
    const email = localStorage.getItem("@WalletApp:Email");
    const response = await fetch(
      "https://mp-wallet-app-api.herokuapp.com/finances",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          email: email,
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
const onFinanceRelease = async (target) => {
  try {
    const title = target[0].value;
    const value = Number(target[1].value);
    const date = target[2].value;
    const category = Number(target[3].value);
    const result = await onFinanceApi({
      title,
      value,
      date,
      category_id: category,
    });

    if (result.error) {
      alert("Erro ao cadastrar novo dado financeiro");
      return;
    }
    onLoadFinances();
    pageClosed();
  } catch (error) {
    alert("Erro ao cadastrar novo dado financeiro");
  }
};

window.onload = () => {
  onLoadUserInfo();
  onLoadFinances();
  onLoadCategories();
  pageClosed();
  const form = document.getElementById("category-items");
  form.onsubmit = (event) => {
    event.preventDefault();
    onFinanceRelease(event.target);
  };
};
