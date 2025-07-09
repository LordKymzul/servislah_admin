export interface LoginDto {
    email: string;
    password: string;
    platform: 'GOOGLE' | 'CREDENTIAL';
    googleCode?: string;
}