// with time even the seconds if present
const dateTimeFormatter = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
}

export { dateTimeFormatter };