type Excludes = {
  options: string[];
  property: string;
}

export const formatExculdesToObjects = (excludesList: Excludes[][]): ({[key: string]: string[]}[]) => {
  const toCheck = excludesList.map(validationRules => {
    const obj: {[key: string]: string[]} = {};
    validationRules.map(rule => obj[rule.property] = rule.options);
    return obj;
  });
  return toCheck;
}

export const findRelevantRules = (property: string, selectedOption: string, excludesList: Excludes[][]) => {
  const formatedList = formatExculdesToObjects(excludesList);
  const potentialMatch = formatedList.filter(settings => Object.keys(settings).includes(property));
  const results = potentialMatch.filter(rule => rule[property].includes(selectedOption));
  return results;
}
