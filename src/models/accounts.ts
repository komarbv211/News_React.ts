export type RegisterField = {
    email: string;
    password: string;
    phoneNumber?: string;
    birthDate?: Date;
};

export type LoginField = {
    email: string;
    password: string;
    remember?: boolean;
};

export interface TokenPayload {
    id: string;
    email: string;
    birthDate?: Date;
}

export interface TokenPayloadItems {
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/dateofbirth"?: string;
}