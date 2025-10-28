"use client";

import { useState, useEffect } from "react";
import {
  MessageCircle,
  Clock,
  CheckCircle,
  User,
  Mail,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Question {
  id: number;
  question: string;
  answer?: string;
  replyType: string;
  paymentStatus: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export default function AstroQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null,
  );
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch("/api/astro-question");
      if (response.ok) {
        const data = await response.json();
        setQuestions(data);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleSubmitReply = async () => {
    if (!selectedQuestion || !replyText.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/astro-question", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedQuestion.id,
          answer: replyText,
        }),
      });

      if (response.ok) {
        setSelectedQuestion(null);
        setReplyText("");
        fetchQuestions(); // Refresh list
      }
    } catch (error) {
      console.error("Error submitting reply:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string, hasAnswer: boolean) => {
    if (hasAnswer) {
      return (
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center gap-1">
          <CheckCircle size={14} />
          Answered
        </span>
      );
    }
    if (status === "paid") {
      return (
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold flex items-center gap-1">
          <Clock size={14} />
          Paid - Pending Reply
        </span>
      );
    }
    return (
      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
        Unpaid
      </span>
    );
  };

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-[#1E3A8A] mb-2 flex items-center gap-3">
          <MessageCircle className="text-[#FF6B35]" size={36} />
          Astro Questions
        </h1>
        <p className="text-[#666]">View and reply to user questions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Questions List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-[#1E3A8A] mb-4">
            All Questions ({questions.length})
          </h2>

          <div className="space-y-4 max-h-[700px] overflow-y-auto">
            {questions.length === 0 ? (
              <div className="text-center py-12 text-[#666]">
                <MessageCircle
                  size={48}
                  className="mx-auto mb-4 text-gray-300"
                />
                <p>No questions yet</p>
              </div>
            ) : (
              questions.map((q) => (
                <div
                  key={q.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedQuestion?.id === q.id
                      ? "border-[#FF6B35] bg-[#FFF5F2]"
                      : "border-gray-200 hover:border-[#FF6B35]/50"
                  }`}
                  onClick={() => {
                    setSelectedQuestion(q);
                    setReplyText(q.answer || "");
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-[#666]" />
                      <span className="font-semibold text-[#1E3A8A]">
                        {q.user?.name || "Anonymous"}
                      </span>
                    </div>
                    {getStatusBadge(q.paymentStatus, !!q.answer)}
                  </div>

                  <p className="text-[#666] mb-2 line-clamp-2">{q.question}</p>

                  <div className="flex items-center gap-4 text-xs text-[#666]">
                    <div className="flex items-center gap-1">
                      {q.replyType === "email" ? (
                        <Mail size={14} />
                      ) : (
                        <MessageCircle size={14} />
                      )}
                      <span className="capitalize">{q.replyType}</span>
                    </div>
                    <span>{new Date(q.createdAt).toLocaleDateString()}</span>
                  </div>

                  {q.answer && (
                    <div className="mt-2 p-2 bg-green-50 rounded text-sm text-green-700">
                      <strong>Reply:</strong> {q.answer.substring(0, 100)}
                      {q.answer.length > 100 && "..."}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Reply Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-[#1E3A8A] mb-4">
            {selectedQuestion ? "Reply to Question" : "Select a Question"}
          </h2>

          {selectedQuestion ? (
            <div className="space-y-4">
              {/* User Info */}
              <div className="bg-[#F8F9FA] p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <User size={18} className="text-[#FF6B35]" />
                    <span className="font-semibold text-[#1E3A8A]">
                      {selectedQuestion.user?.name}
                    </span>
                  </div>
                  {getStatusBadge(
                    selectedQuestion.paymentStatus,
                    !!selectedQuestion.answer,
                  )}
                </div>
                <p className="text-[#666] text-sm">
                  {selectedQuestion.user?.email}
                </p>
              </div>

              {/* Question */}
              <div>
                <label className="block text-sm font-medium text-[#1E3A8A] mb-2">
                  Question
                </label>
                <p className="bg-gray-50 p-3 rounded-lg text-[#666]">
                  {selectedQuestion.question}
                </p>
              </div>

              {/* Answer Textarea */}
              <div>
                <label className="block text-sm font-medium text-[#1E3A8A] mb-2">
                  Your Reply
                </label>
                <Textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Enter your answer here..."
                  rows={8}
                  className="w-full"
                />
                <p className="mt-2 text-xs text-[#666]">
                  Reply will be sent via {selectedQuestion.replyType}
                </p>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmitReply}
                disabled={loading || !replyText.trim()}
                className="w-full bg-[#FF6B35] hover:bg-[#FF5722] text-white"
              >
                <Send size={18} className="mr-2" />
                {loading ? "Submitting..." : "Submit Reply"}
              </Button>
            </div>
          ) : (
            <div className="text-center py-12 text-[#666]">
              <MessageCircle size={48} className="mx-auto mb-4 text-gray-300" />
              <p>Select a question from the list to reply</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
