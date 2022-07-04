export const scaledValue = (value, originalServingCount, updatedServingCount) => {
  if (!updatedServingCount) return value;

  if (updatedServingCount === 0) return 0;

  if (originalServingCount !== updatedServingCount) {
    const multiplier = (updatedServingCount * 1.0) / (originalServingCount * 1.0);
    return +(value * multiplier).toFixed(2);
  } else {
    return +value.toFixed(2);
  }
};

export const ingredientDescription = (ingredient, originalServingCount, updatedServingCount) => {
  const { name, namePlural, unitSingular, unitPlural, value, description } = ingredient;

  const requiredValue = scaledValue(value, originalServingCount, updatedServingCount);

  const requiredName = requiredValue > 1 && namePlural ? namePlural : name;
  const requiredUnit = requiredValue > 1 && unitPlural ? unitPlural : unitSingular;
  const formattedDescription = description ? ` (${description})` : "";
  return `${requiredValue} ${requiredUnit} ${requiredName} ${formattedDescription}`;
};
