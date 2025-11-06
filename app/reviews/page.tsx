"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
                : "text-gray-600"
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-white">
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
    <div className="min-h-screen bg-[#1a1a1a] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">트레이너 평가</h1>
              <p className="text-gray-400 text-lg">
                고객이 작성한 트레이너 평가를 확인하세요
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 sm:mt-0 bg-gradient-to-br from-[#4448ff] to-[#3535e6] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-200 inline-flex items-center shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Plus className="h-5 w-5 mr-2" />
              평가 작성
            </button>
          </div>

          {/* 통계 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card-dark rounded-xl p-6 hover:scale-105 transition-transform duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">평균 평점</p>
                  <p className="text-4xl font-bold text-white">
                    {avgRating.toFixed(1)}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-yellow-500 to-orange-500 w-14 h-14 rounded-lg flex items-center justify-center">
                  <Star className="h-8 w-8 text-white fill-white" />
                </div>
              </div>
            </div>

            <div className="card-dark rounded-xl p-6 hover:scale-105 transition-transform duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">전체 평가 수</p>
                  <p className="text-4xl font-bold text-white">
                    {reviews.length}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-14 h-14 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>

            <div className="card-dark rounded-xl p-6 hover:scale-105 transition-transform duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">최고 평점 트레이너</p>
                  <p className="text-xl font-bold text-white">
                    {topTrainer?.name || "없음"}
                  </p>
                  {topTrainer && (
                    <p className="text-sm text-gray-400">
                      {topTrainer.rating.toFixed(1)}점
                    </p>
                  )}
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-14 h-14 rounded-lg flex items-center justify-center">
                  <Award className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* 트레이너 필터 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              트레이너 필터
            </label>
            <select
              value={selectedTrainer}
              onChange={(e) => setSelectedTrainer(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white"
            >
              <option value="all" className="bg-dark-900">전체 트레이너</option>
              {trainers.map((trainer) => (
                <option key={trainer.id} value={trainer.id} className="bg-dark-900">
                  {trainer.name} ({trainer.rating.toFixed(1)}점)
                </option>
              ))}
            </select>
          </div>

          {/* 트레이너 목록 */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">트레이너 현황</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trainers.map((trainer) => (
                <div
                  key={trainer.id}
                  className="card-dark rounded-xl p-6 hover:scale-105 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {trainer.name}
                      </h3>
                      <p className="text-sm text-gray-400">{trainer.specialty}</p>
                    </div>
                    <Award className="h-6 w-6 text-primary-400" />
                  </div>
                  <div className="mb-4">{renderStars(trainer.rating)}</div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>경력: {trainer.experience}년</span>
                    <span>평가 {trainer.totalReviews}개</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 평가 목록 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">평가 목록</h2>
            {sortedReviews.length === 0 ? (
              <div className="card-dark rounded-xl p-12 text-center">
                <MessageSquare className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  작성된 평가가 없습니다
                </h3>
                <p className="text-gray-400 mb-6">
                  첫 번째 평가를 작성해보세요
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-gradient-to-br from-[#4448ff] to-[#3535e6] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-200 inline-flex items-center shadow-lg hover:shadow-xl hover:scale-105"
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
                    className="card-dark rounded-xl p-6 hover:scale-[1.02] transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <h3 className="text-lg font-semibold text-white">
                            {review.trainerName}
                          </h3>
                          <span className="text-sm text-gray-400">
                            {review.memberName}
                          </span>
                        </div>
                        <div className="mb-3">{renderStars(review.rating)}</div>
                        <p className="text-gray-300 leading-relaxed">{review.comment}</p>
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
