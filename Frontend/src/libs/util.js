const getUsername = () => {
  return localStorage.getItem('username')
}
module.exports = { getUsername }
