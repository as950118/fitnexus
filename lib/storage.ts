import { Member, Trainer, Review } from "@/types";

const STORAGE_KEYS = {
  MEMBERS: "fitnexus_members",
  TRAINERS: "fitnexus_trainers",
  REVIEWS: "fitnexus_reviews",
};

export const storageService = {
  // Members
  getMembers: (): Member[] => {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(STORAGE_KEYS.MEMBERS);
    return data ? JSON.parse(data) : [];
  },

  saveMember: (member: Member): void => {
    const members = storageService.getMembers();
    const existingIndex = members.findIndex((m) => m.id === member.id);
    if (existingIndex >= 0) {
      members[existingIndex] = member;
    } else {
      members.push(member);
    }
    localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(members));
  },

  deleteMember: (id: string): void => {
    const members = storageService.getMembers().filter((m) => m.id !== id);
    localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(members));
  },

  // Trainers
  getTrainers: (): Trainer[] => {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(STORAGE_KEYS.TRAINERS);
    if (data) return JSON.parse(data);
    
    // 초기 트레이너 데이터
    const defaultTrainers: Trainer[] = [
      {
        id: "1",
        name: "김철수",
        specialty: "근력 트레이닝",
        experience: 5,
        rating: 0,
        totalReviews: 0,
      },
      {
        id: "2",
        name: "이영희",
        specialty: "다이어트",
        experience: 3,
        rating: 0,
        totalReviews: 0,
      },
      {
        id: "3",
        name: "박민수",
        specialty: "재활 운동",
        experience: 7,
        rating: 0,
        totalReviews: 0,
      },
    ];
    localStorage.setItem(STORAGE_KEYS.TRAINERS, JSON.stringify(defaultTrainers));
    return defaultTrainers;
  },

  // Reviews
  getReviews: (): Review[] => {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    return data ? JSON.parse(data) : [];
  },

  saveReview: (review: Review): void => {
    const reviews = storageService.getReviews();
    reviews.push(review);
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    
    // 트레이너 평점 업데이트
    const trainers = storageService.getTrainers();
    const trainer = trainers.find((t) => t.id === review.trainerId);
    if (trainer) {
      const trainerReviews = reviews.filter((r) => r.trainerId === review.trainerId);
      const avgRating = trainerReviews.reduce((sum, r) => sum + r.rating, 0) / trainerReviews.length;
      trainer.rating = Math.round(avgRating * 10) / 10;
      trainer.totalReviews = trainerReviews.length;
      localStorage.setItem(STORAGE_KEYS.TRAINERS, JSON.stringify(trainers));
    }
  },
};
