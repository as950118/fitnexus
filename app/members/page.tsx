"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Search, UserPlus } from "lucide-react";
import { storageService } from "@/lib/storage";
import { Member, Trainer } from "@/types";
import MemberModal from "@/components/MemberModal";

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setMembers(storageService.getMembers());
    setTrainers(storageService.getTrainers());
  };

  const handleDelete = (id: string) => {
    if (confirm("정말 이 회원을 삭제하시겠습니까?")) {
      storageService.deleteMember(id);
      loadData();
    }
  };

  const handleEdit = (member: Member) => {
    setEditingMember(member);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingMember(null);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    loadData();
    setIsModalOpen(false);
    setEditingMember(null);
  };

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "활성";
      case "inactive":
        return "비활성";
      case "suspended":
        return "정지";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">회원 관리</h1>
              <p className="text-gray-600 mt-2">
                PT 회원 정보를 관리하고 추적하세요
              </p>
            </div>
            <button
              onClick={handleAdd}
              className="mt-4 sm:mt-0 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              회원 추가
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="이름, 전화번호, 이메일로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {filteredMembers.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <UserPlus className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              등록된 회원이 없습니다
            </h3>
            <p className="text-gray-600 mb-6">
              새로운 회원을 추가하여 시작하세요
            </p>
            <button
              onClick={handleAdd}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              첫 회원 추가하기
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      이름
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      연락처
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      트레이너
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      가입일
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      멤버십
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      상태
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      작업
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {member.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{member.phone}</div>
                        <div className="text-sm text-gray-500">{member.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {member.trainerName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(member.joinDate).toLocaleDateString("ko-KR")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {member.membershipType === "monthly"
                          ? "월간"
                          : member.membershipType === "quarterly"
                          ? "분기"
                          : "연간"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            member.status
                          )}`}
                        >
                          {getStatusText(member.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(member)}
                          className="text-primary-600 hover:text-primary-900 mr-4"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(member.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <MemberModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingMember(null);
          }}
          onSave={handleSave}
          member={editingMember}
          trainers={trainers}
        />
      </div>
    </div>
  );
}
