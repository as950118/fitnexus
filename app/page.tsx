"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Star, TrendingUp, Award, ArrowRight, Dumbbell, Zap } from "lucide-react";
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
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Star,
      title: "트레이너 평가",
      description: "고객이 PT 트레이너를 평가하고 피드백을 제공하세요",
      href: "/reviews",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: TrendingUp,
      title: "통계 분석",
      description: "회원 현황과 트레이너 평가 통계를 확인하세요",
      href: "/reviews",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#4448ff] to-[#3535e6]">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}></div>
        <motion.div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="text-center">
            <motion.div
              className="flex justify-center mb-8"
              variants={itemVariants}
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-white/20 blur-2xl rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <Dumbbell className="h-20 w-20 relative text-white" />
              </div>
            </motion.div>
            <motion.h1
              className="text-6xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg"
              variants={itemVariants}
            >
              FitNexus
            </motion.h1>
            <motion.p
              className="text-2xl md:text-3xl mb-6 text-white/90 font-light"
              variants={itemVariants}
            >
              헬스장 PT 회원 관리 시스템
            </motion.p>
            <motion.p
              className="text-lg md:text-xl mb-12 text-white/80 max-w-3xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              회원 관리를 체계적으로 하고, 트레이너 평가를 통해<br />
              서비스 품질을 향상시키세요
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/members"
                  className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-white/90 transition-all duration-200 inline-flex items-center justify-center shadow-xl hover:shadow-2xl"
                >
                  회원 관리 시작하기
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/reviews"
                  className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all duration-200 inline-flex items-center justify-center hover:border-white/50"
                >
                  트레이너 평가 보기
                  <Star className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {[
            { icon: Users, gradient: "from-blue-500 to-cyan-500", value: stats.totalMembers, label: "전체 회원" },
            { icon: Award, gradient: "from-purple-500 to-pink-500", value: stats.totalTrainers, label: "트레이너" },
            { icon: Star, gradient: "from-yellow-500 to-orange-500", value: stats.totalReviews, label: "평가 수" },
            { icon: TrendingUp, gradient: "from-green-500 to-emerald-500", value: stats.avgRating.toFixed(1), label: "평균 평점" },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                className="card-dark rounded-xl p-8 text-center"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className={`bg-gradient-to-br ${stat.gradient} w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className="h-8 w-8 text-white" />
                </motion.div>
                <motion.div
                  className="text-4xl font-bold text-white mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            주요 기능
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            헬스장 관리를 위한 강력한 기능들을 경험해보세요
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  href={feature.href}
                  className="card-dark rounded-xl p-8 transition-all duration-200 group block"
                >
                  <motion.div
                    className={`bg-gradient-to-br ${feature.gradient} w-16 h-16 rounded-lg flex items-center justify-center mb-6`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{feature.description}</p>
                  <motion.div
                    className="flex items-center text-primary-400 font-semibold"
                    whileHover={{ x: 5 }}
                  >
                    자세히 보기
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#4448ff] to-[#3535e6] py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}></div>
        <motion.div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            <Zap className="h-16 w-16 text-white mx-auto mb-6" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">지금 시작하세요</h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            FitNexus로 헬스장 관리를 더 효율적으로 만들어보세요
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/members"
              className="bg-white text-primary-600 px-10 py-4 rounded-lg font-semibold hover:bg-white/90 transition-all duration-200 inline-flex items-center shadow-xl hover:shadow-2xl"
            >
              시작하기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
