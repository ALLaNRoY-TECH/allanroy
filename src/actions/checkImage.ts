"use server";

import fs from "fs";
import path from "path";

export async function checkImageExists(imagePath: string): Promise<boolean> {
  try {
    const cleanPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;
    const filePath = path.join(process.cwd(), "public", cleanPath);
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}
