import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';

export class PwaInstallationDto {

  @IsString()
  @IsNotEmpty()
  msisdn!: string;

  @IsBoolean()
  status!: boolean;

}


export class PwaInstallationParamDto {

  @IsString()
  @IsNotEmpty()
  msisdn!: string;

}


