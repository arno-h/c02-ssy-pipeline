let totalByteCount = 0;

function increaseCount(message) {
    const bytes = message.bytes;
    totalByteCount += bytes;
}

function getByteCount() {
    return totalByteCount;
}

module.exports = {
    increaseCount,
    getByteCount
}