export class NoteDetail {

    constructor(public deadLine: Date,
                public subject: string,
                public userId: number,
                public comment: string,
                public priority: string,
                public fromUserId: number,
                public toUserId: number,
                public instructionId: number) {
    }
}
