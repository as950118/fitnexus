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
    if (data) return JSON.parse(data);
    
    // 초기 회원 데이터
    const defaultMembers: Member[] = [
      {
        id: "1",
        name: "홍길동",
        phone: "010-1234-5678",
        email: "hong@example.com",
        joinDate: new Date(2024, 0, 15).toISOString(),
        trainerId: "1",
        trainerName: "김철수",
        status: "active",
        membershipType: "monthly",
      },
      {
        id: "2",
        name: "김영수",
        phone: "010-2345-6789",
        email: "kim@example.com",
        joinDate: new Date(2024, 1, 20).toISOString(),
        trainerId: "2",
        trainerName: "이영희",
        status: "active",
        membershipType: "quarterly",
      },
      {
        id: "3",
        name: "이민지",
        phone: "010-3456-7890",
        email: "lee@example.com",
        joinDate: new Date(2024, 2, 10).toISOString(),
        trainerId: "3",
        trainerName: "박민수",
        status: "active",
        membershipType: "yearly",
      },
      {
        id: "4",
        name: "박준호",
        phone: "010-4567-8901",
        email: "park@example.com",
        joinDate: new Date(2024, 0, 5).toISOString(),
        trainerId: "1",
        trainerName: "김철수",
        status: "active",
        membershipType: "monthly",
      },
      {
        id: "5",
        name: "최수진",
        phone: "010-5678-9012",
        email: "choi@example.com",
        joinDate: new Date(2024, 1, 28).toISOString(),
        trainerId: "4",
        trainerName: "최지은",
        status: "active",
        membershipType: "quarterly",
      },
      {
        id: "6",
        name: "정태영",
        phone: "010-6789-0123",
        email: "jung@example.com",
        joinDate: new Date(2023, 11, 15).toISOString(),
        trainerId: "5",
        trainerName: "정대현",
        status: "inactive",
        membershipType: "monthly",
      },
      {
        id: "7",
        name: "한미라",
        phone: "010-7890-1234",
        email: "han@example.com",
        joinDate: new Date(2024, 2, 1).toISOString(),
        trainerId: "6",
        trainerName: "한소영",
        status: "active",
        membershipType: "yearly",
      },
      {
        id: "8",
        name: "윤서연",
        phone: "010-8901-2345",
        email: "yoon@example.com",
        joinDate: new Date(2024, 0, 22).toISOString(),
        trainerId: "2",
        trainerName: "이영희",
        status: "active",
        membershipType: "monthly",
      },
      {
        id: "9",
        name: "강동원",
        phone: "010-9012-3456",
        email: "kang@example.com",
        joinDate: new Date(2023, 10, 10).toISOString(),
        trainerId: "3",
        trainerName: "박민수",
        status: "suspended",
        membershipType: "quarterly",
      },
      {
        id: "10",
        name: "송하늘",
        phone: "010-0123-4567",
        email: "song@example.com",
        joinDate: new Date(2024, 1, 14).toISOString(),
        trainerId: "4",
        trainerName: "최지은",
        status: "active",
        membershipType: "monthly",
      },
      {
        id: "11",
        name: "임재현",
        phone: "010-1122-3344",
        email: "lim@example.com",
        joinDate: new Date(2024, 2, 5).toISOString(),
        trainerId: "5",
        trainerName: "정대현",
        status: "active",
        membershipType: "quarterly",
      },
      {
        id: "12",
        name: "오지은",
        phone: "010-2233-4455",
        email: "oh@example.com",
        joinDate: new Date(2024, 0, 30).toISOString(),
        trainerId: "6",
        trainerName: "한소영",
        status: "active",
        membershipType: "yearly",
      },
    ];
    localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(defaultMembers));
    return defaultMembers;
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
    let trainers: Trainer[];
    
    if (data) {
      trainers = JSON.parse(data);
    } else {
      // 초기 트레이너 데이터
      trainers = [
        {
          id: "1",
          name: "김철수",
          specialty: "근력 트레이닝",
          experience: 8,
          rating: 0,
          totalReviews: 0,
        },
        {
          id: "2",
          name: "이영희",
          specialty: "다이어트 & 체형관리",
          experience: 5,
          rating: 0,
          totalReviews: 0,
        },
        {
          id: "3",
          name: "박민수",
          specialty: "재활 운동 & 스포츠 트레이닝",
          experience: 10,
          rating: 0,
          totalReviews: 0,
        },
        {
          id: "4",
          name: "최지은",
          specialty: "요가 & 필라테스",
          experience: 6,
          rating: 0,
          totalReviews: 0,
        },
        {
          id: "5",
          name: "정대현",
          specialty: "크로스핏 & 기능성 운동",
          experience: 4,
          rating: 0,
          totalReviews: 0,
        },
        {
          id: "6",
          name: "한소영",
          specialty: "프리웨이트 & 바디빌딩",
          experience: 7,
          rating: 0,
          totalReviews: 0,
        },
      ];
      localStorage.setItem(STORAGE_KEYS.TRAINERS, JSON.stringify(trainers));
    }
    
    // 리뷰 데이터를 기반으로 평점 계산
    const reviews = storageService.getReviews();
    trainers = trainers.map((trainer) => {
      const trainerReviews = reviews.filter((r) => r.trainerId === trainer.id);
      if (trainerReviews.length > 0) {
        const avgRating = trainerReviews.reduce((sum, r) => sum + r.rating, 0) / trainerReviews.length;
        trainer.rating = Math.round(avgRating * 10) / 10;
        trainer.totalReviews = trainerReviews.length;
      }
      return trainer;
    });
    
    // 업데이트된 평점 저장
    localStorage.setItem(STORAGE_KEYS.TRAINERS, JSON.stringify(trainers));
    
    return trainers;
  },

  // Reviews
  getReviews: (): Review[] => {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    if (data) return JSON.parse(data);
    
    // 초기 평가 데이터
    const defaultReviews: Review[] = [
      {
        id: "1",
        memberId: "1",
        memberName: "홍길동",
        trainerId: "1",
        trainerName: "김철수",
        rating: 5,
        comment: "정말 전문적이고 친절하세요! 운동 방법을 자세히 설명해주시고 동기부여도 잘 해주셔서 3개월 만에 체력이 많이 좋아졌습니다.",
        date: new Date(2024, 2, 10).toISOString(),
      },
      {
        id: "2",
        memberId: "2",
        memberName: "김영수",
        trainerId: "2",
        trainerName: "이영희",
        rating: 5,
        comment: "다이어트 목표로 시작했는데 생각보다 빠르게 효과가 나타났어요. 식단 관리도 함께 도와주셔서 감사합니다!",
        date: new Date(2024, 2, 5).toISOString(),
      },
      {
        id: "3",
        memberId: "3",
        memberName: "이민지",
        trainerId: "3",
        trainerName: "박민수",
        rating: 4,
        comment: "부상 후 재활 운동을 받고 있는데, 트레이너님이 부상 부위를 정확히 파악하고 안전하게 운동을 진행해주셔서 좋습니다.",
        date: new Date(2024, 2, 8).toISOString(),
      },
      {
        id: "4",
        memberId: "4",
        memberName: "박준호",
        trainerId: "1",
        trainerName: "김철수",
        rating: 5,
        comment: "근력 트레이닝 전문가세요! 올바른 자세를 정확히 잡아주시고, 매번 새로운 운동 루틴을 제공해주셔서 지루하지 않아요.",
        date: new Date(2024, 1, 28).toISOString(),
      },
      {
        id: "5",
        memberId: "5",
        memberName: "최수진",
        trainerId: "4",
        trainerName: "최지은",
        rating: 4,
        comment: "요가와 필라테스를 배우고 있는데, 몸의 균형과 유연성이 많이 좋아졌어요. 트레이너님이 정말 차분하고 친절하세요.",
        date: new Date(2024, 2, 12).toISOString(),
      },
      {
        id: "6",
        memberId: "7",
        memberName: "한미라",
        trainerId: "6",
        trainerName: "한소영",
        rating: 5,
        comment: "바디빌딩 목표로 시작했는데, 트레이너님이 정말 전문적이세요! 근육 발달과 자세 교정에 많은 도움이 되고 있습니다.",
        date: new Date(2024, 2, 15).toISOString(),
      },
      {
        id: "7",
        memberId: "8",
        memberName: "윤서연",
        trainerId: "2",
        trainerName: "이영희",
        rating: 5,
        comment: "체형 관리 목표로 시작했는데, 트레이너님이 개인별 맞춤 프로그램을 제공해주셔서 효과가 빠르게 나타나고 있어요!",
        date: new Date(2024, 2, 3).toISOString(),
      },
      {
        id: "8",
        memberId: "1",
        memberName: "홍길동",
        trainerId: "1",
        trainerName: "김철수",
        rating: 4,
        comment: "운동 강도 조절을 잘 해주시고, 피드백도 자세히 해주셔서 좋아요. 다만 시간 약속을 좀 더 정확히 지켜주시면 더 좋을 것 같아요.",
        date: new Date(2024, 1, 20).toISOString(),
      },
      {
        id: "9",
        memberId: "3",
        memberName: "이민지",
        trainerId: "3",
        trainerName: "박민수",
        rating: 5,
        comment: "스포츠 트레이닝 전문가세요! 운동 선수처럼 체계적으로 훈련할 수 있어서 만족합니다. 경기 성적도 많이 올랐어요!",
        date: new Date(2024, 1, 15).toISOString(),
      },
      {
        id: "10",
        memberId: "11",
        memberName: "임재현",
        trainerId: "5",
        trainerName: "정대현",
        rating: 4,
        comment: "크로스핏이 처음이었는데, 트레이너님이 차근차근 설명해주셔서 쉽게 적응할 수 있었어요. 운동이 재미있어졌습니다!",
        date: new Date(2024, 2, 18).toISOString(),
      },
      {
        id: "11",
        memberId: "12",
        memberName: "오지은",
        trainerId: "6",
        trainerName: "한소영",
        rating: 5,
        comment: "프리웨이트 트레이닝을 배우고 있는데, 자세 교정에 정말 신경써주세요. 안전하게 운동할 수 있어서 좋습니다.",
        date: new Date(2024, 2, 1).toISOString(),
      },
      {
        id: "12",
        memberId: "2",
        memberName: "김영수",
        trainerId: "2",
        trainerName: "이영희",
        rating: 5,
        comment: "식단 관리와 운동을 병행해서 진행하고 있는데, 목표 체중에 거의 도달했어요! 트레이너님 덕분입니다.",
        date: new Date(2024, 1, 25).toISOString(),
      },
      {
        id: "13",
        memberId: "4",
        memberName: "박준호",
        trainerId: "1",
        trainerName: "김철수",
        rating: 5,
        comment: "근력이 정말 많이 늘었어요! 벤치프레스 무게가 2배 이상 올랐습니다. 트레이너님의 체계적인 프로그램 덕분이에요.",
        date: new Date(2024, 0, 30).toISOString(),
      },
      {
        id: "14",
        memberId: "5",
        memberName: "최수진",
        trainerId: "4",
        trainerName: "최지은",
        rating: 4,
        comment: "요가 수업이 정말 좋아요. 스트레스 해소에도 도움이 되고 몸도 유연해졌습니다. 다만 수업 시간이 좀 더 길었으면 좋겠어요.",
        date: new Date(2024, 1, 10).toISOString(),
      },
      {
        id: "15",
        memberId: "7",
        memberName: "한미라",
        trainerId: "6",
        trainerName: "한소영",
        rating: 5,
        comment: "바디빌딩 대회 준비를 하고 있는데, 트레이너님이 정말 전문적으로 도와주세요. 대회에서 좋은 성적을 거둘 수 있을 것 같아요!",
        date: new Date(2024, 2, 20).toISOString(),
      },
      {
        id: "16",
        memberId: "10",
        memberName: "송하늘",
        trainerId: "4",
        trainerName: "최지은",
        rating: 5,
        comment: "필라테스로 코어 강화를 하고 있는데, 허리 통증이 많이 줄었어요. 트레이너님이 정확한 자세를 잡아주셔서 좋습니다.",
        date: new Date(2024, 2, 14).toISOString(),
      },
      {
        id: "17",
        memberId: "8",
        memberName: "윤서연",
        trainerId: "2",
        trainerName: "이영희",
        rating: 4,
        comment: "체형 교정에 도움이 많이 되고 있어요. 다만 운동 시간이 좀 더 유연했으면 좋겠습니다.",
        date: new Date(2024, 1, 18).toISOString(),
      },
      {
        id: "18",
        memberId: "1",
        memberName: "홍길동",
        trainerId: "1",
        trainerName: "김철수",
        rating: 5,
        comment: "근력 트레이닝 6개월째 받고 있는데, 체력과 근력이 정말 많이 향상되었어요. 트레이너님의 전문성에 감사드립니다!",
        date: new Date(2024, 0, 25).toISOString(),
      },
    ];
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(defaultReviews));
    return defaultReviews;
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
