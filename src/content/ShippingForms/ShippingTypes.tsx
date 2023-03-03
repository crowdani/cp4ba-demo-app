export interface shippingRequest{
    Customer: string;
    Shipment: Shipment;
    Method: Method;
    Distance: number

}

export interface Shipment{
    weight: number;
    size: string;
}
export interface Method{
    pickup: string;
    transport: string;
    nextDay: boolean;
}

export interface pricing{
    __DecisionID__: string;
    Price: number;
  }