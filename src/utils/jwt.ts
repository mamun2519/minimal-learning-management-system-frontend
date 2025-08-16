export const DecodedData = (token: string) => {
  return jwtDecode(token);
};
