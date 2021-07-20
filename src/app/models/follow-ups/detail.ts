export class Detail {
    constructor(public deadLine: Date,
        public comment: string,
        public priority: string,
        public fromUserId: number,
        public toUserId: number,
        public idInstruction: number) {}
}
