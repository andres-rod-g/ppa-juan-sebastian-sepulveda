import UserModel from '@/models/user.model'; // Asumiendo que tienes un modelo para usuarios
import bcrypt from "bcrypt"

const login = async (email: string, password: string) => {
  const user = await UserModel.findOne({email: email})

  console.log("User email in login: ", email)
  console.log('User Password', password)
  
    if (!user) { // Deberías hacer hashing de la contraseña
      return null;
    }

  const comp = await bcrypt.compare(password, user!.password)

  if (!comp) {
    return null
  }

  return user;
};

export default {
  login,
};
