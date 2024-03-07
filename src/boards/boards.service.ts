import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class BoardsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.BoardCreateInput): Promise<Board> {
    return await this.prisma.board.create({ data });
  }

  async findAll(): Promise<Board[]> {
    return await this.prisma.board.findMany();
  }

  async findOne(id: number) {
    const board = await this.prisma.board.findUnique({ where: { id } });
    if (board === null) {
      throw new NotFoundException('Board not found');
    }
    return board;
  }

  async update(id: number, data: Prisma.BoardUpdateInput) {
    return await this.prisma.board.update({ where: { id }, data });
  }

  async remove(id: number) {
    return await this.prisma.board.delete({ where: { id } });
  }
}
