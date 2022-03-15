export class UploadDetail {

    constructor(
        public userId: number,
        public contractCode: string,
        public subject: string,
        public priority: string,
        public days: number,
        public deadLine: Date,
        public instructionId: number,
        public fromUserId: number,
        public toUserId: number,
        public documents: string[]
    ){}
}
