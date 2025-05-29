const users = {
  john_doe: { name: "John Doe", age: 30 },
  jane_doe: { name: "Jane Doe", age: 28 },
};

async function getUserProfile(username) {
  if (!username) throw new Error("Username is required");

  await new Promise((r) => setTimeout(r, 200));
  const user = users[username];
  if (!user) throw new Error("User not found");

  return user;
}

module.exports = { getUserProfile };
