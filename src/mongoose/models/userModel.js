const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { ALL_USER_ROLES, USER_ROLE } = require('../../config/users/roles/roles')

const userSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    avatar: {
      type: String,
      required: true,
      default: '/public/assets/img/avatars/avatar.jpg',
    },
    name: {
      type: String,
    },
    lastName: {
      type: String,
    },
    dni: {
      type: String,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isDefaultPassword: {
      type: Boolean,
      required: true,
      default: true,
    },
    role: {
      type: String,
      enum: ALL_USER_ROLES,
      required: true,
      default: USER_ROLE,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      required: true,
      default: 'active',
    },
    accountType: {
      type: String,
      enum: ['alias', 'cbu'],
    },
    accountValue: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

module.exports = User
