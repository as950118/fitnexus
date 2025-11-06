"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="card-dark rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-white/10"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">평가 작성</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              회원 *
            </label>
            <select
              required
              value={formData.memberId}
              onChange={(e) =>
                setFormData({ ...formData, memberId: e.target.value })
              }
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white"
            >
              {members.map((member) => (
                <option key={member.id} value={member.id} className="bg-dark-900">
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              트레이너 *
            </label>
            <select
              required
              value={formData.trainerId}
              onChange={(e) =>
                setFormData({ ...formData, trainerId: e.target.value })
              }
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white"
            >
              {trainers.map((trainer) => (
                <option key={trainer.id} value={trainer.id} className="bg-dark-900">
                  {trainer.name} ({trainer.specialty})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              평점 *
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className="focus:outline-none hover:scale-110 transition-transform"
                >
                  <Star
                    className={`h-8 w-8 transition-colors ${
                      star <= formData.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-600"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm font-medium text-white">
                {formData.rating}점
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
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
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-white placeholder-gray-500"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-white/10 rounded-lg text-gray-300 font-medium hover:bg-white/5 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-br from-[#4448ff] to-[#3535e6] text-white rounded-lg font-medium hover:opacity-90 transition-all duration-200 shadow-lg"
            >
              작성 완료
            </button>
          </div>
        </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
