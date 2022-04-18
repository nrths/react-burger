const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`)
    }
};

// кол-во ингредиентов?

const formatDate = (date) => {
    const orderDate = new Date(date)
    const today = new Date().getDate()
    
    const setDay = () => {
        if (orderDate.getDate() === today) {
            return 'Today'
        } else if ((orderDate.getDate() - today) === -1) {
            return 'Yesterday'
        } else {
            return `${(orderDate.getDate() - today * -1)} days ago`
        }
    }
    const minutes = () => {
        if (orderDate.getMinutes() <= 9) {
            return `0${orderDate.getMinutes()}`
        } else {
            return orderDate.getMinutes()
        }
    }
    const hours = () => {
        if (orderDate.getHours() <= 9) {
            return `0${orderDate.getHours()}`
        } else {
            return orderDate.getHours()
        }
    }
    const time = `${hours()}:${minutes()}`
    const day = `${setDay()}`
    const timezone = `i-GMT+${orderDate.getTimezoneOffset() * -1 / 60}`

    const formatted = `${day} ${time} ${timezone}`
    
    return formatted
}

const checkStatus = (status) => {
    switch (status) {
        case 'done':
            return 'Выполнен'
        case 'pending':
            return 'Готовится'
        case 'created':
            return 'Создан'
        // eslint-disable-next-line no-unused-expressions
        default: ''
    }
}



export { checkResponse, formatDate, checkStatus }