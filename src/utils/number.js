export const formatNumber = (num) => {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, '$1.');
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, '$1.');
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, '$1.');
    }
    return num.toString();
}