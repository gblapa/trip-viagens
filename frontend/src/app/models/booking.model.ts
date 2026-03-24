export interface BookingRequest {
    packageId: number;
}

export interface BookingResponse {
    id: number;
    userName: string;
    userEmail: string;
    packageName: string;
    bookingDate: string;
    status: string;
}
