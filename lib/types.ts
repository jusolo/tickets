export interface CartItem {
  id: string;
  userId: string;
  eventId: number;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventVenue: string;
  eventCity: string;
  eventPrice: string;
  quantity: number;
}

export interface Event {
  id: number;
  title: string;
  comedian: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  price: string;
  image: string;
  category: string;
}
