const checkResponse = async (res: Response) => {
  const body = await res.json();
  if (res.ok) {
    return body;
  }
  return Promise.reject(body);
};

const formatDate = (date: string) => {
  const orderDate = new Date(date);
  const today = new Date().getDate();
  
  const setDay = () => {
    if (orderDate.getDate() === today) {
      return "Today";
    } else if (orderDate.getDate() - today === -1) {
      return "Yesterday";
    } else {
      if (orderDate.getMonth() === new Date().getMonth()) return `${today - orderDate.getDate()} days ago`;
      else if (orderDate.getMonth() !== new Date().getMonth()) return `${orderDate.getDate()}-${orderDate.getMonth() + 1}-${orderDate.getUTCFullYear()}`;
    }
  };
  const minutes = () => {
    if (orderDate.getMinutes() <= 9) {
      return `0${orderDate.getMinutes()}`;
    } else {
      return orderDate.getMinutes();
    }
  };
  const hours = () => {
    if (orderDate.getHours() <= 9) {
      return `0${orderDate.getHours()}`;
    } else {
      return orderDate.getHours();
    }
  };
  const time = `${hours()}:${minutes()}`;
  const day = `${setDay()}`;
  const timezone = `i-GMT+${(orderDate.getTimezoneOffset() * -1) / 60}`;

  const formatted = `${day} ${time} ${timezone}`;

  return formatted;
};

const checkStatus = (status: string) => {
  switch (status) {
    case "done":
      return "Выполнен";
    case "pending":
      return "Готовится";
    case "created":
      return "Создан";
  }
};

export { checkResponse, formatDate, checkStatus };
