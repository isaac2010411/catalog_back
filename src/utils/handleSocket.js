const usersConnected = []
const adminConnected = []

const handleSocket = (socket) => {
  socket.on('user-connected', (user) => {
    const userId = user._id
    const isAdmin = user.role === 'administrator' || user.role === 'superadministrator'
    const socketId = socket.id

    if (isAdmin) {
      socket.join('admin')
    } else {
      socket.join('user')
    }

    const personExist = usersConnected.find((person) => person.userId === userId)
    const adminExist = adminConnected.find((person) => person.userId === userId)

    if (!personExist) {
      usersConnected.push({ socketId, userId })
    }
  })

  socket.on('disconnect', () => {
    const userIndex = usersConnected.findIndex((person) => person.socketId === socket.id)
    const adminIndex = adminConnected.findIndex((person) => person.socketId === socket.id)

    if (userIndex !== -1) {
      //delete user to array of connected
      usersConnected.splice(userIndex, 1)
      socket.in('user').emit('user-disconnected', { userIndex, usersConnected })
    }

    if (adminIndex !== -1) {
      //delete user to array of connected
      adminConnected.splice(adminIndex, 1)
      socket.in('admin').emit('user-disconnected', { adminIndex, adminConnected })
    }
  })
}

module.exports = {
  handleSocket,
  usersConnected,
  adminConnected,
}
