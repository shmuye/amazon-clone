export const getUserName = (user) => {
  if (!user?.email) return null;

  const atIndex = user.email.indexOf("@");
  return atIndex === -1 ? user.email : user.email.substring(0, atIndex);
};
