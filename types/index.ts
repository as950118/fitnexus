export interface Member {
  id: string;
  name: string;
  phone: string;
  email: string;
  joinDate: string;
  trainerId: string;
  trainerName: string;
  status: "active" | "inactive" | "suspended";
  membershipType: "monthly" | "quarterly" | "yearly";
}

export interface Trainer {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  totalReviews: number;
}

export interface Review {
  id: string;
  memberId: string;
  memberName: string;
  trainerId: string;
  trainerName: string;
  rating: number;
  comment: string;
  date: string;
}
