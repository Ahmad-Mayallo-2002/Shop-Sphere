const { faker } = require("@faker-js/faker");

const users = [];

// Function to generate a valid email
const generateEmail = () => {
  const name = faker.person.firstName().toLowerCase();
  const number = faker.number.int({ min: 1, max: 9999 });
  return `${name}${number}@gmail.com`;
};

// Function to generate 100 users
const generateUsers = async () => {
  for (let i = 0; i < 100; i++) {
    const role = faker.helpers.arrayElement(["user", "vendor"]); // No "admin"
    const user = {
      username: faker.person.firstName(),
      email: generateEmail(),
      password: faker.internet.password(),
      phone: faker.phone.number("+1-###-###-####"),
      country: faker.location.country(),
      role,
    };
    if (role === "vendor") {
      user.shopName = faker.company.name();
      user.shopDescription = faker.lorem.sentence();
    }
    users.push(user);
  }
};

generateUsers();
