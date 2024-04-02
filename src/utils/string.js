export function capitalizeFirstLetter(str) {
    if (str.indexOf(' ') === -1) {
        const firstLetter = str.charAt(0).toUpperCase();
        return firstLetter + str.slice(1);
    } else {
        return capitalizeWords(str);
    }
}

function capitalizeWords(str) {
    const words = str.split(' ');
    
    const capitalizedWords = words.map(word => {
        const firstLetter = word.charAt(0).toUpperCase();
        return firstLetter + word.slice(1);
    });
    
    return capitalizedWords.join(' ');
}