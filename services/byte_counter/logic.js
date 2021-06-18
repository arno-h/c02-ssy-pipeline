let totalByteCount = 0;

function increaseCount(message) {
    const bytes = message.bytes;
    totalByteCount += bytes;
}

module.exports = {
    totalByteCount,
    increaseCount
}