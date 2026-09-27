const cart = [
  { id: "P01", name: "Mechanical Keyboard", price: 1200000, quantity: 2, category: "Gear", inStock: true },
  { id: "P02", name: "Wireless Mouse", price: 450000, quantity: 1, category: "Gear", inStock: false },
  { id: "P03", name: "24-inch Monitor", price: 3500000, quantity: 1, category: "Monitor", inStock: true },
  { id: "P04", name: "Gaming Headset", price: 800000, quantity: 3, category: "Audio", inStock: true },
  { id: "P05", name: "XL Mousepad", price: 250000, quantity: 5, category: "Gear", inStock: true }
];

// MAP()
const newCart = cart.map(item => ({
    name: item.name,
    total: item.price * item.quantity
}));

// FILTER()
const instockItems = cart.filter(item => item.inStock);

// REDUCE()
const totalPrice = newCart.reduce((acc, item) => acc + item.total, 0);

console.log(newCart);
console.log(instockItems);
console.log(totalPrice);
