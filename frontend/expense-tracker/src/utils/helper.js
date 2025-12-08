import moment from "moment";

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export const getInitials = (name) => {
    if(!name) return '';

    const words = name.split(' ');
    let initals = '';

    for(let i = 0; i < Math.min(words.length,2); i++) {
        initals += words[i][0];
    }

    return initals.toUpperCase();
}

export const addThousandsSeparators = (num) =>{
    if(num == null || isNaN(num)) return "";
    const [interPart , fractionalPart] = num.toString().split(".");
    const formattedInteger = interPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
}

export const preparedExpenseBarChartData = (data = []) => {
    const chartData = data.map((item) => ({category: item?.category , amount: item?.amount}));
    return chartData;
}

export const preparedIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  return sortedData.map((item) => ({
    month: moment(item.date).format("DD MMM"),
    amount: Number(item.amount),
    source: item.source,
  }));
};

export const preparedExpenseLinearChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  return sortedData.map((item) => ({
    month: moment(item.date).format("DD MMM"),
    amount: Number(item.amount),
    category: item.category,
  }));
}