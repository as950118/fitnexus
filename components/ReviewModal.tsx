"use client";

import { useState, useEffect } from "react";
import { X, Star } from "lucide-react";
import { Review, Trainer, Member } from "@/types";
import { storageService } from "@/lib/storage";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  trainers: Trainer[];
  members: Member[];
}

export default function ReviewModal({
  isOpen,
  onClose,
  onSave,
  trainers,
  members,
}: ReviewModalProps) {
  const [formData, setFormData] = useState({
    memberId: "",
    trainerId: "",
    rating: 5,
    comment: "",
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        memberId: members.length > 0 ? members[0].id : "",
        trainerId: trainers.length > 0 ? trainers[0].id : "",
        rating: 5,
        comment: "",
      });
    }
  }, [isOpen, trainers, members]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedMember = members.find((m) => m.id === formData.memberId);
    const selectedTrainer = trainers.find((t) => t.id === formData.trainerId);

    if (!selectedMember || !selectedTrainer) {
      alert("회원과 트레이너를 선택해주세요.");
      return;
    }

    const review: Review = {
      id: Date.now().toString(),
      memberId: formData.memberId,
      memberName: selectedMember.name,
      trainerId: formData.trainerId,
      trainerName: selectedTrainer.name,
      rating: formData.rating,
      comment: formData.comment,
      date: new Date().toISOString(),
    };

    storageService.saveReview(review);
    onSave();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">평가 작성</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              회원 *
            </label>
            <select
              required
              value={formData.memberId}
              onChange={(e) =>
                setFormData({ ...formData, memberId: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              트레이너 *
            </label>
            <select
              required
              value={formData.trainerId}
              onChange={(e) =>
                setFormData({ ...formData, trainerId: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {trainers.map((trainer) => (
                <option key={trainer.id} value={trainer.id}>
                  {trainer.name} ({trainer.specialty})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              평점 *
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-8 w-8 transition-colors ${
                      star <= formData.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm font-medium text-gray-700">
                {formData.rating}점
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              평가 내용 *
            </label>
            <textarea
              required
              rows={5}
              value={formData.comment}
              onChange={(e) =>
                setFormData({ ...formData, comment: e.target.value })
              }
              placeholder="트레이너에 대한 평가를 작성해주세요..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700"
            >
              작성 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
