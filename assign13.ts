import assert from "assert";

type Employee = {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  salary: number;
};

const employees: Employee[] = [
  { firstName: "Molly", lastName: "Rojas", age: 38, email: "mollyrojas@plasmox.com", salary: 3065 },
  { firstName: "Marguerite", lastName: "Santiago", age: 27, email: "margueritesantiago@plasmox.com", salary: 2796 },
  { firstName: "Evelyn", lastName: "Oneil", age: 26, email: "evelynoneil@plasmox.com", salary: 3947 },
  { firstName: "Consuelo", lastName: "Case", age: 23, email: "consuelocase@plasmox.com", salary: 2819 },
  { firstName: "Earline", lastName: "Bush", age: 29, email: "earlinebush@plasmox.com", salary: 3494 },
  { firstName: "Sanford", lastName: "Hurley", age: 26, email: "sanfordhurley@plasmox.com", salary: 3068 },
  { firstName: "Todd", lastName: "Gomez", age: 33, email: "toddgomez@plasmox.com", salary: 3906 }
];

/**
 * Calculates the total salary of employees younger than 30.
 * @param employees - Array of employee objects
 * @returns Total salary
 */
function getTotalSalaryUnder30(employees: Employee[]): number {
  return employees
    .filter(emp => emp.age < 30)
    .reduce((sum, emp) => sum + emp.salary, 0);
}

const totalSalary = getTotalSalaryUnder30(employees);
assert.strictEqual(totalSalary, 16124);

/**
 * Returns full names of all employees.
 * @param employees - Array of employee objects
 * @returns Array of full names
 */
function getEmployeeFullNames(employees: Employee[]): string[] {
  return employees.map(emp => `${emp.firstName} ${emp.lastName}`);
}

const fullNames = getEmployeeFullNames(employees);
assert.deepStrictEqual(fullNames[0], "Molly Rojas");
assert.strictEqual(fullNames.length, employees.length);

/**
 * Returns all employee emails as a comma-separated string.
 * @param employees - Array of employee objects
 * @returns String of emails separated by commas
 */
function getEmailsString(employees: Employee[]): string {
  return employees.map(emp => emp.email).join(",");
}

const emails = getEmailsString(employees);

assert(emails.includes("mollyrojas@plasmox.com"));
assert.strictEqual(
  emails.split(",").length,
  employees.length
);