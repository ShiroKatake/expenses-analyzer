import { stringToDate } from "./stringToDate";

describe("String To Date", () => {
  it("should work with DD-MMM-YYYY", () => {
    expect(stringToDate("16-Apr-2020")).toBe("16/04/2020");
  });

  it("should not work with these edge cases", () => {
    expect(stringToDate("31/02/2020")).toBe("");
    expect(stringToDate("no Format")).toBe("");
  });
});
