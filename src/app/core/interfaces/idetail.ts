export class IDetail {

    constructor(
        public fromRole: string,
        public fromUser: string,
        public toRole: string,
        public toUser: string,
        public date: Date,
        public instruction: string) {}
}
