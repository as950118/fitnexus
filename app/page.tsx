"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, Star, TrendingUp, Award, ArrowRight, Dumbbell } from "lucide-react";
import { storageService } from "@/lib/storage";
import { Member, Trainer, Review } from "@/types";

export default function Home() {
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalTrainers: 0,
    totalReviews: 0,
    avgRating: 0,
  });

  useEffect(() => {
    const members = storageService.getMembers();
    const trainers = storageService.getTrainers();
    const reviews = storageService.getReviews();
    
    const avgRating = trainers.length > 0
      ? trainers.reduce((sum, t) => sum + t.rating, 0) / trainers.length
      : 0;

    setStats({
      totalMembers: members.length,
      totalTrainers: trainers.length,
      totalReviews: reviews.length,
      avgRating: Math.round(avgRating * 10) / 10,
    });
  }, []);

  const features = [
    {
      icon: Users,
      title: "회원 관리",
      description: "PT 회원 정보를 체계적으로 관리하고 추적하세요",
      href: "/members",
      color: "bg-blue-500",
    },
    {
      icon: Star,
      title: "트레이너 평가",
      description: "고객이 PT 트레이너를 평가하고 피드백을 제공하세요",
      href: "/reviews",
      color: "bg-yellow-500",
    },
    {
      icon: TrendingUp,
      title: "통계 분석",
      description: "회원 현황과 트레이너 평가 통계를 확인하세요",
      href: "/reviews",
      color: "bg-green-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Dumbbell className="h-16 w-16" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              FitNexus
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              헬스장 PT 회원 관리 시스템
            </p>
            <p className="text-lg mb-12 text-primary-200 max-w-2xl mx-auto">
              회원 관리를 체계적으로 하고, 트레이너 평가를 통해 서비스 품질을 향상시키세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/members"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors inline-flex items-center justify-center"
              >
                회원 관리 시작하기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/reviews"
                className="bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-400 transition-colors inline-flex items-center justify-center border-2 border-white"
              >
                트레이너 평가 보기
                <Star className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Users className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {stats.totalMembers}
            </div>
            <div className="text-gray-600">전체 회원</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Award className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {stats.totalTrainers}
            </div>
            <div className="text-gray-600">트레이너</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Star className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {stats.totalReviews}
            </div>
            <div className="text-gray-600">평가 수</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <TrendingUp className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {stats.avgRating.toFixed(1)}
            </div>
            <div className="text-gray-600">평균 평점</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          주요 기능
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link
                key={index}
                href={feature.href}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow group"
              >
                <div className={`${feature.color} w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="flex items-center text-primary-600 font-semibold group-hover:text-primary-700">
                  자세히 보기
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">지금 시작하세요</h2>
          <p className="text-xl text-primary-100 mb-8">
            FitNexus로 헬스장 관리를 더 효율적으로 만들어보세요
          </p>
          <Link
            href="/members"
            className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors inline-flex items-center"
          >
            시작하기
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
