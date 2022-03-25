import express from 'express';
import {IBigInterface, ISubInterface} from "../interfaces/example";

const app = express();
const port = 3000;

const usefulSubConstant: ISubInterface = {
    subProperty1: 1,
    subProperty2: "A test string",
    subProperty3: "this can be any type of variable"
};
const usefulConstant: IBigInterface = {
    property1: usefulSubConstant,
    property2: []
};

console.log(usefulConstant?.property1?.subProperty2);

app.listen(port, () => {
    console.log(`Timezones by location application is running on port ${port}.`);
});