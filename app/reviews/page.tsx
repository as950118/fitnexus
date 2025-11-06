"use client";

import { useEffect, useState } from "react";
import { Star, Plus, MessageSquare, TrendingUp, Award } from "lucide-react";
import { storageService } from "@/lib/storage";
import { Review, Trainer, Member } from "@/types";
import ReviewModal from "@/components/ReviewModal";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<string>("all");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setReviews(storageService.getReviews());
    setTrainers(storageService.getTrainers());
    setMembers(storageService.getMembers());
  };

  const handleSave = () => {
    loadData();
    setIsModalOpen(false);
  };

  const filteredReviews =
    selectedTrainer === "all"
      ? reviews
      : reviews.filter((r) => r.trainerId === selectedTrainer);

  const sortedReviews = [...filteredReviews].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-gray-700">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  const getTopTrainer = () => {
    if (trainers.length === 0) return null;
    return trainers.reduce((prev, current) =>
      prev.rating > current.rating ? prev : current
    );
  };

  const topTrainer = getTopTrainer();
  const avgRating =
    trainers.length > 0
      ? trainers.reduce((sum, t) => sum + t.rating, 0) / trainers.length
      : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">트레이너 평가</h1>
              <p className="text-gray-600 mt-2">
                고객이 작성한 트레이너 평가를 확인하세요
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 sm:mt-0 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              평가 작성
            </button>
          </div>

          {/* 통계 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">평균 평점</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {avgRating.toFixed(1)}
                  </p>
                </div>
                <Star className="h-12 w-12 text-yellow-400 fill-yellow-400" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">전체 평가 수</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {reviews.length}
                  </p>
                </div>
                <MessageSquare className="h-12 w-12 text-primary-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">최고 평점 트레이너</p>
                  <p className="text-xl font-bold text-gray-900">
                    {topTrainer?.name || "없음"}
                  </p>
                  {topTrainer && (
                    <p className="text-sm text-gray-500">
                      {topTrainer.rating.toFixed(1)}점
                    </p>
                  )}
                </div>
                <Award className="h-12 w-12 text-yellow-500" />
              </div>
            </div>
          </div>

          {/* 트레이너 필터 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              트레이너 필터
            </label>
            <select
              value={selectedTrainer}
              onChange={(e) => setSelectedTrainer(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">전체 트레이너</option>
              {trainers.map((trainer) => (
                <option key={trainer.id} value={trainer.id}>
                  {trainer.name} ({trainer.rating.toFixed(1)}점)
                </option>
              ))}
            </select>
          </div>

          {/* 트레이너 목록 */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">트레이너 현황</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {trainers.map((trainer) => (
                <div
                  key={trainer.id}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {trainer.name}
                      </h3>
                      <p className="text-sm text-gray-600">{trainer.specialty}</p>
                    </div>
                    <Award className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="mb-4">{renderStars(trainer.rating)}</div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>경력: {trainer.experience}년</span>
                    <span>평가 {trainer.totalReviews}개</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 평가 목록 */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">평가 목록</h2>
            {sortedReviews.length === 0 ? (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  작성된 평가가 없습니다
                </h3>
                <p className="text-gray-600 mb-6">
                  첫 번째 평가를 작성해보세요
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-flex items-center"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  평가 작성하기
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {sortedReviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {review.trainerName}
                          </h3>
                          <span className="text-sm text-gray-500">
                            {review.memberName}
                          </span>
                        </div>
                        <div className="mb-3">{renderStars(review.rating)}</div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                      <div className="text-sm text-gray-500 ml-4">
                        {new Date(review.date).toLocaleDateString("ko-KR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <ReviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          trainers={trainers}
          members={members}
        />
      </div>
    </div>
  );
}
