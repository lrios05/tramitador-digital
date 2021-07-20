export class Note {

    constructor(
        public noteId: number,
        public sequence: number,
        public year: number,
        public subject: string,
        public status: string,
        public userId: number
        ) {}
}
