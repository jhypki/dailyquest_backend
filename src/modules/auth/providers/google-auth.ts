// import passport from 'passport';
// import { Strategy as GoogleStrategy, Profile, VerifyCallback } from 'passport-google-oauth20';
// import { PrismaClient } from '@prisma/client';
// import jwt from 'jsonwebtoken';
// import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../../../config/env';
// require('dotenv').config();
//
// const prisma = new PrismaClient();
//
// passport.use(
//     new GoogleStrategy(
//         {
//             clientID: GOOGLE_CLIENT_ID,
//             clientSecret: GOOGLE_CLIENT_SECRET,
//             callbackURL: `${process.env.BASE_URL}/auth/google/callback`
//         },
//         async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
//             try {
//                 let user = await prisma.user.findUnique({
//                     where: { email: profile.emails[0].value }
//                 });
//
//                 if (!user) {
//                     // Create a new user if not found
//                     user = await prisma.user.create({
//                         data: {
//                             username: profile.displayName,
//                             email: profile.emails[0].value,
//                             picture: profile.photos[0].value,
//                             passwordHash: '' // Not needed for OAuth
//                         }
//                     });
//                 }
//
//                 // Generate JWT token
//                 const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//                     expiresIn: '7d'
//                 });
//
//                 return done(null, { user, token });
//             } catch (error) {
//                 return done(error, null);
//             }
//         }
//     )
// );
//
// // Serialize user
// passport.serializeUser((user, done) => {
//     done(null, user);
// });
//
// passport.deserializeUser((user, done) => {
//     done(null, user);
// });
//
// module.exports = passport;
