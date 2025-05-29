const users = {
  john_doe: { name: "John Doe", age: 30, city: "London" },
  mia_hobbs: { name: "Mia Hobbs", age: 28, city: "New York" },
  robert_smith: { name: "Robert Smith", age: 45, city: "Miami" },
  eleanor_reed: { name: "Eleanor Reed", age: 52, city: "London" },
  lukas_schwartz: { name: "Lukas Schwartz", age: 25, city: "Berlin" },
};

async function getUserProfile(username) {
  if (!username) throw new Error("Username is required");

  await new Promise((r) => setTimeout(r, 200));
  const user = users[username];
  if (!user) throw new Error("User not found");

  return user;
}

module.exports = { getUserProfile };
