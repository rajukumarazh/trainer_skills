// Conditional Object: returns the object if condition is true, else an empty object (or falseObject)
export const condObj = (condition, trueObject, falseObject = {}) =>
  condition ? trueObject : falseObject;

// Returns an empty string for falsy values
export const _es = (s) => s || "";

// Returns that value if not a function, else returns the output of the function
export const resolveValue = (val) => {
  if (typeof val === "function") return val();
  else return val;
};

// extracts value from input event
export const wireEventValue = (func) => (e) => func(e.target.value);

// updates the values of the first object with the values of the second object
export const updateObject = (target, ref) => {
  Object.keys(ref).map((refKey) => {
    target[refKey] = ref[refKey];
  });
};
