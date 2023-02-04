import { PartialType } from '@nestjs/swagger';
import { CreateMensagemDto } from './create-mensagem.dto';

export class UpdateMensagemDto extends PartialType(CreateMensagemDto) {}
