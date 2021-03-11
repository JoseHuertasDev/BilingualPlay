export class GenericResult<T> {

  public value: T | undefined;

  errors: Array<string>;

  constructor() {
    this.errors = new Array<string>();
  }


  success(): boolean{
    return this.errors.length > 0;
  }

  addRange(range: Array<string>){
    this.errors.concat(range);
  }


  AddError(error: string): void
  {
    this.errors.push(error);
  }
}


