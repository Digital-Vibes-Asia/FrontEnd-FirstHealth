const genderObject = Object.freeze({
  0: "Male",
  1: "Female",
  default: "-",
});

const BooleanObject = Object.freeze({
  true: "Yes",
  false: "No",
  default: "-",
});

const RaceValue = [
  { value: "Indian",key: 1 },
  { value: "Malay" ,key: 1},
  { value: "Chinese",key: 1 },
  { value: "others",key: 0 },
];

export { genderObject, BooleanObject, RaceValue };
