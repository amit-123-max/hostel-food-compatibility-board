export const initialBudget = 150;

export const initialResidents = [
  { id: 'R1', name: 'Asha', diet: 'VEGAN', allergens: [] },
  { id: 'R2', name: 'Dev', diet: 'VEGETARIAN', allergens: ['PEANUT'] },
  { id: 'R3', name: 'Mira', diet: 'NO_RESTRICTION', allergens: ['MILK'] }
];

export const initialDishes = [
  { id: 'D01', cafe: 'Hostel Cafe', name: 'Lentil Rice Bowl', dietClass: 'VEGAN', tags: ['LENTIL', 'RICE', 'SPINACH'], price: 110 },
  { id: 'D02', cafe: 'Library Cafe', name: 'Tomato Pasta', dietClass: 'VEGAN', tags: ['WHEAT', 'TOMATO'], price: 150 },
  { id: 'D03', cafe: 'Hostel Cafe', name: 'Paneer Wrap', dietClass: 'VEGETARIAN', tags: ['MILK', 'WHEAT'], price: 140 },
  { id: 'D04', cafe: 'East Cafe', name: 'Peanut Noodles', dietClass: 'VEGAN', tags: ['PEANUT', 'WHEAT'], price: 130 },
  { id: 'D05', cafe: 'Library Cafe', name: 'Egg Sandwich', dietClass: 'NON_VEGETARIAN', tags: ['EGG', 'WHEAT'], price: 100 }
];
