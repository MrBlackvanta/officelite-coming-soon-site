export type Amount = { dollars: number; cents: number };

export type Price = Amount | string;

export type Plan = {
  name: string;
  price: Price;
  note: string;
  features: string[];
  featured: boolean;
};

export function formatPrice(price: Price) {
  return typeof price === "string"
    ? price
    : `$${price.dollars}.${String(price.cents).padStart(2, "0")}`;
}

export const plans: Plan[] = [
  {
    name: "Basic",
    price: "Free",
    note: "Up to 5 users for free",
    features: [
      "Basic document collaboration",
      "2 GB storage",
      "Great security and support",
    ],
    featured: false,
  },
  {
    name: "Pro",
    price: { dollars: 9, cents: 99 },
    note: "Per user, billed monthly",
    features: [
      "All essential integrations",
      "50 GB storage",
      "More control and insights",
    ],
    featured: true,
  },
  {
    name: "Ultimate",
    price: { dollars: 19, cents: 99 },
    note: "Per user, billed monthly",
    features: ["Robust work management", "100 GB storage", "VIP support"],
    featured: false,
  },
];

export type Pack = {
  id: string;
  name: string;
  price: string;
};

export const packs: Pack[] = plans.map(({ name, price }) => ({
  id: name.toLowerCase(),
  name: `${name} Pack`,
  price: formatPrice(price),
}));
