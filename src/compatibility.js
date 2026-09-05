export function evaluateCompatibility(residents, dishes, budget) {
  // 1. Validate budget
  if (!Number.isInteger(budget) || budget <= 0) {
    return {
      errors: [{ code: 'INVALID_INPUT', table: 'budget', row: null, field: 'budget' }],
      compatible: [],
      exclusions: [],
      count: 0
    };
  }

  const seenDishIds = new Set();

  // 2. Validate dishes
  for (const dish of dishes) {
    if (seenDishIds.has(dish.id)) {
      return {
        errors: [{ code: 'DUPLICATE_DISH_ID', table: 'dish', row: dish.id, field: 'id' }],
        compatible: [],
        exclusions: [],
        count: 0
      };
    }
    seenDishIds.add(dish.id);

    if (!Number.isInteger(dish.price) || dish.price <= 0) {
      return {
        errors: [{ code: 'INVALID_INPUT', table: 'dish', row: dish.id, field: 'price' }],
        compatible: [],
        exclusions: [],
        count: 0
      };
    }
  }

  const result = {
    errors: [],
    compatible: [],
    exclusions: [],
    count: 0
  };

  // 3. Core Logic
  for (const dish of dishes) {
    const reasons = [];

    // Outer loop MUST be the resident to maintain resident-table ordering
    for (const resident of residents) {

      // A. Check diet first for this resident
      if (resident.diet === 'VEGAN' && dish.dietClass !== 'VEGAN') {
        reasons.push(`DIET:${resident.name}`);
      } else if (resident.diet === 'VEGETARIAN' && dish.dietClass !== 'VEGAN' && dish.dietClass !== 'VEGETARIAN') {
        reasons.push(`DIET:${resident.name}`);
      }

      // B. Check allergens for this resident (looping dish tags to maintain tag order)
      if (dish.tags && Array.isArray(dish.tags)) {
        for (const tag of dish.tags) {
          if (resident.allergens && Array.isArray(resident.allergens) && resident.allergens.includes(tag)) {
            reasons.push(`ALLERGEN:${resident.name}:${tag}`);
          }
        }
      }
    }

    // C. Check budget (MUST be the last reason)
    if (dish.price > budget) {
      reasons.push('OVER_BUDGET');
    }

    if (reasons.length > 0) {
      result.exclusions.push({
        dishId: dish.id,
        reasons: reasons
      });
    } else {
      result.compatible.push(dish);
      result.count++; // Count of compatible dishes
    }
  }

  return result;
}