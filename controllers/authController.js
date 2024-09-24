import { registerSchema, loginSchema } from '../validator/authValidators.js'
import authService from '../services/authService.js'
import { findUserByEmail } from '../validator/EmailValidation.js'

const registerUser = async (req, res) => {
  const { error } = registerSchema.validate(req.body)
  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }

  try {
    const { email } = req.body // Only get email

    const existingUser = await findUserByEmail(email)
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' })
    }

    const user = await authService.registerUser(req.body)
    res.status(201).json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// const registerAdmin = async (req, res) => {
//   const { error } = registerSchema.validate(req.body);
//   if (error) {
//     return res.status(400).json({ message: error.details[0].message });
//   }

//   try {
//     const { email } = req.body;

//     const existingUser = await findUserByEmail(email);
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already in use' });
//     }

//     const user = await authService.registerAdmin(req.body);
//     res.status(201).json(user);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const login = async (req, res) => {
  const { error } = loginSchema.validate(req.body)
  if (error) return res.status(400).json({ message: error.details[0].message })

  try {
    const { email, password } = req.body

    const { user, token } = await authService.login({ email, password })
    res.json({ user, token })
  } catch (err) {
    res.status(401).json({ message: err.message })
  }
}

export default {
  registerUser,
  // sregisterAdmin,
  login,
}
