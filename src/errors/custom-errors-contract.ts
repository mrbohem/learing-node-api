export abstract class CustomErrorContract extends Error {
    abstract statusCode: number;

    constructor(message: string) {
      super(message);
  
      Object.setPrototypeOf(this, CustomErrorContract.prototype);
    }
  
    abstract serializeErrors(): { message: string; field?: string }[];
}