import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const isAuthPage = req.nextUrl.pathname.startsWith('/login')

  // TODO: check session

  if (!isAuthPage) {
    // redirect nếu chưa login
  }

  return NextResponse.next()
}