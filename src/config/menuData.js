/**
 * Menu Items and Category Definitions
 * Easily add, remove, or modify food items and prices here.
 */

export const CATEGORIES = [
  { id: 'all', label: 'All', fullName: 'All Items' },
  { id: 'coffee', label: 'Coffee', fullName: 'Artisan Coffee' },
  { id: 'burgers', label: 'Burgers', fullName: 'Burgers & Sandwiches' },
  { id: 'croissants', label: 'Croissants', fullName: 'Croissants & Bakery' },
  { id: 'desserts', label: 'Desserts', fullName: 'Decadent Desserts' },
  { id: 'coolers', label: 'Coolers', fullName: 'Chilled Coolers' }
];

export const MENU_ITEMS = [
  // COFFEE
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    category: 'coffee',
    price: 120,
    description: 'Rich and creamy coffee with velvety micro-foam and artisanal latte art.',
    shortDesc: 'Rich and creamy coffee',
    image: '/assets/cappuccino.jpg',
    badge: 'Bestseller',
    isVeg: true
  },
  {
    id: 'cafe-latte',
    name: 'Cafe Latte',
    category: 'coffee',
    price: 140,
    description: 'Freshly pulled espresso shot gently blended with smooth steamed milk.',
    shortDesc: 'Smooth and balanced espresso milk brew',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80',
    badge: 'Popular',
    isVeg: true
  },
  {
    id: 'cold-coffee',
    name: 'Cold Coffee',
    category: 'coffee',
    price: 150,
    description: 'Chilled signature espresso blended with creamy milk and rich vanilla ice cream.',
    shortDesc: 'Thick chilled creamy coffee',
    image: '/assets/hero-coffee.jpg',
    badge: 'Trending',
    isVeg: true
  },
  {
    id: 'caramel-macchiato',
    name: 'Caramel Macchiato',
    category: 'coffee',
    price: 160,
    description: 'Steamed milk with vanilla syrup, marked with espresso and decadent caramel drizzle.',
    shortDesc: 'Espresso with golden caramel drizzle',
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },

  // BURGERS & SANDWICHES
  {
    id: 'classic-burger',
    name: 'Classic Burger',
    category: 'burgers',
    price: 160,
    description: 'Juicy and delicious grilled patty layered with melted cheese, crisp lettuce & house relish.',
    shortDesc: 'Juicy and delicious',
    image: '/assets/classic-burger.jpg',
    badge: 'Chef Special',
    isVeg: true
  },
  {
    id: 'cheese-sandwich',
    name: 'Cheese Sandwich',
    category: 'burgers',
    price: 130,
    description: 'Golden-grilled artisanal sourdough packed with melted cheddar and gooey mozzarella.',
    shortDesc: 'Crisp sourdough with melted cheese',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
    badge: 'Comfort Pick',
    isVeg: true
  },
  {
    id: 'paneer-burger',
    name: 'Paneer Burger',
    category: 'burgers',
    price: 180,
    description: 'Crispy spiced paneer patty topped with chipotle glaze and pickled red onions in a brioche bun.',
    shortDesc: 'Crispy spiced paneer in brioche bun',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
    badge: 'Customer Fav',
    isVeg: true
  },
  {
    id: 'veg-club-sandwich',
    name: 'Veg Club Sandwich',
    category: 'burgers',
    price: 150,
    description: 'Triple-layer toasted sandwich stuffed with crisp cucumber, bell peppers, tomatoes & herb mayo.',
    shortDesc: 'Triple layer loaded cafe sandwich',
    image: 'https://images.unsplash.com/photo-1619860860774-1e2e17343432?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },

  // CROISSANTS & BAKERY
  {
    id: 'chocolate-croissant',
    name: 'Chocolate Croissant',
    category: 'croissants',
    price: 150,
    description: 'Buttery & rich golden puff pastry rolled with luscious Belgian dark chocolate batons.',
    shortDesc: 'Buttery & rich',
    image: '/assets/chocolate-croissant.jpg',
    badge: 'Bestseller',
    isVeg: true
  },
  {
    id: 'butter-croissant',
    name: 'Butter Croissant',
    category: 'croissants',
    price: 120,
    description: 'Authentic Parisian style crescent pastry with 36 delicate flaky, honey-golden butter layers.',
    shortDesc: 'Flaky authentic Parisian pastry',
    image: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'blueberry-muffin',
    name: 'Blueberry Muffin',
    category: 'croissants',
    price: 130,
    description: 'Moist vanilla bakery muffin bursting with whole wild blueberries and sugar crumble topping.',
    shortDesc: 'Moist baked wild berry muffin',
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'cinnamon-roll',
    name: 'Cinnamon Roll',
    category: 'croissants',
    price: 140,
    description: 'Warm spiral dough loaded with aromatic Ceylon cinnamon and creamy vanilla cheese glaze.',
    shortDesc: 'Glazed sweet cinnamon swirl',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },

  // DESSERTS
  {
    id: 'chocolate-brownie',
    name: 'Chocolate Brownie',
    category: 'desserts',
    price: 110,
    description: 'Rich chocolate delight baked with dark cocoa chunks and served warm with chocolate drizzle.',
    shortDesc: 'Rich chocolate delight',
    image: '/assets/chocolate-brownie.jpg',
    badge: 'Must Try',
    isVeg: true
  },
  {
    id: 'cheesecake',
    name: 'Cheesecake',
    category: 'desserts',
    price: 160,
    description: 'Classic creamy New York cheesecake over a crushed biscuit crust topped with wild berry coulis.',
    shortDesc: 'Velvety New York style slice',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80',
    badge: 'Premium',
    isVeg: true
  },
  {
    id: 'chocolate-waffle',
    name: 'Chocolate Waffle',
    category: 'desserts',
    price: 150,
    description: 'Crisp hot Belgian waffle loaded with warm melted chocolate sauce, choco chips and powdered sugar.',
    shortDesc: 'Crisp waffle with melted chocolate',
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'tiramisu-cup',
    name: 'Tiramisu Cup',
    category: 'desserts',
    price: 170,
    description: 'Italian ladyfingers soaked in our signature espresso, layered with whipped mascarpone & cocoa.',
    shortDesc: 'Italian espresso mascarpone treat',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },

  // COOLERS
  {
    id: 'fresh-lime-soda',
    name: 'Fresh Lime Soda',
    category: 'coolers',
    price: 80,
    description: 'Hand-squeezed key lime juice topped with effervescent soda water, mint, sweet and black salt.',
    shortDesc: 'Effervescent sweet & salty cooler',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'virgin-mojito',
    name: 'Virgin Mojito',
    category: 'coolers',
    price: 130,
    description: 'Crushed garden mint leaves, fresh lime chunks, pure cane sugar and chilled sparkling soda.',
    shortDesc: 'Crushed mint and lime refresher',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    badge: 'Cool Favorite',
    isVeg: true
  },
  {
    id: 'strawberry-cooler',
    name: 'Strawberry Cooler',
    category: 'coolers',
    price: 140,
    description: 'Fresh strawberry nectar muddled with mint leaves, basil seeds and crushed ice.',
    shortDesc: 'Fresh berry blend with crushed ice',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'peach-iced-tea',
    name: 'Peach Iced Tea',
    category: 'coolers',
    price: 120,
    description: 'Artisanal slow-brewed black tea lightly sweetened with juicy Georgia peach essence and lemon.',
    shortDesc: 'Chilled peach infused brew',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  }
];
