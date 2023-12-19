import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesModel } from 'src/chats/messages/entity/messages.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { CommonService } from 'src/common/common.service';
import { BasePaginationDto } from 'src/common/dto/base-pagination.dto';
import { CreateMessagesDto } from 'src/chats/messages/dto/create-messages.dto';

@Injectable()
export class ChatsMessageService {
    constructor(
        @InjectRepository(MessagesModel)
        private readonly messageRepository: Repository<MessagesModel>,
        private readonly commonService: CommonService,
    ) {}

    async createMessage(dto: CreateMessagesDto) {
        const message = await this.messageRepository.save({
            chat: {
                id: dto.chatId,
            },
            author: {
                id: dto.authorId,
            },
            message: dto.message,
        });

        return this.messageRepository.findOne({
            where: {
                id: message.id,
            },
            relations: {
                chat: true,
            },
        });
    }

    paginateMessages(
        dto: BasePaginationDto,
        overrideFindOptions: FindManyOptions,
    ) {
        return this.commonService.paginate(
            dto,
            this.messageRepository,
            overrideFindOptions,
            'messages',
        );
    }
}
