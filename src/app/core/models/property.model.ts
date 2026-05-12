export interface Property {
  id?: string;
  title: string;
  description: string;
  price: number;
  location: string;
  distance: number;
  image_url: string;
  amenities: string[];
  owner_id: string;
  owner_phone?: string;
  created_at?: string;
}
