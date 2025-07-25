

export interface UpdateServiceCenterDto {
    name?: string;
    phone?: string;
    email?: string;
    locations?: UpdateServiceCenterLocationDto;
}

export interface UpdateServiceCenterLocationDto {
    address?: string;
    latitude?: number;
    longitude?: number;
    city?: string;
    state?: string;
    zip_code?: string;
    country?: string;
}

