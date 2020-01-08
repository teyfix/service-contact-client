import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateDealerComponent } from 'src/app/module/panel/module/dealers/component/create-dealer/create-dealer.component';
import { Transform } from 'class-transformer';
import { Type } from '@angular/core';


export class ModalGuardData {
  static readonly Modals = {CreateDealerComponent};

  @Transform(modalName => ModalGuardData.Modals[modalName])
  @IsNotEmpty()
  modal: Type<any>;

  @IsString()
  @IsOptional()
  previous: string;
}
