const formatDate = (date) => {
    const newDate = new Date(date).toLocaleDateString("en-GB", {
        year: "2-digit",
        month: "long",
        day: "2-digit"
    });
    return newDate;
}

export default formatDate;