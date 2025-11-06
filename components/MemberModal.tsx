"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Member, Trainer } from "@/types";
import { storageService } from "@/lib/storage";

interface MemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  member: Member | null;
  trainers: Trainer[];
}

export default function MemberModal({
  isOpen,
  onClose,
  onSave,
  member,
  trainers,
}: MemberModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    trainerId: "",
    membershipType: "monthly" as "monthly" | "quarterly" | "yearly",
    status: "active" as "active" | "inactive" | "suspended",
  });

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name,
        phone: member.phone,
        email: member.email,
        trainerId: member.trainerId,
        membershipType: member.membershipType,
        status: member.status,
      });
    } else {
      setFormData({
        name: "",
        phone: "",
        email: "",
        trainerId: trainers.length > 0 ? trainers[0].id : "",
        membershipType: "monthly",
        status: "active",
      });
    }
  }, [member, trainers]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedTrainer = trainers.find((t) => t.id === formData.trainerId);
    
    const memberData: Member = {
      id: member?.id || Date.now().toString(),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      trainerId: formData.trainerId,
      trainerName: selectedTrainer?.name || "",
      joinDate: member?.joinDate || new Date().toISOString(),
      membershipType: formData.membershipType,
      status: formData.status,
    };

    storageService.saveMember(memberData);
    onSave();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {member ? "회원 정보 수정" : "새 회원 추가"}
          </h2>
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
              이름 *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              전화번호 *
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이메일 *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              담당 트레이너 *
            </label>
            <select
              required
              value={formData.trainerId}
              onChange={(e) => setFormData({ ...formData, trainerId: e.target.value })}
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              멤버십 유형 *
            </label>
            <select
              value={formData.membershipType}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  membershipType: e.target.value as "monthly" | "quarterly" | "yearly",
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="monthly">월간</option>
              <option value="quarterly">분기</option>
              <option value="yearly">연간</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              상태 *
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as "active" | "inactive" | "suspended",
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="active">활성</option>
              <option value="inactive">비활성</option>
              <option value="suspended">정지</option>
            </select>
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
              {member ? "수정" : "추가"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
