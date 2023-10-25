export const getTime = (createdAt) => {
    const dateString = createdAt;
    const date = new Date(dateString);

    // Options for formatting the time with hours, minutes, and AM/PM
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };

    // Convert the date to a human-readable time string
    const humanReadableTime = date.toLocaleTimeString('en-US', options);
    return humanReadableTime;
}