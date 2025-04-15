import { UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { tokenPayload } from "./token-payload";

export async function extractTokenFromCookie(req: Request): Promise<tokenPayload>{
    const token = req.cookies['access_token'];
    if (!token) {
      throw new UnauthorizedException('No access token found.');
    }

    try {
      const payload = await this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired access token.');
    }
}