import bcrypt from 'bcrypt'
import User from '../models/user.js'
import { generateJwt } from '../helpers/generateToken.js'

const registerUser = async ({ email, password }) => {
  if (!email) {
    throw new Error('Email is required.')
  }
  if (!email.trim()) {
    throw new Error('Email cannot be empty.')
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const userData = {
    email,
    password: hashedPassword,
    role: 'user',
  }

  try {
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      throw new Error('User with the same email already exists.')
    }

    const user = await User.create(userData)

    return user
  } catch (error) {
    console.error('Error registering user:', error)
    throw new Error('User registration failed')
  }
}

// const registerAdmin = async ({ email, password }) => {
//   if (!email) {
//     throw new Error('Email is required.');
//   }
//   if (!email.trim()) {
//     throw new Error('Email cannot be empty.');
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const userData = {
//     email,
//     password: hashedPassword,
//     role: "admin"
//   };

//   try {
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       throw new Error('User with the same email already exists.');
//     }

//     const user = await User.create(userData);

//     return user;
//   } catch (error) {
//     console.error("Error registering admin:", error);
//     throw new Error('Admin registration failed');
//   }
// };

// Login User
const login = async ({ email, password }) => {
  if (!email) {
    throw new Error('Email is required.')
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('User not found')
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error('Invalid credentials')
  }

  const jwtToken = await generateJwt({ userId: user._id, role: user.role })

  return { user, token: jwtToken }
}

export default {
  registerUser,
  // registerAdmin,
  login,
}
