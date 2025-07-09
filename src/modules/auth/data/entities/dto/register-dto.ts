export interface RegisterDto {
    email: string;
    password: string;
    platform: 'GOOGLE' | 'CREDENTIAL';
    role: 'ADMIN' | 'USER';
}