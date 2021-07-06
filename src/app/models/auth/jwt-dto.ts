export class JwtDto {
    token: string | undefined;
    type: string | undefined;
    userName: string | undefined;
    authorities: string[] = [];
}
