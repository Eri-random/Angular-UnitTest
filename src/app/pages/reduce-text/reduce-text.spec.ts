import { ReduceTextPipe } from "./reduce-text.pipe"

describe('ReduceTextPipe',() =>{

    let pipe: ReduceTextPipe;

    beforeEach(() =>{
        pipe = new ReduceTextPipe();
    });

    it('should create', () =>{
        expect(pipe).toBeTruthy();
    })

    it('use transform correctly',() =>{
        const test = "hello this is a test to check the pipe";
        const newTest = pipe.transform(test,5);
        expect(newTest.length).toBe(5);
    })
})