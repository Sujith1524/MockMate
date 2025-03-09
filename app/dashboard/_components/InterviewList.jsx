"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import InterviewListCard from "./InterviewListCard";
import { toast } from "sonner";

const InterviewList = () => {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (user) {
      getInterviewList();
    }
  }, [user, count]);

  const getInterviewList = async () => {
    setLoading(true);
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(
          eq(MockInterview?.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
        .orderBy(desc(MockInterview?.id));
      setInterviewList(result);
    } catch (error) {
      console.error("Error fetching interviews:", error);
      toast.error("Error fetching interviews:");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="font-medium text-lg">Previous Mock Interview</h2>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-[20vh] bg-gray-100 space-y-3">
          <div className="flex space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-150"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-300"></div>
          </div>
          <p className="text-gray-600 text-base font-normal">
            Loading interviews, please wait...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
          {interviewList.length > 0 ? (
            interviewList.map((item, index) => (
              <InterviewListCard
                interviewList={item}
                key={index}
                setCount={setCount}
                count={count}
              />
            ))
          ) : (
            <p className="text-gray-500">No interviews found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default InterviewList;
