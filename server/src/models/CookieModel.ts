interface Cookie {
  maxAge: number | never,
  sameSite: string | never,
  httpOnly: boolean | never,
}

export { Cookie };