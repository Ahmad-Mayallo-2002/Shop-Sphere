const { faker } = require("@faker-js/faker");
const { writeFileSync } = require("fs");
const { Types } = require("mongoose");

function generateFakeProduct() {
  return {
    name: faker.commerce.productName(),
    image: faker.image.urlLoremFlickr({
      category: "product",
      width: 500,
      height: 500,
    }), // or faker.image.imageUrl()
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price({ min: 10, max: 500 })),
    discount: Number(
      faker.number.float({ min: 0, max: 50, precision: 0.1 }).toFixed(2)
    ),
    category: faker.commerce.department(),
    vendorId: new Types.ObjectId("67dab3b936083a70f5b9d777"),
    stock: faker.number.int({ min: 0, max: 100 }),
    brandName: faker.company.name(),
  };
}

// Example: Generate 5 fake products
const fakeProducts = Array.from({ length: 100 }, generateFakeProduct);

writeFileSync("./products.json", JSON.stringify(fakeProducts), {
  encoding: "utf-8",
});
