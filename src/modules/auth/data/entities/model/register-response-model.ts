export interface RegisterResponseModel {
    user_id: string;
    email: string;
    backend_tokens: {
        access_token: string;
        refresh_token: string;
    }
}