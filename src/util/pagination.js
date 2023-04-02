module.exports = {
  pagination: function (arr, numberPage, quantityItem) {
    let start = (numberPage - 1) * quantityItem;
    let end = (numberPage - 1) * quantityItem + quantityItem;
    return arr.slice(start, end);
  },
};
