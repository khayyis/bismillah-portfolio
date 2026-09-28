import { NextResponse } from 'next/server';
import { profileData } from '../../../lib/portfolioData';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  if (type === 'profile') {
    return NextResponse.json(profileData);
  }

  if (type === 'projects') {
    return NextResponse.json(profileData.projects);
  }

  if (type === 'skills') {
    return NextResponse.json(profileData.skills);
  }

  return NextResponse.json({
    profile: profileData,
    projects: profileData.projects,
    skills: profileData.skills,
    pillars: profileData.pillars,
    experience: profileData.experience
  });
}
