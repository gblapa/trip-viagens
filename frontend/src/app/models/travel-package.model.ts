export interface TravelPackage {
    id: number;
    name: string;
    destination: string;
    description: string;
    priceInReais: number;
    durationDays: number;
    imageUrl: string;
    availableSlots: number;
}
