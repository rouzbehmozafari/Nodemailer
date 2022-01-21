function random() {
    const randomSixDigitCode = Math.floor(Math.random() * 1000000)
    return randomSixDigitCode
}

module.exports = random