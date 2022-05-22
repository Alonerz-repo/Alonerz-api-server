import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStickerDto } from './dto/request/create-sticker.dto';
import { CreatedStickerDto } from './dto/response/created-sticker.dto';
import { SelectedStickersDto } from './dto/response/selected-stickers.dto';
import { UpdateStickerDto } from './dto/request/update-sticker.dto';
import { StickerException } from './sticker.exception';
import { StickerRepository } from './sticker.repository';

@Injectable()
export class StickerService {
  constructor(
    @InjectRepository(StickerRepository)
    private readonly stickerRepository: StickerRepository,
    private readonly stickerException: StickerException,
  ) {}

  // 스티커 존재여부 확인
  private async getSticker(stickerId: number) {
    const sticker = await this.stickerRepository.findOne({ stickerId });
    if (!sticker) {
      this.stickerException.NotFound();
    }
    return sticker;
  }

  // 사용자의 모든 스티커 조회
  async getStickers(userId: string): Promise<SelectedStickersDto> {
    const stickers = await this.stickerRepository.getStickers(userId);
    return { stickers };
  }

  // 스티커 저장
  async createSticker(
    userId: string,
    createStickerDto: CreateStickerDto,
  ): Promise<CreatedStickerDto> {
    const { stickerId, stickerImageId, stickerOrder } =
      await this.stickerRepository.createSticker(userId, createStickerDto);
    return { stickerId, stickerImageId, stickerOrder };
  }

  // 스티커 이미지 및 위치 변경
  async updateSticker(
    stickerId: number,
    updateStickerDto: UpdateStickerDto,
  ): Promise<void> {
    await this.getSticker(stickerId);
    return await this.stickerRepository.updateSticker(
      stickerId,
      updateStickerDto,
    );
  }

  // 스티커 제거
  async deleteSticker(stickerId: number): Promise<void> {
    await this.getSticker(stickerId);
    return await this.stickerRepository.deleteSticker(stickerId);
  }
}