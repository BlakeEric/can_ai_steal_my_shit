import { describe, expect, it } from "vitest";
import { partition } from "./partition";

describe("partition()", () => {
  it("correctly separates an array", () => {
    const users = [
      { user: "bill", age: 36, active: false },
      { user: "anna", age: 40, active: true },
      { user: "rob", age: 40, active: true },
    ];

    expect(partition(users, (user) => user.active)).toEqual([
      [users[1], users[2]],
      [users[0]],
    ]);

    const animals = [
      { user: "bowwow", type: "dog" },
      { user: "biscuit", type: "dog" },
    ];

    expect(partition(animals, (animal) => animal.type === "dog")).toEqual([
      [animals[0], animals[1]],
      [],
    ]);
  });
});
