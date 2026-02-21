# 🔒 Secure ImageKit Backend API

## Overview
This API handles ImageKit image uploads securely on the server-side, keeping your ImageKit private key safe and away from client applications.

## 🎯 Features
- ✅ **Secure**: ImageKit private key never exposed to clients
- ✅ **Rate Limiting**: 5 uploads/minute, 50/hour per user
- ✅ **Image Compression**: Handled by Flutter app before upload
- ✅ **Multipart Upload**: Supports file uploads via FormData
- ✅ **Error Handling**: Comprehensive error messages and status codes

## 📋 Setup

### 1. Install Dependencies
```bash
cd glenn_website
npm install
```

### 2. Configure Environment Variables
The ImageKit credentials are already in your `.env` file:
```env
IMAGEKIT_PRIVATE_KEY=private_m1tmX3yuAjnZTRbVqkQRSXsWWkQ=
IMAGEKIT_PUBLIC_KEY=public_ttnmTxL50UVHxvj7b2tI6EINO70=
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/yp9gr6l6z5
```

⚠️ **NEVER commit these to Git or expose them to clients!**

### 3. Start Development Server
```bash
npm run dev
```

The API will be available at: `http://localhost:3000`

---

## 🔌 API Endpoints

### Upload Image
**POST** `/api/upload/imagekit`

Upload an image to ImageKit securely.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body:
  ```
  file: File (required)
  folder: string (optional, default: 'avatars')
  userId: string (optional, for rate limiting)
  ```

**Response (200 OK):**
```json
{
  "success": true,
  "url": "https://ik.imagekit.io/yp9gr6l6z5/avatars/1234567890_image.jpg",
  "fileId": "abc123def456",
  "name": "1234567890_image.jpg",
  "size": 245678,
  "filePath": "/avatars/1234567890_image.jpg"
}
```

**Response (429 Rate Limited):**
```json
{
  "error": "Rate limit exceeded: 5 uploads in last minute. Max is 5/minute."
}
```

**Response (400 Bad Request):**
```json
{
  "error": "No file provided"
}
```

**Response (500 Server Error):**
```json
{
  "error": "Upload failed",
  "details": "Error message from ImageKit"
}
```

---

### Get Rate Limit Status
**GET** `/api/upload/imagekit?userId={userId}`

Check rate limit status for a specific user.

**Request:**
- Method: `GET`
- Query Parameters:
  - `userId`: string (required)

**Response (200 OK):**
```json
{
  "userId": "user123",
  "uploadsLastMinute": 2,
  "maxUploadsPerMinute": 5,
  "uploadsLastHour": 15,
  "maxUploadsPerHour": 50,
  "remainingMinute": 3,
  "remainingHour": 35
}
```

---

## 🧪 Testing

### Using cURL
```bash
# Upload an image
curl -X POST http://localhost:3000/api/upload/imagekit \
  -F "file=@/path/to/image.jpg" \
  -F "folder=avatars" \
  -F "userId=test-user-123"

# Check rate limit status
curl "http://localhost:3000/api/upload/imagekit?userId=test-user-123"
```

### Using Postman
1. Create a new POST request to `http://localhost:3000/api/upload/imagekit`
2. Go to Body tab → form-data
3. Add fields:
   - `file`: Select file type, choose an image
   - `folder`: Text, value: `avatars`
   - `userId`: Text, value: `test-user-123`
4. Send request

---

## 🔐 Security Features

### 1. Private Key Protection
- ImageKit private key is stored in `.env` on the server
- Never sent to clients or exposed in responses
- Used only in server-side API routes

### 2. Rate Limiting (In-Memory)
Current implementation uses in-memory storage for rate limiting:
- ✅ Good for: Development, single-server deployments
- ⚠️ Limitations: Data lost on server restart, doesn't work across multiple server instances

**For Production**: Consider using Redis for persistent, distributed rate limiting:
```typescript
// Example with Redis (not implemented)
import { Redis } from '@upstash/redis';
const redis = new Redis({...});
```

### 3. Error Handling
- Never exposes sensitive error details to clients
- Logs full errors server-side for debugging
- Returns user-friendly error messages

---

## 🚀 Flutter Integration

The Flutter app is already configured to use this backend API.

**File:** `lib/services/imagekit_upload_service.dart`

```dart
// Automatically uses backend API
final imageUrl = await ImageKitUploadService.uploadImage(
  imageBytes: imageBytes,
  fileName: 'profile.jpg',
  folder: 'avatars',
  userId: currentUserId,
);
```

**Configuration:** `lib/config/app_initializer.dart`
```dart
ImageKitUploadService.initialize(
  backendUrl: 'http://localhost:3000', // Change for production
);
```

---

## 📊 Rate Limits

| Limit | Value |
|-------|-------|
| Uploads per minute per user | 5 |
| Uploads per hour per user | 50 |

To change these limits, edit `app/api/upload/imagekit/route.ts`:
```typescript
const MAX_UPLOADS_PER_MINUTE = 5;  // Change this
const MAX_UPLOADS_PER_HOUR = 50;   // Change this
```

---

## 🎨 Supported Folders

The API supports organizing uploads into folders:
- `avatars/` - Profile pictures
- `community_media/` - Community posts
- `chat_media/` - Chat images
- Custom folders (specify in `folder` parameter)

---

## 🐛 Troubleshooting

### Error: "Server configuration error"
**Cause:** ImageKit credentials not set in `.env`
**Solution:** Check `.env` file has:
```env
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_URL_ENDPOINT=your_url_endpoint
```

### Error: "Upload failed"
**Possible causes:**
1. Invalid ImageKit credentials
2. ImageKit API is down
3. File size exceeds limit
4. Network connectivity issues

**Debug steps:**
1. Check server logs for detailed error
2. Verify ImageKit credentials in dashboard
3. Test credentials with ImageKit API directly
4. Check file size (ImageKit free tier limits)

### Rate limit not working across requests
**Cause:** In-memory storage is cleared on server restart
**Solution:** For production, implement Redis-based rate limiting

---

## 🌐 Production Deployment

### 1. Deploy Backend
Deploy `glenn_website` to your hosting provider:
- Vercel (recommended for Next.js)
- Railway
- DigitalOcean
- AWS

### 2. Update Environment Variables
Set environment variables on your hosting platform:
```env
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_URL_ENDPOINT=your_url_endpoint
```

### 3. Update Flutter App
Change backend URL in `lib/config/app_initializer.dart`:
```dart
ImageKitUploadService.initialize(
  backendUrl: 'https://your-production-url.com',
);
```

### 4. Test Production
1. Build and deploy backend
2. Update Flutter app with production URL
3. Test image uploads
4. Monitor ImageKit dashboard for usage

---

## 📚 Additional Resources

- [ImageKit Documentation](https://docs.imagekit.io/)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Rate Limiting Best Practices](https://cloud.google.com/architecture/rate-limiting-strategies-techniques)

---

## ✅ Security Checklist

Before going to production:

- [ ] ImageKit private key is in `.env` (server-side only)
- [ ] `.env` file is in `.gitignore`
- [ ] Private key is NOT in client code
- [ ] Backend URL uses HTTPS in production
- [ ] Rate limiting is tested and working
- [ ] Error handling doesn't expose sensitive info
- [ ] Server logs are monitored
- [ ] Consider implementing Redis for rate limiting
- [ ] Set up alerts for API errors

---

**🎉 Your image uploads are now secure!**
