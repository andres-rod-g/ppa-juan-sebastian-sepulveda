import 'dotenv/config'

export const CLIENT_URL = process.env.CLIENT_URL ?? ""

export const ENVIRONMENT = process.env.ENVIRONMENT ?? ""

export const ELEVATE_MASTER_KEY = process.env.ELEVATE_MASTER_KEY ?? ""
export const JWT_SECRET = process.env.JWT_SECRET ?? ""
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET ?? ""

export const MONGODB_URI = process.env.MONGODB_URI ?? ""

