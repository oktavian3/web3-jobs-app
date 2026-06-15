import type { Metadata } from 'next'; import CourseApp from '@/components/course/CourseApp';
export const metadata:Metadata={title:'Web3 Career Course',description:'Learn Web3 roles, build proof-of-work, prepare for interviews, and apply with context.'};
export default function CoursePage(){return <CourseApp/>}
