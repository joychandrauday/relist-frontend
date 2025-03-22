export { default } from "next-auth/middleware"

export const config = {
    matcher: ['/:path/dashboard/:path*', '/checkout/:path*', '/wishlist', '/message']
}