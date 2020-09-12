import { getTripLength } from "../src/client/js/fetchAPIs";

describe("Testing the submit functionality", () => {
    test("Testing the checkURL(url) function", () => {
        const input1 = new Date("2020-09-09");
        const input2 = new Date("2020-09-10");
        const output = 1;

        expect(getTripLength(input1, input2)).toEqual(output);    
    })
});