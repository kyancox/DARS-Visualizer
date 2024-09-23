"use client"
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ExtractedData {
  student_name: string | null;
  preparation_date: string | null;
  requested_school: string | null;
  requested_major: string | null;
  gpa: string | null;
  majors: string[];
  certificates: string[];
  credits: {
    status: string;
    earned_credits: number;
    in_progress_credits: number;
    needed_credits: number;
  };
  in_progress_courses: Array<{
    semester: string;
    course_code: string;
    credits: number;
    status: string;
    course_name: string;
  }>;
  all_courses: Array<{
    course_code: string;
    credits: number;
    status: string;
    course_name: string;
  }>;
  completed_requirements: Array<{
    category: string;
    earned: string | null;
    details: string[];
  }>;
  unfulfilled_requirements: Array<{
    category: string;
    needs: string | null;
    earned: string | null;
    details: string[];
  }>;
}

interface DataContextType {
  data: ExtractedData | null;
  setData: React.Dispatch<React.SetStateAction<ExtractedData | null>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ExtractedData | null>(null);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}