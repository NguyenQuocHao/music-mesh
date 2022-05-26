const HOST = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://mus1c-mesh.herokuapp.com/"
const CLIENT = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://mus1c-mesh.herokuapp.com/"

exports.HOST = HOST
exports.CLIENT = CLIENT