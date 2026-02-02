import cloudinary from "../config/cloudinary.js";

async function getSignedFileUrl(key, expiresIn = 3600) {
  // In Cloudinary, we typically use the secure_url.
  // If 'key' is the public_id, we can generate the URL.
  // Note: expiresIn is ignored here as standard Cloudinary URLs don't expire 
  // unless configured as private/authenticated resources.
  
  const url = cloudinary.url(key, {
    secure: true,
    // Add other transformations if needed
  });
  
  return url;
}

export default getSignedFileUrl;
