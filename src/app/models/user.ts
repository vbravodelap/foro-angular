export class User {
    constructor(
        // tslint:disable-next-line: variable-name
        public _id: string,
        public name: string,
        public surname: string,
        public email: string,
        public password: string,
        public image: string,
        public role: string
    ) {}
}
